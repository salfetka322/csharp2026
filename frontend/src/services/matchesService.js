import $api from '../http/http';

export const getRecommendations = async (limit = 5) => {
  try {
    const response = await $api.get(`/recommendations?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Не вдалося отримати рекомендації:', error);
    throw error;
  }
};

export const getMatches = async () => {
  try {
    const response = await $api.get('/matches');
    return response.data;
  } catch (error) {
    console.error('Не вдалося отримати пару:', error);
    throw error;
  }
};
