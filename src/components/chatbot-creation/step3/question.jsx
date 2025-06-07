// Question

function Question({ value, onChange, onDelete }) {
    return (
        <div className="flex flex-row justify-between items-center mb-2 gap-4">
            <input 
                type="text" 
                placeholder="Enter a question" 
                value={value} onChange={onChange} 
                className="border-1 border-gray-300 rounded-[8px] p-2 text-color-dark my-3 w-[100%] bg-color-light border-color-light" 
            />
            <button onClick={onDelete} className="bg-color-primary text-white rounded-[8px] p-2 w-32 h-10">Delete</button>
        </div>
    )
}

export default Question;