import dotenv from 'dotenv';
//[model]
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
//[template]
import { PromptTemplate } from '@langchain/core/prompts';
import { LLMChainExtractor } from 'langchain/retrievers/document_compressors/chain_extract';
import { createRetrievalChain } from 'langchain/chains/retrieval';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { Document } from 'langchain/document';
dotenv.config();

// [create model]
const genAIModel = new ChatGoogleGenerativeAI({
  //   model: 'gemini-1.5-flash',
  //   maxOutputTokens: 2048,
  apiKey: process.env.GEMINI_API_KEY,
});

// [create templates]
const template = `
//         You are a helpful AI assistant.
//         Answer based on the context provided.
//         context: {context}
//         input: {input}
//         answer:
//     `;

const prompt = PromptTemplate.fromTemplate(template);

const chain = new LLMChainExtractor({ llmChain: genAIModel, input: prompt });

const CHUNK_SIZE = 10000;
const CHUNK_OVERLAP = 1000;

const userQuery = async (pdfFiles) => {
  //TODO: [CREATE SPLITTER]
  const splitter = new RecursiveCharacterTextSplitter({
    separator: '\n',
    chunkSize: CHUNK_SIZE,
    chunkOverlap: CHUNK_OVERLAP,
  });

  // TODO: [set buffer pdf]
  const loader = new PDFLoader(
    'D:\\HocKi8\\big_data\\docs\\lt\\my_bigdata\\md\\SmartDocBot\\pdf\\HandBook.pdf',
    {
      splitPages: true,
      parsedItemSeparator: '', // overrite big space
      ...this,
    },
  );

  const docs = loader.load();

  const doc_to_splitting = splitter.splitDocuments(docs);
  console.log('🚀 ~ userQuery ~ doc_to_splitting:', doc_to_splitting);

  let arrayDocs = [...docs];

  //   if (arrayDocs.length > 0) {
  //     const store = await MemoryVectorStore.fromDocuments(arrayDocs, genAIModel);
  //     const question = 'How do I apply for personal leave?';

  //     const relevantDocs = await store.similaritySearch(question);
  //     try {
  //       const embeddedVectors = await embeddings.embedDocuments(texts);
  //       return this.addVectors(embeddedVectors, documents);
  //     } catch (error) {
  //       console.error('🚀 ~ Error in embedDocuments:', error);
  //     }
  //   }

  //   console.log('🚀 ~ userQuery ~ vectordb:', vectordb);

  //   const retrievalChain = createRetrievalChain(retriever, chain);

  //   const response = await retrievalChain.invoke({ input: userQuestion });

  //   console.log('🚀 ~ retrievalChain:', retrievalChain);
};

userQuery(['D:\\HocKi8\\big_data\\docs\\lt\\my_bigdata\\md\\SmartDocBot\\pdf\\HandBook.pdf']);

// const main = async (pdfFiles, userQuestion) => {
//   const pdfText = await loadPDF(pdfFiles);
//   const pages = await splitText(pdfText);

//   const embeddings = new GoogleGenerativeAIEmbeddings({ model: 'models/embedding-001' });

//   const vectordb = new MemoryVectorStore();
//   await vectordb.addDocuments(pages, embeddings);

//   // Set up retriever with top_k=5
//   const retriever = vectordb.asRetriever({ search: { k: 5 } });

//   // Create retrieval chain
//   const template = `
//         You are a helpful AI assistant.
//         Answer based on the context provided.
//         context: {context}
//         input: {input}
//         answer:
//     `;
//   const prompt = new PromptTemplate(template);
//   const LLM = new GoogleGenerativeAI({});
//   const combineDocsChain = createStuffDocumentsChain(LLM, prompt);
//   const retrievalChain = createRetrievalChain(retriever, combineDocsChain);

//   // Call retrieval chain with user question
//   const response = await retrievalChain.invoke({ input: userQuestion });

//   console.log('----> AI Response:', response.answer);
// };
// main(
//   ['D:\\HocKi8\\big_data\\docs\\lt\\my_bigdata\\md\\SmartDocBot\\pdf\\HandBook.pdf'],
//   'How do I apply for personal leave?',
// );
