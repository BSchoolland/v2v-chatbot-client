// src/app/dashboard/page.tsx

'use client'

import { withAuth } from '@/components/auth/withAuth';
import api from '@/utils/api';
import Button from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import NavButton from '@/components/ui/navButton';

function Dashboard() {
    const router = useRouter();
    return (
        <div className="flex flex-col items-center justify-center h-screen w-[500px] mx-auto">
            <h1>Dashboard</h1>
            <NavButton href="/create-chatbot">Create Chatbot</NavButton>
            {/* Your dashboard content here */}
            <Button onClick={() => api.get('/website/api/logout')
                .then(() => {
                    console.log("logged out");
                    router.push('/');
                })
                .catch((error) => {
                    console.error("Error logging out:", error);
                })
            } disabled={false}>Logout</Button>
        </div>
    );
}

export default withAuth(Dashboard);