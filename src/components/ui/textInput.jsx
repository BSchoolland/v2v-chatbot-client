// src/components/ui/textInput.jsx

function TextInput({ placeholder, label, ...props }) {
    return (
        <div className="flex flex-col w-full">
            {label && <label className="text-[16px] text-color-neutral mt-3">{label}</label>}
            <input type="text" className="border-1 border-gray-300 rounded-[8px] p-2 text-color-dark my-3 w-[100%] bg-color-light border-color-light" placeholder={placeholder} {...props} />
        </div>
    )
}

export default TextInput;