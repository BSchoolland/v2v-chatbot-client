function TextArea({ placeholder, label, size = "medium", ...props }) { 
    //  size options: small, medium, large
    return (
        <div className="flex flex-col w-full">
            {label && <label className="text-[16px] text-color-neutral mt-3">{label}</label>}
            <div className="relative w-full">
                <textarea 
                    className={`border-1 border-gray-300 rounded-[8px] p-2 text-color-dark my-3 w-[100%] bg-color-light border-color-light ${size === "medium" ? "h-[100px]" : "h-[200px]"}`} 
                    placeholder={placeholder} 
                    {...props} 
                />
            </div>
        </div>
    )
}

export default TextArea;