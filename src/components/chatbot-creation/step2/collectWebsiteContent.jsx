'use client'
// src/components/onboarding/step1/createChatbot.jsx
import { useState } from "react";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/textInput";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import WebscrapeButton from "./webscrapeButton";

function CollectWebsiteContent({ onNextStep }) {
    const [websiteUrl, setWebsiteUrl] = useState("");
    const [webscrapeStatus, setWebscrapeStatus] = useState("idle");
    const router = useRouter();

    const handleContinue = async () => {
        try {
            // proceed to next step
            onNextStep();
        } catch (error) {
            // this should never happen
            console.error("Error collecting website content:", error);
        }
    };

    const handleWebscrape = async () => {
        setWebscrapeStatus("inProgress");
        await new Promise(resolve => setTimeout(resolve, 5000));
        setWebscrapeStatus("completed");
    }

    const isFormValid = websiteUrl.trim() !== "" && /^https?:\/\/[^\s/$.?#].[^\s]*$/.test(websiteUrl);

    return (
        <div className="flex flex-col items-center justify-center">
            <h2>Collect your website's content</h2>
            <p className="text-center mb-15">For our next step, we'll need you to enter your website's link below to analyze it.  This will allow your chatbot to answer questions about your content.</p>
            <div className="flex flex-row items-center justify-center w-full gap-4 align-bottom">
                <TextInput 
                    label="Enter website url:" 
                    placeholder="https://www.example.com" 
                    disabled={webscrapeStatus !== "idle"}
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                />
                <WebscrapeButton onClick={handleWebscrape} disabled={!isFormValid} scraperStatus={webscrapeStatus}>Fetch all pages</WebscrapeButton>
            </div>
            <Button onClick={handleContinue} disabled={webscrapeStatus !== "completed"}>Continue</Button>

        </div>
    )
}

export default CollectWebsiteContent;