// src/components/onboarding/step3/customizeChatbot.jsx
import TextInput from "@/components/ui/textInput";
import TextArea from "@/components/ui/textArea";
import SectionToggle from "@/components/ui/sectionToggle";
import SuggestedQuestions from "@/components/chatbot-creation/step3/suggestedQuestions";
import Button from "@/components/ui/button";
import api from "@/utils/api";
import { useState } from "react";
import OptionsInput from "@/components/ui/optionsInput";

function CustomizeChatbot({ onNextStep }) {
    const [chatbotName, setChatbotName] = useState("");
    const [chatbotBehavior, setChatbotBehavior] = useState("");
    const [welcomeMessage, setWelcomeMessage] = useState("");
    const [suggestedQuestions, setSuggestedQuestions] = useState(["", "", ""]);

    const [chatbotModel, setChatbotModel] = useState("gpt-4o-mini");
    const [contentUpdateFrequency, setContentUpdateFrequency] = useState("Weekly");
    const [referenceExternalLinks, setReferenceExternalLinks] = useState("No");
    const [sendCreditLowEmail, setSendCreditLowEmail] = useState("25% credits remaining");
    const [perUserMessageLimit, setPerUserMessageLimit] = useState("25 messages per day");
    const [recordUserSessions, setRecordUserSessions] = useState("Yes");
    const [contactLink, setContactLink] = useState("");
    const isFormValid = chatbotName.trim() !== "" && (suggestedQuestions.every(question => question.trim() !== "") || suggestedQuestions.length === 0);

    const handleContinue = async () => {
        try {
            // Make API call to create the plan
            // TODO: create this API endpoint on the backend
            const response = await api.post('/website/api/edit-chatbot', {
                chatbotName: chatbotName,
                chatbotBehavior: chatbotBehavior,
                welcomeMessage: welcomeMessage,
                suggestedQuestions: suggestedQuestions,
                chatbotModel: chatbotModel,
                contentUpdateFrequency: contentUpdateFrequency,
                referenceExternalLinks: referenceExternalLinks,
                sendCreditLowEmail: sendCreditLowEmail,
                perUserMessageLimit: perUserMessageLimit,
                recordUserSessions: recordUserSessions,
                contactLink: contactLink
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
                                    helpText="Give your chatbot additional instructions on how to behave complementary to or beyond the default question and answer behavior.  This could include rules for behavior, personality traits, and anything else you want to tell it about itself.  Leave blank for no additional instructions." 
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
                                <div className="flex flex-row w-full gap-8">
                                    <OptionsInput 
                                        label="Chatbot Model" 
                                        options={["gpt-4o-mini", "gpt-4o"]}
                                        helpText="The model you want to use for your chatbot.  This impacts the cost, speed, and response quality of the chatbot."
                                        value={chatbotModel}
                                        onChange={(e) => setChatbotModel(e.target.value)}
                                    />
                                    <OptionsInput 
                                        label="Content update frequency" 
                                        options={["Daily", "Weekly", "Monthly"]}
                                        helpText="The frequency at which the chatbot will automatically reindex your website.  This impacts how long it takes for new content on your site to be available to the chatbot.  You can always manually reindex your website after a major change by clicking the 'Reindex' button in the dashboard."
                                        value={contentUpdateFrequency}
                                        onChange={(e) => setContentUpdateFrequency(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-row w-full gap-8">
                                    <OptionsInput 
                                        label="Reference external links" 
                                        options={["Yes", "No"]}
                                        helpText="Whether the chatbot should reference additional sites that your site links to.  This provides the chatbot with more information, but may occasionally cause it to answer questions without using specific information from your site."
                                        value={referenceExternalLinks}
                                        onChange={(e) => setReferenceExternalLinks(e.target.value)}
                                    />
                                    <OptionsInput 
                                        label="Send credit low email" 
                                        options={["Never (0% credits remaining)", "10% credits remaining", "25% credits remaining", "50% credits remaining"]}
                                        helpText="When you want to receive an email that your chatbot is running low on credits."
                                        value={sendCreditLowEmail}
                                        onChange={(e) => setSendCreditLowEmail(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-row w-full gap-8">
                                    <OptionsInput 
                                        label="Per-User message limit" 
                                        options={["5 messages per day", "25 messages per day", "50 messages per day", "100 messages per day", "Unlimited"]}
                                        helpText="The maximum number of messages a single user can send to the chatbot per day.  After this limit is reached, the user will need to wait until the next day to get more questions answered.  This is to prevent abuse.."
                                        value={perUserMessageLimit}
                                        onChange={(e) => setPerUserMessageLimit(e.target.value)}
                                    />
                                    <OptionsInput 
                                        label="Record user sessions" 
                                        options={["Yes", "No"]}
                                        helpText="Whether to record conversations between users and the chatbot.  This allows you to see how users are interacting with the chatbot, and what kind of questions they are asking.  If set to false, we will not store any user data on our servers."
                                        value={recordUserSessions}
                                        onChange={(e) => setRecordUserSessions(e.target.value)}
                                    />
                                </div>
                                <TextInput 
                                    placeholder="Enter a contact link or email address" 
                                    label="Talk to a human (optional)" 
                                    helpText="The link to your contact page or business email address.  This is used to allow users to contact you directly from the chatbot if it is unable to answer their question."
                                    value={contactLink}
                                    onChange={(e) => setContactLink(e.target.value)}
                                />
                            </div>
                    }
                } 
            />
            <Button onClick={handleContinue} disabled={!isFormValid}>Continue</Button>
        </div>
    )
}

export default CustomizeChatbot;