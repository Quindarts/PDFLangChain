import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import * as pdfParse from 'pdf-parse';
import * as fs from 'fs';

// Hàm chia nhỏ văn bản thành các đoạn
export const splitText = (text) => {
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 10000,
    chunkOverlap: 1000,
  });
  return textSplitter.splitText(text);
};

// Hàm đọc tệp PDF
export const loadPDF = async (pdfDocs) => {
  console.log('🚀 ~ loadPDF ~ pdfDocs:', pdfDocs);
  let text = '';
  //   try {
  //     for (const pdf of pdfDocs) {
  //       const dataBuffer = fs.readFileSync(pdf);
  //       console.log('🚀 ~ loadPDF ~ dataBuffer:', dataBuffer);
  //       const data = await pdfParse(dataBuffer);
  //       text += data.text;
  //     }
  //   } catch (error) {
  //     console.log('🚀 ~ loadPDF ~ error:', error);
  //   }

  return text;
};

exports = {
  splitText,
  loadPDF,
};
