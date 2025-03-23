'use client'
// src/components/auth/googleAuth.jsx
import { GoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import { googleLogin } from '../../utils/api';

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

function GoogleAuth() {
    const router = useRouter();

    const handleSuccess = async (credentialResponse) => {
        try {
            await googleLogin(credentialResponse.credential);
            // Redirect to dashboard or home page after successful login
            router.push('/dashboard');
        } catch (error) {
            console.error('Google authentication failed:', error);
        }
    };

    const handleError = () => {
        console.error('Google Sign In was unsuccessful');
    };

    return (
        <div className="w-full flex justify-center">
            <GoogleLogin
                clientId={clientId}
                onSuccess={handleSuccess}
                onError={handleError}
                useOneTap
                theme="filled_blue"
                shape="rectangular"
                text="continue_with"
                size="large"
            />
        </div>
    );
}

export default GoogleAuth;