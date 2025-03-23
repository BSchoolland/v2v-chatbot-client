'use client'
// src/components/onboarding/step1/createChatbot.jsx
import { useState } from "react";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/textInput";
import { initiateWebscrape } from "@/utils/api";
import WebscrapeButton from "./webscrapeButton";
import WebscrapeProgressIndicator from "./webscrapeProgressIndicator";
import { useSearchParams } from 'next/navigation'
import ScrapedPage from "./scrapedPage";

function CollectWebsiteContent({ onNextStep }) {
    const [websiteUrl, setWebsiteUrl] = useState("");
    const [webscrapeStatus, setWebscrapeStatus] = useState("idle");
    const [webscrapeProgress, setWebscrapeProgress] = useState(0);
    const [scrapedPages, setScrapedPages] = useState([{url: "https://www.example.com", internal: true}]);
    const searchParams = useSearchParams();
    const planId = searchParams.get('plan_id') || localStorage.getItem('plan_id');
    const handleContinue = async () => {
        try {
            // proceed to next step
            onNextStep();
        } catch (error) {
            // this should never happen
            console.error("Error collecting website content:", error);
        }
    };

    const onMessage = (data) => {
        setWebscrapeProgress(data.percentage || 0);
        if (data.complete) {
            setWebscrapeStatus("completed");
            setWebscrapeProgress(100);
            console.log(data.allUrls);
            setScrapedPages(data.allUrls);
        }
    }

    // This is a mock function that simulates the webscrape process
    const handleWebscrape = async () => {
        setWebscrapeStatus("inProgress");
        initiateWebscrape(websiteUrl, planId, onMessage);
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
            {webscrapeStatus !== "idle" && <WebscrapeProgressIndicator progress={webscrapeProgress} status={webscrapeStatus}/>}
            <Button onClick={handleContinue} disabled={webscrapeStatus !== "completed"}>Continue</Button>
            {scrapedPages.map((page) => (
                <ScrapedPage key={page.url} url={page.url} internal={page.internal} />
            ))}
        </div>
    )
}

export default CollectWebsiteContent;