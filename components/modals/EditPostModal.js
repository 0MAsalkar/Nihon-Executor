import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useGlobalState } from "../../hooks";

export default function EditPostModal({ updatePost, currentEditListing, editPostModalOpen, setEditPostModalOpen, currentEditPostID }) {
    const [caption, setCaption] = useState('')


    //SOLANA STUFF
    const {
        wallet,
    } = useGlobalState();


    const closeModal = () => {
        setEditPostModalOpen(false)
    }

    const onEdit = (e) => {
        e.preventDefault()

        // editListing({
        //     airbnbPda: currentEditListing?.publicKey,
        //     airbnbIdx: currentEditListing?.account.idx,
        //     location,
        //     country,
        //     price,
        //     imageURL,
        // })

        updatePost(
            wallet?.publicKey,
            currentEditPostID,
            caption
        )


        closeModal()
    }

    return (
        <Transition appear show={editPostModalOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeModal}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                    Edit Post
                                </Dialog.Title>

                                <div className="mt-2">
                                    <div className="grid grid-cols-1 gap-3">
                                        <label className="flex flex-col border rounded-lg px-3 py-2" htmlFor="location">
                                            <span className="text-xs font-light">Caption</span>
                                            <input placeholder={currentEditListing?.account.location} onChange={(e) => setCaption(e.target.value)} className="outline-none bg-transparent text-sm pt-1" type="text" id="location" name="location" />
                                        </label>

                                    </div>

                                    <div className="mt-4 flex justify-end">
                                        <button onClick={onEdit} type="button" className="border rounded-lg px-4 py-2 text-sm font-medium">
                                            Confirm
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}