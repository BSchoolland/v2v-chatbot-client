'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { checkAuth } from '@/utils/api';

// Loading component to show while checking authentication
const LoadingScreen = () => (
    <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
);

export function withAuth(Component) {
    return function ProtectedRoute(props) {
        const router = useRouter();
        const [isLoading, setIsLoading] = useState(true);
        const [isAuthenticated, setIsAuthenticated] = useState(false);

        useEffect(() => {
            const verifyAuth = async () => {
                try {
                    const authResult = await checkAuth();
                    setIsAuthenticated(authResult);
                    
                    if (!authResult) {
                        router.push('/login');
                    }
                } catch (error) {
                    router.push('/login');
                } finally {
                    setIsLoading(false);
                }
            };

            verifyAuth();
        }, [router]);

        if (isLoading) {
            return <LoadingScreen />;
        }

        if (!isAuthenticated) {
            return null; // Will redirect in useEffect
        }

        return <Component {...props} />;
    };
}

export default withAuth; 