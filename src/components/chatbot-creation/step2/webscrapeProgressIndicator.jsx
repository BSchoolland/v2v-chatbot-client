// src/components/onboarding/webscrapeProgressIndicator.jsx

function WebscrapeProgressIndicator({ progress, status }) {
    return (
        <div className="flex flex-col items-left justify-center w-full mt-6">
            <p className="text-color-light text-[12px]">{progress}% complete</p>
            <div className="w-full h-2 bg-gray-200 rounded-full mb-6">
                <div 
                    className="h-full bg-color-primary rounded-full relative overflow-hidden" 
                    style={{ 
                        width: `${progress}%`,
                    }}
                >
                    <div className={`absolute inset-0 ${status === 'inProgress' ? 'shimmer-effect' : ''}`}></div>
                </div>
            </div>

            <style jsx>{`
                @keyframes shimmer {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }

                .shimmer-effect {
                    background: linear-gradient(
                        90deg,
                        rgba(255, 255, 255, 0) 0%,
                        rgba(255, 255, 255, 0.5) 50%,
                        rgba(255, 255, 255, 0) 100%
                    );
                    animation: shimmer 5s infinite;
                }
            `}</style>
        </div>
    )
}

export default WebscrapeProgressIndicator;