const tokenService = require('../tokenService');

module.exports = async (req, res, next) => {
  const authHeader = req.get('authorization');

  if (!authHeader) {
    next(new Error('unauthorized'));
  }

  const _token = authHeader.split(' ')[1];

  try {
    const decoded = await tokenService.verify(_token);
    req.token = decoded;
    next();
  } catch (e) {
      console.log(e)
    next(new Error('unauthorized'));
  }
}