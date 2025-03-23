'use client'
// src/components/onboarding/step1/createChatbot.jsx
import { useState } from "react";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/textInput";
import { initiateWebscrape, deletePage } from "@/utils/api";
import WebscrapeButton from "./webscrapeButton";
import WebscrapeProgressIndicator from "./webscrapeProgressIndicator";
import { useSearchParams } from 'next/navigation'
import ScrapedPage from "./scrapedPage";

function CollectWebsiteContent({ onNextStep }) {
    const [websiteUrl, setWebsiteUrl] = useState("");
    const [webscrapeStatus, setWebscrapeStatus] = useState("idle");
    const [webscrapeProgress, setWebscrapeProgress] = useState(0);
    const [scrapedPages, setScrapedPages] = useState([]);
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

    const handleDeletePage = async (url) => {
        try {
            await deletePage(url, planId);
            setScrapedPages(pages => pages.filter(page => page.url !== url));
        } catch (error) {
            console.error("Error deleting page:", error);
            // You might want to show an error message to the user here
        }
    };

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
            {scrapedPages.length > 0 && (
                <div className="flex flex-col items-center justify-center w-full bg-color-light p-4 rounded-lg my-10">
                    <div className="flex items-center w-full my-2">
                        <hr className="flex-grow border-t border-dark" />
                        <span className="mx-2 text-color-dark font-bold text-[14px]">Fetched pages: {scrapedPages.length}</span>
                        <hr className="flex-grow border-t border-dark" />
                    </div>
                    <div className="w-full overflow-y-auto max-h-[300px]">
                        {scrapedPages.map((page) => (
                            <ScrapedPage 
                                key={page.url} 
                                url={page.url} 
                                internal={page.internal} 
                                onDelete={() => handleDeletePage(page.url)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default CollectWebsiteContent;