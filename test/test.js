/* eslint-disable no-undef */
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')

chai.use(chaiHttp)

const { expect } = chai

describe('Reactions API', () => {

  describe("GET /categories", () => {
    it("It should receive an array of categories", done => {
      chai.request(server)
        .get('/api/categories')
        .end((err, response) => {
          expect(response).to.have.status(200)
          expect(response.body).to.be.a('array')
          expect(response.body.every(s => typeof s === 'string')).to.be.true
          done()
        })
    })
  })

  describe('GET /reactions', () => {
    it("It should ask for a category", done => {
      chai.request(server)
      .get('/api/reactions')
      .end((err, response) => {
        expect(response).to.have.status(400)
        expect(response.body).to.deep.equal({
          message: 'Please supply a category.'
        })
      })
      done()
    })
    it("It should ask for a valid category", done => {
      chai.request(server)
      .get('/api/reactions?category=ergaderga')
      .end((err, response) => {
        expect(response).to.have.status(400)
        expect(response.body).to.deep.equal({
          message: 'Please send a valid category.'
        })
      })
      done()
    })
    it("It should receive an array of reactions", async () => {
      try {
        const response = await chai.request(server)
          .get('/api/categories')
          const [category] = response.body
        const reactionsResponse = await chai.request(server)
            .get(`/api/reactions?category=${category}`)
          expect(reactionsResponse).to.have.status(200)
          expect(reactionsResponse.body).to.be.a('array')
          expect(reactionsResponse.body.every(s => typeof s === 'string')).to.be.true
      } catch(err) {
        console.error(err)
        expect.fail("Error" + JSON.stringify(err))
      }
    })

    it('It should receive valid image link',  done => {
      chai.request(server)
        .get('/api/categories')
        .end((err, res) => {
          if(err) {
            expect.fail('Error: ' + JSON.stringify(err))
          }
          const [category] = res.body
          chai.request(server)
            .get(`/api/reactions?category=${category}`)
            .end((err, res) => {
              if (err) {
                expect.fail('Error: ' + JSON.stringify(err))
              }
              const [imageUrl] = res.body
              console.log(imageUrl)
              chai.request(imageUrl)
                .get('/')
                .end((err, res) => {
                  if (err) {
                    expect.fail('Error: ' + JSON.stringify(err))
                  }
                  expect(res).to.have.status(200)
                  done()
                })
            })
        })
    })
  })
})
