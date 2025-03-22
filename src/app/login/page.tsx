// src/app/login/page.tsx

import LoginForm from "@/components/auth/loginForm";

function Login() {
    return (
        <div className="flex flex-col items-center h-screen w-screen justify-center align-middle">
            <LoginForm />
        </div>
    )
}

export default Login;