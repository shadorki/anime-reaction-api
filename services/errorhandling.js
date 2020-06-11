class ClientError {
  constructor(message, status) {
    this.message = message
    this.status = status
  }
}

class ServerError {
  constructor(message, status) {
    this.message = message
    this.status = status
  }
}

module.exports = {
  ClientError,
  ServerError
}
