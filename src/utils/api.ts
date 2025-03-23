import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true  // This ensures cookies are sent with cross-origin requests
});

export const register = async (userData: { firstName: string; lastName: string; email: string; password: string; }) => {
    try {
        const response = await api.post('/website/api/register', userData);
        return response.data as any; // Type assertion to avoid 'unknown' type error
    } catch (error: any) { // Specify 'any' type for error
        throw error.response?.data || error.message;
    }
};

export const login = async (userData: { email: string; password: string; }) => {
    try {
        const response = await api.post('/website/api/login', userData);
        return response.data as any; // Type assertion to avoid 'unknown' type error
    } catch (error: any) { // Specify 'any' type for error
        throw error.response?.data || error.message;
    }
};


// Add a function to check if user is authenticated
export const checkAuth = async () => {
    try {
        const response = await api.get('/website/api/me');
        return response.data.authenticated; // Access 'authenticated' from response.data
    } catch (error) {
        return false;
    }
}

// Add logout function
export const logout = async () => {
    try {
        await api.get('/website/api/logout');
        return true; // Indicate successful logout
    } catch (error: any) { // Specify 'any' type for error
        throw error.response?.data || error.message; // Handle error appropriately
    }
};

// handle persistent webscrape progress updates (cannot use axios for this)
export const initiateWebscrape = async (url: string, planId: string, onMessage: (data: any) => void) => {
    // first, create a new chatbot
    const response = await api.post('/website/api/chatbot-setup/create-chatbot', {
        planId: planId
    });
    const chatbotId = response.data.chatbot_id;
    // then, initiate the webscrape
    const eventSource = new EventSource(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/website/api/chatbot-setup/scrape-site-progress?url=${encodeURIComponent(url)}&planId=${planId}`, {withCredentials: true});
    
    eventSource.onmessage = (event) => {
        onMessage(JSON.parse(event.data));
    };

    eventSource.onerror = (error) => {
        console.error("EventSource failed:", error);
        eventSource.close();
    };

    return eventSource;
};

export const deletePage = async (url: string, planId: string) => {
    try {
        await api.delete('/website/api/chatbot-setup/delete-page', {
            data: { url, planId }
        });
        return true;
    } catch (error: any) {
        throw error.response?.data || error.message;
    }
};

// Add Google authentication function
export const googleLogin = async (credential: string) => {
    try {
        const response = await api.post('/website/api/google-auth', { credential });
        return response.data as any;
    } catch (error: any) {
        throw error.response?.data || error.message;
    }
};

export default api; 