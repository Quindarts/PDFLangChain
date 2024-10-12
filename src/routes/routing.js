const express = require('express');
const { runRagChain } = require('../ai/model'); // Nhập mô hình AI

const router = express.Router();

router.post('/ask', async (req, res) => {
  const { question } = req.body;
  try {
    const response = await runRagChain(question);
    res.status(200).json({
      success: true,
      status: 200,
      answer: response,
    });
  } 
  catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      error: error.message,
    });
  }
});

module.exports = router;
