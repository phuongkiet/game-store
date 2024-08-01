import { useEffect, useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { deleteGenre } from '../services/GenreService';
import { toast } from 'react-toastify';

export default function ModalDeleteGenre({ isOpen, onClose, dataGenre }) {
    const [GenreId, setGenreId] = useState(0);

    useEffect(() => {
        if (isOpen && dataGenre) {
            setGenreId(dataGenre.GenreId);
        }
    }, [isOpen, dataGenre]);


    const handleDeleteGenre = async (event) => {
        try {
          let res = await deleteGenre(GenreId);
          console.log(">>> check res: ", res)
          if (res.Success === true) {
            onClose(); 
            setGenreId(0); 
            toast.success(res.Message || "Genre deleted successfully!");
            window.location.reload();
          } else if (res.status === 400) {
            toast.error(res.data.Message || "Error when deleting genre!");
            onClose(); 
            window.location.reload();
          }
        } catch (error) {
          if (error.response && error.response.data) {
            toast.error(error.response.data.Message || "An unexpected error occurred!");
            onClose(); 
            window.location.reload();
          } else {
            toast.error("An unexpected error occurred!");
            onClose(); 
            window.location.reload();
          }
        }
    };      

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-10">
        <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
                transition
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            >
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon aria-hidden="true" className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Delete genre
                    </DialogTitle>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                        Are you sure you want to delete this genre? The data will be permanently removed.
                        This action cannot be undone.
                        </p>
                    </div>
                    </div>
                </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                    type="button"
                    onClick={(event) => {
                    handleDeleteGenre();
                    }}
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                    Delete
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                    Cancel
                </button>
                </div>
            </DialogPanel>
            </div>
        </div>
        </Dialog>
    );
}
