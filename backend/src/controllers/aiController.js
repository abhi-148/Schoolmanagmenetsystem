const askAI = async (req, res) => {

  const { message } = req.body;

  return res.status(200).json({
    success: true,
    answer:
      `AI Assistant Response: ${message}`
  });

};

module.exports = {
  askAI
};