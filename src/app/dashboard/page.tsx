// src/app/dashboard/page.tsx

'use client'

import { withAuth } from '@/components/auth/withAuth';
import api from '@/utils/api';
import Button from '@/components/ui/button';
import { useRouter } from 'next/navigation';

function Dashboard() {
    const router = useRouter();
    return (
        <div>
            <h1>Dashboard</h1>
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