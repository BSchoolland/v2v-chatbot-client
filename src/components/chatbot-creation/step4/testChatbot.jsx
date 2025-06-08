// src/components/onboarding/step4/testChatbot.jsx
import { useState } from "react";
import ThemePicker from "./themePicker";
import ChatbotPreview from "./chatbotPreview";
import Button from "@/components/ui/button";

function TestChatbot({ onNextStep, onPreviousStep }) {
    const [theme, setTheme] = useState("none");
    const isThemeSelected = theme !== "none";

    const handleContinue = async () => {
        try {
            // Make API call to create the plan
            // TODO: create this API endpoint on the backend
            const response = await api.post('/website/api/edit-chatbot-style', {
                theme: theme
            });
            // set plan_id in local storage
            localStorage.setItem('plan_id', response.data.plan.plan_id);
            // set plan_id in url
            params.set('plan_id', response.data.plan.plan_id);
            window.history.pushState({}, '', `${url.pathname}?${params.toString()}`);
            
            // If successful, proceed to next step
            onNextStep();
        } catch (error) {
            console.error("Error creating chatbot:", error);
            // You might want to show an error message to the user here
        }
    };

    return (
        <div className="flex flex-col w-full">
            <h2>Customize styling and test chatbot</h2>
            <p className="text-center mb-15">Almost done!  Here, you can talk to your chatbot to see how it responds to different questions.  You can also change the theme and styling of your chatbot to fit your website's colors and branding.</p>
            <button onClick={onPreviousStep} className="bg-color-dark text-white rounded-[8px] p-2 mb-8 cursor-pointer h-12 w-[50%] mx-auto">Go back to settings</button>
            <ThemePicker label="Color Theme" value={theme} onChange={setTheme} />
            <ChatbotPreview />
            <Button disabled={!isThemeSelected} onClick={handleContinue}>Continue</Button>
        </div>
    )
}

export default TestChatbot;