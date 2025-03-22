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
        console.log(response.data);
        return response.data.authenticated; // Access 'authenticated' from response.data
    } catch (error) {
        return false;
    }
}

// Add logout function
export const logout = async () => {
    try {
        console.log("logging out");
        await api.get('/website/api/logout');
        return true; // Indicate successful logout
    } catch (error: any) { // Specify 'any' type for error
        throw error.response?.data || error.message; // Handle error appropriately
    }
};

export default api; 