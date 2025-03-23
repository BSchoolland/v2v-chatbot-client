// button.jsx

function Button({ children, disabled, className, ...props }) {
  return (
    <button 
      className={`text-color-neutral justify-center items-center bg-color-action p-3 my-3 rounded-[12px] cursor-pointer w-full ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;