import { userQuery } from '../ai/retrieverWithApi.js';

const getToAssignCategoryOfTopics = async (req, res) => {
  try {
    const response = await userQuery();
    return res.status(200).json({
      values: response,
    });
  } catch (error) {
    console.log('🚀 ~ toAssignCategoryOfTopics ~ error:', error);
  }
};
export { getToAssignCategoryOfTopics };
