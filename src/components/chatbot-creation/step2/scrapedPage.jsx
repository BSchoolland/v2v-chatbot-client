// src/components/onboarding/scrapedPage.jsx
import Image from "next/image";
import { FaTrashAlt } from "react-icons/fa";


function ScrapedPage({url, internal, onDelete}) {
    return (
        <div className="flex flex-col items-left justify-center w-full">
            <div className="flex flex-row items-center justify-between w-full mb-[6px]">
                <p>{url}</p>
                <button 
                    onClick={onDelete}
                    className="bg-color-light p-2 rounded-lg cursor-pointer hover:bg-red-100 transition-colors duration-200"
                >
                    <FaTrashAlt className="text-gray-600 hover:text-red-500 transition-colors duration-200" />
                </button>
            </div>
            <hr className="w-full border-t border-gray-400 mb-3" />
        </div>
    )
}

export default ScrapedPage;