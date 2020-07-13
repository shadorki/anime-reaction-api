/* eslint-disable no-undef */
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')

chai.use(chaiHttp)

const { expect } = chai

function isValidUrl(string) {
  try {
    new URL(string);
  } catch (_) {
    return false;
  }
  return true;
}

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

    it('It should receive valid url',  done => {
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
              expect(isValidUrl(imageUrl)).to.be.true
              done()
            })
        })
    })
  })
  describe('GET /api/reactions/random', () => {
    it('It should ask for a valid category when category sent', async () => {
      try {
        const response = await chai.request(server)
          .get('/api/reactions/random?category=blahblah')
        expect(response).to.have.status(400)
        expect(response.body).to.deep.equal({
          message: 'Please send a valid category.'
        })
      } catch(err) {
        console.error(err)
        expect.fail("Error" + JSON.stringify(err))
      }
    })
    it('It should ask for a category when category is sent without value', async () => {
      try {
        const response = await chai.request(server)
          .get('/api/reactions/random?category=')
        expect(response).to.have.status(400)
        expect(response.body).to.deep.equal({
          message: 'Please supply a category.'
        })
      } catch (err) {
        console.error(err)
        expect.fail("Error" + JSON.stringify(err))
      }
    })
    it('It should respond with a random reaction in the category', async () => {
      try {
        const response = await chai.request(server)
          .get('/api/categories')
        const category = response.body[Math.floor(Math.random() * response.body.length)]
        const randomReactionRes = await chai.request(server)
          .get(`/api/reactions/random?category=${category}`)
        expect(randomReactionRes).to.have.status(200)
        expect(randomReactionRes.body).to.be.a('object')
        expect(randomReactionRes.body).to.have.property('reaction')
        expect(isValidUrl(randomReactionRes.body.reaction)).to.be.true
      } catch (err) {
        console.error(err)
        expect.fail("Error" + JSON.stringify(err))
      }
    })
    it('It should respond with a random reaction', async () => {
      try {
        const response = await chai.request(server)
                                   .get(`/api/reactions/random`)
        expect(response).to.have.status(200)
        expect(response.body).to.be.a('object')
        expect(response.body).to.have.property('reaction')
        expect(isValidUrl(response.body.reaction)).to.be.true
      } catch (err) {
        console.error(err)
        expect.fail("Error" + JSON.stringify(err))
      }
    })
  })
})
