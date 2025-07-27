import { toast } from 'react-toastify'

export function showConfirmToast({ message, onConfirm, onCancel = () => { }, confirmText = "Sí", cancelText = "No" }) {
    toast((t) => (
        <div className='flex flex-col p-4 gap-2'>
            <p>
                {message}
            </p>
            <div className='flex justify-end gap-2' >
                <button
                    onClick={() => {
                        toast.dismiss(t.id)
                        onCancel()
                    }}
                    className="px-4 py-2 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400"
                >
                    {cancelText}
                </button>
                <button
                    onClick={() => {
                        onConfirm()
                        toast.dismiss(t.id)
                    }}
                    className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                >
                    {confirmText}
                </button>
            </div>
        </div>
    ));
}
