// src/components/auth/loginForm.jsx
import TextInput from "@/components/ui/textInput";
import Button from "@/components/ui/button";
import Link from "next/link";
import GoogleAuth from "@/components/auth/googleAuth";

function LoginForm() {
    return (
        <div className="w-full md:w-[448px] p-6 mx-auto justify-center items-center">
            <h3>Login</h3>
            <TextInput placeholder="Email"/>
            <TextInput placeholder="Password" />
            <Button>Log in</Button>
            <p className="text-center text-color-gray mt-2">Don't have an account? <Link href="/register" className="text-color-primary underline">Sign up</Link></p>

            <div className="flex items-center my-10">
                <hr className="flex-grow border-t border-gray-400" />
                <span className="mx-2 text-color-gray">or</span>
                <hr className="flex-grow border-t border-gray-400" />
            </div>
            <GoogleAuth />
        </div>
    )
}

export default LoginForm;