import { Image, Send, XIcon } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore';
import toast from 'react-hot-toast';

const MessageInput = () => {

    const { sendMessage } = useChatStore();

    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);

    const FileInputRef = useRef(null);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!text.trim() && !imagePreview) return;
        sendMessage({ text: text.trim(), image: imagePreview })
        setText("");
        setImagePreview(null);
        if (FileInputRef.current) FileInputRef.current.value = ""
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (!file.type.startsWith("image/")) {
            toast.error("Please select a valid image file");
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result)
        reader.readAsDataURL(file);
    }

    const RemoveImagePreview = () => {
        setImagePreview(null);
        if (FileInputRef.current) FileInputRef.current.value = "";
    }

    return (
        <div className='w-full border-t border-gray-300/20 p-4 flex flex-col gap-2'>  {/* ✅ no absolute, no fixed height */}
            
            {/* Image Preview */}
            {imagePreview && (
                <div className="relative w-fit">  {/* ✅ no absolute */}
                    <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-20 h-20 object-cover rounded-lg border border-slate-700"
                    />
                    <button
                        onClick={RemoveImagePreview}
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-200 hover:bg-slate-700"
                        type="button"
                    >
                        <XIcon className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Input Row */}
            <form
                className='w-full flex items-center gap-2'  
                onSubmit={handleSendMessage}
            >
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type your message..."
                    className='flex-1 p-2 border border-gray-300/20 bg-gray-100/20 outline-none rounded-lg'
                />

                <input
                    type="file"
                    accept="image/*"
                    ref={FileInputRef}
                    className='hidden'
                    onChange={handleImageChange}
                />

                <button
                    type='submit'
                    disabled={!text.trim() && !imagePreview}
                    className='p-3 bg-blue-500/20 text-white rounded-lg'>
                    <Send size={24} />
                </button>

                <button
                    type='button'
                    onClick={() => FileInputRef.current.click()}
                    className='p-3 bg-blue-500/20 text-white rounded-lg'>
                    <Image size={24} />
                </button>
            </form>

        </div>
    )
}

export default MessageInput;