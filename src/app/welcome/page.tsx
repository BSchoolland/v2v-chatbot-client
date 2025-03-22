// src/app/welcome/page.tsx

import NavButton from "@/components/ui/navButton";

export default function WelcomePage() {
    return <div className="flex flex-col items-center justify-center h-screen">
        <h1>Welcome page goes here</h1>
        <h3>You are now logged in</h3>
        <NavButton href="/dashboard">Dashboard</NavButton>
    </div>
}