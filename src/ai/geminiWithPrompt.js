import dotenv from 'dotenv';
//[model]
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
//[template]
import { PromptTemplate } from '@langchain/core/prompts';

dotenv.config();

const userQuery = async (inputQuery) => {
  const LLM = new ChatGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
    model: 'gemini-1.5-flash',
  });
  const template = `You are a helpful AI assistant. Answer based on the context provided. input: {inputQuery} context: {context} answer:`;
  const prompt = PromptTemplate.fromTemplate(template);
  const formatter = await prompt.format({
    inputQuery: inputQuery,
    context: 'employees',
  });
  const res = await LLM.invoke([['human', formatter]]);
  console.log('🚀 ~ userQuery ~ res:', res.content);
};

userQuery('Individual users should not change the location or installation of computer');
