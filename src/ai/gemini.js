const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
dotenv.config();

const key = process.env.GEMINI_API_KEY;
console.log('🚀 ~ key:::::', key);

async function run() {
  try {
    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(['1 + 1 = ?']);
    console.warn(result.response.text());
  } catch (error) {
    console.log('🚀Error::::', error);
  }
}
run();

//test
// console.log(
//   '🚀Generate test::::',
//   `curl \
//   -H 'Content-Type: application/json' \
//   -d '{"contents":[{"parts":[{"text":"Explain how AI works"}]}]}' \
//   -X POST 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${key}'`,
// );
