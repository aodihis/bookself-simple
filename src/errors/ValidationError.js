class ValidationError extends Error {
  constructor(message = 'Resource not found', field) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
    this.field = field;
  }
}
module.exports = ValidationError;