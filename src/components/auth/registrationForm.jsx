// src/components/auth/loginForm.jsx
import TextInput from "@/components/ui/textInput";
import Button from "@/components/ui/button";
import Link from "next/link";
import GoogleAuth from "@/components/auth/googleAuth";

function RegistrationForm() {
    return (
        <div className="w-full md:w-[448px] p-6 mx-auto justify-center items-center">
            <h3>Create an account</h3>
            <div className="flex flex-row gap-4">
                <TextInput placeholder="First name"/>
                <TextInput placeholder="Last name"/>
            </div>
            <TextInput placeholder="Email"/>
            <TextInput placeholder="Password" />
            <Button>Register</Button>
            <p className="text-center text-color-gray mt-2">Already have an account? <Link href="/login" className="text-color-primary underline">Login</Link></p>

            <div className="flex items-center my-10">
                <hr className="flex-grow border-t border-gray-400" />
                <span className="mx-2 text-color-gray">or</span>
                <hr className="flex-grow border-t border-gray-400" />
            </div>
            <GoogleAuth />
        </div>
    )
}

export default RegistrationForm;