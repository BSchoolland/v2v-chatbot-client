'use client'
// src/components/auth/loginForm.jsx
import { useState } from "react";
import { useRouter } from "next/navigation";
import TextInput from "@/components/ui/textInput";
import Button from "@/components/ui/button";
import Link from "next/link";
import GoogleAuth from "@/components/auth/googleAuth";
import { register } from "@/utils/api";

function RegistrationForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await register(formData);
            // After successful registration and auto-login, redirect to the welcome page
            router.push("/welcome");
        } catch (err) {
            setError(err?.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full md:w-[448px] p-6 mx-auto justify-center items-center">
            <h3>Create an account</h3>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <div className="flex flex-row gap-4">
                <TextInput
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
                <TextInput
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
            </div>
            <TextInput
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <TextInput
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
            />
            <Button type="submit" disabled={loading}>
                {loading ? "Creating account..." : "Register"}
            </Button>
            <p className="text-center text-color-gray mt-2">
                Already have an account? <Link href="/login" className="text-color-primary underline">Login</Link>
            </p>

            <div className="flex items-center my-10">
                <hr className="flex-grow border-t border-gray-400" />
                <span className="mx-2 text-color-gray">or</span>
                <hr className="flex-grow border-t border-gray-400" />
            </div>
            <GoogleAuth />
        </form>
    );
}

export default RegistrationForm;