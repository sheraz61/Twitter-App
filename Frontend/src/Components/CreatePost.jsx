import React, { useState } from 'react';
import { FaImage, FaSmile, FaGlobe } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Avatar from 'react-avatar';

function CreatePost() {
    const [postText, setPostText] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setSelectedImage(null);
    };

    return (
        <div className="w-full border-b border-gray-200">
            <div className="p-4">
                <div className="flex gap-3">
                    <div className="flex-shrink-0">
                        <Avatar 
                            src="https://picsum.photos/200" 
                            size="48" 
                            round={true} 
                            className="cursor-pointer"
                        />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 text-blue-400 mb-2">
                            <span className="text-sm font-medium">Everyone</span>
                            <FaGlobe size={14} />
                        </div>
                        <textarea
                            className="w-full text-xl outline-none resize-none placeholder-gray-500"
                            placeholder="What's happening?"
                            rows={3}
                            value={postText}
                            onChange={(e) => setPostText(e.target.value)}
                        />
                        
                        {selectedImage && (
                            <div className="relative mt-3 rounded-xl overflow-hidden">
                                <img 
                                    src={selectedImage} 
                                    alt="Preview" 
                                    className="w-full h-auto rounded-xl"
                                />
                                <button 
                                    onClick={removeImage}
                                    className="absolute top-2 left-2 bg-black bg-opacity-50 rounded-full p-1 hover:bg-opacity-70"
                                >
                                    <IoMdClose size={20} color="white" />
                                </button>
                            </div>
                        )}

                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                            <div className="flex items-center gap-4">
                                <label className="cursor-pointer">
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        className="hidden" 
                                        onChange={handleImageChange}
                                    />
                                    <FaImage size={20} className="text-blue-400 hover:text-blue-500" />
                                </label>
                                <FaSmile size={20} className="text-blue-400 hover:text-blue-500 cursor-pointer" />
                            </div>
                            <button 
                                className={`px-4 py-2 rounded-full font-bold ${
                                    postText.trim() || selectedImage
                                        ? 'bg-blue-400 text-white hover:bg-blue-500'
                                        : 'bg-blue-200 text-white cursor-not-allowed'
                                }`}
                                disabled={!postText.trim() && !selectedImage}
                            >
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreatePost;