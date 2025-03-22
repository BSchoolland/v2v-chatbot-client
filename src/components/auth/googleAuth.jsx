// src/components/auth/googleAuth.jsx

// fake google auth for now
import Image from "next/image";
// TODO: add real google auth

function GoogleAuth() {
    return (
        <div>
            <Image src="/assets/fake-google.png" alt="Google" width={400} height={400}/>
        </div>
    )
}

export default GoogleAuth;