'use client'
// src/app/chatbot-creation/page.jsx
import CreateChatbot from "@/components/chatbot-creation/step1/createChatbot";
import CollectWebsiteContent from "@/components/chatbot-creation/step2/collectWebsiteContent";
import CustomizeChatbot from "@/components/chatbot-creation/step3/customizeChatbot";
import TestChatbot from "@/components/chatbot-creation/step4/testChatbot";
import DeployChatbot from "@/components/chatbot-creation/step5/deployChatbot";
import Button from "@/components/ui/button";
import { withAuth } from "@/components/auth/withAuth";
import { useState } from "react";
import ProgressStepIndicator from "@/components/chatbot-creation/progressStepIndicator";
function CreateChatbotPage() {
    const [step, setStep] = useState(parseInt(localStorage.getItem("chatbotCreationStep")) || 1);

    const handleNextStep = () => {
        setStep(step + 1);
        // set the step in local storage
        localStorage.setItem("chatbotCreationStep", step + 1);
    }

    const finishChatbotCreation = () => {
        localStorage.removeItem("chatbotCreationStep");
        router.push("/dashboard");
    }

    return <div className="flex flex-col items-center w-[600px] mx-auto">
        <ProgressStepIndicator step={step} />
        {step === 1 && <CreateChatbot onNextStep={handleNextStep} />}
        {step === 2 && <CollectWebsiteContent onNextStep={handleNextStep} />}
        {step === 3 && <CustomizeChatbot onNextStep={handleNextStep} />}
        {step === 4 && <TestChatbot onNextStep={handleNextStep} />}
        {step === 5 && <DeployChatbot onNextStep={finishChatbotCreation} />}
    </div>;
}

export default withAuth(CreateChatbotPage);