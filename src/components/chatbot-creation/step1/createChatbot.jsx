'use client'
// src/components/onboarding/step1/createChatbot.jsx
import { useState } from "react";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/textInput";
import Plans from "./plans";
import api from "@/utils/api";

function CreateChatbot({ onNextStep }) {
    const [chatbotName, setChatbotName] = useState("");
    const [selectedPlan, setSelectedPlan] = useState(null);

    const handleContinue = async () => {
        try {
            // Make API call to create chatbot
            await api.post('/website/api/chatbots', {
                name: chatbotName,
                plan: selectedPlan.name
            });
            
            // If successful, proceed to next step
            onNextStep();
        } catch (error) {
            console.error("Error creating chatbot:", error);
            // You might want to show an error message to the user here
        }
    };

    const isFormValid = chatbotName.trim() !== "" && selectedPlan !== null;

    return (
        <div className="flex flex-col items-center justify-center">
            <h2>Create a new chatbot</h2>
            <p className="text-center mb-15">Hi there! To get started, enter the name for your new chatbot and choose one of the plans below to proceed with the following setup process.</p>
            <TextInput 
                label="Enter chatbot name:" 
                placeholder="My chatbot" 
                value={chatbotName}
                onChange={(e) => setChatbotName(e.target.value)}
            />
            <Plans onPlanSelect={setSelectedPlan} />
            <br />
            <Button onClick={handleContinue} disabled={!isFormValid}>Continue</Button>
            
        </div>
    )
}

export default CreateChatbot;