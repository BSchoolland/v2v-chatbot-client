// src/components/ui/textInput.jsx

function TextInput({ placeholder, ...props }) {
    return (
        <input type="text" className="border-1 border-gray-300 rounded-[8px] p-2 text-color-light my-3 w-[100%] bg-color-light border-color-light" placeholder={placeholder} {...props} />
    )
}

export default TextInput;