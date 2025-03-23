// src/components/onboarding/scrapedPage.jsx

function ScrapedPage({url, internal}) {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <p>{url}</p>
            <h3>Scraped page component goes here</h3>
        </div>
    )
}

export default ScrapedPage;