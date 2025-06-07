// src/components/onboarding/step3/customizeChatbot.jsx
import TextInput from "@/components/ui/textInput";
import TextArea from "@/components/ui/textArea";
import SectionToggle from "@/components/ui/sectionToggle";
import SuggestedQuestions from "@/components/chatbot-creation/step3/suggestedQuestions";
import Button from "@/components/ui/button";
import api from "@/utils/api";
import { useState } from "react";

function CustomizeChatbot() {
    const [chatbotName, setChatbotName] = useState("");
    const [chatbotBehavior, setChatbotBehavior] = useState("");
    const [welcomeMessage, setWelcomeMessage] = useState("");
    const [suggestedQuestions, setSuggestedQuestions] = useState(["", "", ""]);

    const isFormValid = chatbotName.trim() !== "" && (suggestedQuestions.every(question => question.trim() !== "") || suggestedQuestions.length === 0);

    const handleContinue = async () => {
        try {
            // Make API call to create the plan
            const response = await api.post('/website/api/edit-chatbot', {
                chatbotName: chatbotName,
                chatbotBehavior: chatbotBehavior,
                welcomeMessage: welcomeMessage,
                suggestedQuestions: suggestedQuestions
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
            <h2>Customize your chatbot</h2>
            <p className="text-center mb-15">Customize how your chatbot will behave.</p>
            <SectionToggle 
                section1={
                    {
                        title: "Basic Settings", 
                        component: 
                            <div className="flex flex-col w-full">
                                <TextInput 
                                    placeholder="Enter a name for your chatbot" 
                                    label="Chatbot Name" 
                                    helpText="This is the name of your chatbot. The name will be used to identify it in the dashboard." 
                                    value={chatbotName}
                                    onChange={(e) => setChatbotName(e.target.value)}
                                />
                                <TextArea 
                                    size="large" 
                                    placeholder="Customize the behavior of your chatbot.  Should it be professional, casual, or something else?" 
                                    label="Chatbot Behavior" 
                                    helpText="Give your chatbot instructions on how to behave.  This could include rules for behavior, personality traits, and anything else you want to tell it about itself.  Leave blank if you want to use the default behavior." 
                                    value={chatbotBehavior}
                                    onChange={(e) => setChatbotBehavior(e.target.value)}
                                />
                                <TextArea 
                                    size="medium" 
                                    placeholder="Enter the first message your users will see when opening the chatbot" 
                                    label="Welcome Message" 
                                    helpText="This is the first message your users will see when opening the chatbot.  Leave blank for no welcome message." 
                                    value={welcomeMessage}
                                    onChange={(e) => setWelcomeMessage(e.target.value)}
                                />
                                <SuggestedQuestions 
                                    label="Suggested Questions" 
                                    helpText="These are some suggested questions that you can use to get started.  We suggest having between 0 and 4 suggested questions." 
                                    value={suggestedQuestions}
                                    onChange={(newQuestions) => setSuggestedQuestions(newQuestions)}
                                />
                            </div>
                    }
                } 
                section2={
                    {
                        title: "Advanced Settings", 
                        component: 
                           <div className="flex flex-col w-full">
                                <h1>Advanced Settings go here</h1>
                            </div>
                    }
                } 
            />
            <Button onClick={handleContinue} disabled={!isFormValid}>Continue</Button>


        </div>
    )
}

export default CustomizeChatbot;