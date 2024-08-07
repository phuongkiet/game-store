import axios from "./custom-axios";

const uploadImage = (imageFile) => {
  const formData = new FormData();
  formData.append('file', imageFile);

  return axios.post('api/Image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const deleteImage = (publicId) => {
  return axios.delete(`api/Image?publicId=${publicId}`);
}

export { uploadImage, deleteImage };
