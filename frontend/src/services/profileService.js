import $api from '../http/http';

export const getProfile = async () => {
  try {
    const response = await $api.get('/profile/me');
    return response.data;
  } catch (error) {
    console.error('Не вдалося отримати профіль:', error);
    throw error;
  }
};

export const sendProfile = async profile => {
  try {
    if (!profile) {
      throw new Error('Profile data is required');
    }

    const formData = new FormData();

    Object.keys(profile).forEach(key => {
      if (key !== 'photos' && profile[key] !== null && profile[key] !== undefined) {
        const value = profile[key];
        if (Array.isArray(value)) {
          value.forEach(item => {
            if (item != null) {
              formData.append(key, item);
            }
          });
        } else {
          formData.append(key, value);
        }
      }
    });

    if (profile.photos && Array.isArray(profile.photos)) {
      profile.photos
        .filter(p => p?.file)
        .forEach(p => {
          formData.append('photos', p.file);
        });
    }

    const response = await $api.post('/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Помилка відправлення даних профілю:', error);
    throw error;
  }
};

export const updateProfile = async updatedData => {
  try {
    const photos = updatedData.photos || [];
    const hasNewPhotos = Array.isArray(photos) && photos.some(p => p && p.file && typeof p.file === 'object');

    if (hasNewPhotos) {
      const formData = new FormData();

      Object.keys(updatedData).forEach(key => {
        if (key !== 'photos' && updatedData[key] !== null && updatedData[key] !== undefined) {
          const value = updatedData[key];
          if (Array.isArray(value)) {
            value.forEach(item => {
              if (item != null && typeof item !== 'object') {
                formData.append(key, item);
              }
            });
          } else if (typeof value !== 'object') {
            formData.append(key, value);
          }
        }
      });

      const existingPhotos = [];
      photos.forEach(photo => {
        if (photo && photo.file && typeof photo.file === 'object') {
          formData.append('photos', photo.file);
        } else if (typeof photo === 'string') {
          existingPhotos.push(photo);
        } else if (photo && photo.isExisting && photo.originalUrl) {
          existingPhotos.push(photo.originalUrl);
        }
      });

      if (existingPhotos.length > 0) {
        existingPhotos.forEach(url => {
          formData.append('existingPhotos', url);
        });
      }

      const response = await $api.post('/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } else {
      const photosForPut = photos
        .filter(Boolean)
        .map(photo => {
          if (typeof photo === 'string') {
            return photo;
          }
          if (photo && photo.originalUrl) {
            return photo.originalUrl;
          }
          return photo;
        });
      
      const payload = {
        ...updatedData,
        photos: photosForPut,
      };
      
      const response = await $api.put('/profile', payload);
      return response.data;
    }
  } catch (error) {
    console.error('Помилка оновлення профілю', error);
    throw error;
  }
};

export const likeProfile = async profileId => {
  try {
    const payload = { toProfileId: profileId };
    const response = await $api.post('/likes', payload);
    return response.data;
  } catch (error) {
    console.error('Помилка під час надсилання лайка:', error);
    throw error;
  }
};
