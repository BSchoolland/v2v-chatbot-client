// src/app/chatbot-creation/page.jsx
import CreateChatbot from "@/components/chatbot-creation/step1/createChatbot";
import CollectWebsiteContent from "@/components/chatbot-creation/step2/collectWebsiteContent";
import CustomizeChatbot from "@/components/chatbot-creation/step3/customizeChatbot";
import TestChatbot from "@/components/chatbot-creation/step4/testChatbot";
import DeployChatbot from "@/components/chatbot-creation/step5/deployChatbot";

function CreateChatbotPage() {
    return <div className="flex flex-col items-center">
        <h1>Create a chatbot</h1>
        <p>Lets make your first chatbot!</p>
        <CreateChatbot />
        <CollectWebsiteContent />
        <CustomizeChatbot />
        <TestChatbot />
        <DeployChatbot />
    </div>;
}

export default CreateChatbotPage;