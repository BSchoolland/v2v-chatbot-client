// src/components/onboarding/step3/customizeChatbot.jsx
import TextInput from "@/components/ui/textInput";
import TextArea from "@/components/ui/textArea";
import SectionToggle from "@/components/ui/sectionToggle";

function CustomizeChatbot() {
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
                                    helpText="This is the name of your chatbot. It will be used to identify your chatbot in the dashboard." 
                                />
                                <TextArea 
                                    size="large" 
                                    placeholder="Customize the behavior of your chatbot.  Should it be professional, casual, or something else?" 
                                    label="Chatbot Behavior" 
                                    helpText="Give your chatbot instructions on how to behave.  This could include rules for behavior, personality traits, and anything else you want to tell it about itself." 
                                />
                                <TextArea 
                                    size="medium" 
                                    placeholder="Enter the first message your users will see when opening the chatbot" 
                                    label="Welcome Message" 
                                    helpText="This is the first message your users will see when opening the chatbot." 
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

        </div>
    )
}

export default CustomizeChatbot;