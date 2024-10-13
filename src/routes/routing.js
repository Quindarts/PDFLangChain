import express from 'express';
import { getToAssignCategoryOfTopics } from '../controller/categoryTopic.controller.js';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
dotenv.config();

const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);

const htmlFilePath = path.join(__dirname, '../view/index.html');

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(htmlFilePath);
});

router.get('/api/v1/category-topics', getToAssignCategoryOfTopics);

export default router;
