import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createGame } from '../../services/GameService';
import { deleteImage, uploadImage } from "../../services/ImageService";

export default function ModalAddGame({ isOpen, onClose, onSubmit, onCreateSuccess }) {
  const [GameId, setGameId] = useState(0);
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState(0.0);
  const [Stock, setStock] = useState(0);
  const [ImageFile, setImageFile] = useState(null);
  const [ImagePreview, setImagePreview] = useState(null);

  if (!isOpen) return null;

  const handleFileChange = (event) => {
  const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const handleSaveGame = async () => {
    if (!ImageFile) {
      toast.error("Please select an image!");
      return;
    }
  
    try {
      const imageUploadResponse = await uploadImage(ImageFile);
      console.log(">> check imageUploadResponse: ", imageUploadResponse);
      const { link, publicId } = imageUploadResponse;     
      console.log(">> check link: ", link); 
  
      // Create game with uploaded image link
      const res = await createGame(Title, Price, Stock, Description, link);
      console.log(">>check res: ", res);
  
      if (res && res.Success === true) {
        onClose(); 
        setGameId(0); 
        setTitle(""); 
        setDescription(""); 
        setPrice(0); 
        setStock(0); 
        setImageFile(null);
        toast.success("Game created successfully!");
        onCreateSuccess();
      } else {
        toast.error(res?.Message || "Error when creating game!");
        // Optionally, delete the uploaded image if game creation fails
        if (publicId) {
          await deleteImage(publicId);
          console.log("Image deleted due to game creation error.");
        }
      }
    } catch (error) {
      console.error("Upload error: ", error);
      if (error.response && error.response.status === 403) {
        console.error('You do not have permission to perform this action.');
        toast.error('You do not have permission to perform this action.');
      } else {
        toast.error("An unexpected error occurred!");
      }
    } finally {
      onClose();
    }
  };
  

  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <form
              onSubmit={onSubmit}
              className="space-y-6"
            >
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center w-full sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">
                      Add New Game
                    </h3>
                    <div className="mt-2">
                      <div>
                        <label
                          htmlFor="title"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Title
                        </label>
                        <div className="mt-2">
                          <input
                            id="title"
                            name="title"
                            value={Title}
                            onChange={(event) => setTitle(event.target.value)}
                            type="text"
                            required
                            autoComplete="text"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6 pl-3"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="description"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Description
                          </label>
                          <div className="mt-2">
                            <input
                              id="description"
                              name="description"
                              value={Description}
                              onChange={(event) => setDescription(event.target.value)}
                              type="text"
                              required
                              autoComplete="text"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6 pl-3"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="price"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Price
                          </label>
                          <div className="mt-2">
                            <input
                              id="price"
                              name="price"
                              value={Price}
                              onChange={(event) => setPrice(event.target.value)}
                              type="number"
                              step={0.1}
                              required
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6 pl-3"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="stock"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Stock
                          </label>
                          <div className="mt-2">
                            <input
                              id="stock"
                              name="stock"
                              value={Stock}
                              onChange={(event) => setStock(event.target.value)}
                              type="number"
                              required
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6 pl-3"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="image"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Image
                          </label>
                          <div className="mt-2">
                            <input
                              id="image"
                              name="image"
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              required
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6 pl-3"
                            />
                          </div>
                        </div>
                        <div className="mt-4">
                          {ImagePreview && (
                            <div>
                              <label className="block text-sm font-medium leading-6 text-gray-900">Image Preview</label>
                              <img src={ImagePreview} alt="Image Preview" className="mt-2 rounded-md shadow-sm" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="submit"
                  onClick={handleSaveGame}
                  className="flex w-full justify-center rounded-md bg-sky-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 sm:ml-3 sm:w-auto"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
