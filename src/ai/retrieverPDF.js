import dotenv from 'dotenv';
//[model]
import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
//[template]
import { ChatPromptTemplate, PromptTemplate } from '@langchain/core/prompts';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { TaskType } from '@google/generative-ai';
import { createRetrievalChain } from 'langchain/chains/retrieval';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const genAIModel = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GEMINI_API_KEY,
  model: 'text-embedding-004',
  title: 'Document title',
  taskType: TaskType.RETRIEVAL_DOCUMENT,
});

const CHUNK_SIZE = 10000;
const CHUNK_OVERLAP = 1000;

const userQuery = async (pdfFiles, inputQuery) => {
  //TODO: [CREATE SPLITTER]
  const splitter = new RecursiveCharacterTextSplitter({
    separator: [
      '\n',
      ' \n',
      '\n\n',
      ' \n\n',
      '\n \n',
      ' \n \n',
      '\n\n\n',
      ' \n\n\n',
      '\n \n\n',
      ' \n \n\n',
    ],
    chunkSize: CHUNK_SIZE,
    chunkOverlap: CHUNK_OVERLAP,
  });

  // TODO: [set buffer pdf]
  const loader = new PDFLoader(resolve(__dirname, '../../pdf/HandBook.pdf'), {
    splitPages: true,
    parsedItemSeparator: '',
    ...this,
  });

  //TODO: init multiple documents
  const docs = await loader.load();
  const doc_to_splitting = await splitter.splitDocuments(docs);

  //TODO: processing documents
  const docs_to_store = [];
  for (const doc of doc_to_splitting) {
    let new_doc = {
      pageContent: '',
      metadata: {},
    };
    let pageContent = (await splitter.splitText(doc.pageContent)).join(' ');
    new_doc.pageContent = pageContent;
    new_doc.metadata = doc.metadata;
    docs_to_store.push(new_doc);
  }

  //TODO: saving to vector store
  const vectordb = new MemoryVectorStore(genAIModel);

  await vectordb.addDocuments(docs_to_store);

  const model = new ChatGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
    model: 'gemini-1.5-flash',
  });

  const template = `You are a helpful AI assistant. Answer based on the context provided. input: {inputQuery} context: {context} answer:`;

  const prompt = ChatPromptTemplate.fromTemplate(template);

  const chain = prompt.pipe(model);

  const retriever = vectordb.asRetriever();

  const retrievalChain = await createRetrievalChain({ retriever, combineDocsChain: chain });
  console.log('🚀 ~ userQuery ~ retrievalChain:', retrievalChain);

  const response = await retrievalChain.invoke({
    inputQuery: `Individual users should not change the location or installation of computer`,
    context: 'user',
  });
  console.log('AI Response:', response);
};

userQuery(
  ['D:\\HocKi8\\big_data\\docs\\lt\\my_bigdata\\md\\SmartDocBot\\pdf\\HandBook.pdf'],
  'Individual users should not change the location or installation of computer',
);
