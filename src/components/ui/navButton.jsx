// navButton.jsx

import Link from "next/link";

function NavButton({ children, ...props }) {
  return (
    <Link href={props.href}>
      <button className="justify-center items-center bg-color-primary text-white px-4 py-2 rounded-md cursor-pointer w-fit" {...props}>{children}</button>
    </Link>
  );
}

export default NavButton;