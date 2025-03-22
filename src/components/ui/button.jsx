// button.jsx

function Button({ children, ...props }) {
  return <button className="text-color-neutral justify-center items-center bg-color-action p-3 my-3 rounded-[12px] cursor-pointer w-full" {...props}>{children}</button>;
}

export default Button;