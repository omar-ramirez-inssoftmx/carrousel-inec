module.exports = (req, res, next) => {
  const { token_id, amount, customer } = req.body;
  if (!token_id || !amount || !customer) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }
  next();
};
