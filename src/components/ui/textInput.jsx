import { useState } from 'react';
import { IoEyeOutline } from 'react-icons/io5';
import { FaRegEyeSlash } from 'react-icons/fa';

function TextInput({ placeholder, label, type, ...props }) {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';

    return (
        <div className="flex flex-col w-full">
            {label && <label className="text-[16px] text-color-neutral mt-3">{label}</label>}
            <div className="relative w-full">
                <input 
                    type={isPassword ? (showPassword ? 'text' : 'password') : type || "text"} 
                    className="border-1 border-gray-300 rounded-[8px] p-2 text-color-dark my-3 w-[100%] bg-color-light border-color-light" 
                    placeholder={placeholder} 
                    {...props} 
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 focus:outline-none"
                    >
                        {showPassword ? <FaRegEyeSlash size={20} /> : <IoEyeOutline size={20} />}
                    </button>
                )}
            </div>
        </div>
    )
}

export default TextInput;