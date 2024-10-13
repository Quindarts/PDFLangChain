import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/v1';
const termId = '8fb8fbda-37ed-4861-a3a2-236500e62ee6';
const keywords = '';

export const getAllTopics = async () => {
  return await axios.get(
    `${BASE_URL}/topics/query?termId=${termId}&keywords=${keywords}&searchField=lecturerName&page=1&limit=100&sort=ASC`,
  );
};
