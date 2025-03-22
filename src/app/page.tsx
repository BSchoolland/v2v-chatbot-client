import Link from "next/link";
import Button from "@/components/ui/button";
import NavButton from "@/components/ui/navButton";

// for now, just links to the different pages I need to build and test
export default function Home() {
  return (
    <div className="">
      <h1>Landing Page Goes Here</h1>
      <br />
      <br />
      <br />
      <br />
      <div className="flex flex-col gap-4 items-center">
        <NavButton href="/login">Login</NavButton>
        <NavButton href="/register">Register</NavButton>
        <NavButton href="/dashboard">Dashboard</NavButton>
      </div>
    </div>
  );
}
