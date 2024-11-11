class RangePageError extends Error {
  constructor(message = 'Invalid range') {
    super(message);
    this.name = 'RangePageError';
    this.statusCode = 400;
  }
}
module.exports = RangePageError;