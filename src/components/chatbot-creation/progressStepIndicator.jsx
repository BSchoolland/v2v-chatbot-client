// src/components/onboarding/progressStepIndicator.jsx

const totalSteps = 5;
function ProgressStepIndicator({step}) {
    return (
        <div className="flex flex-row justify-between w-full mt-20 mb-10">
            {Array.from({ length: totalSteps }).map((_, index) => (
                <hr 
                    key={index} 
                    className={`
                        w-[100px] h-2 border-none rounded-full bg-[#909090]
                        transition-all duration-500 ease-out
                        ${index < step ? "bg-color-primary scale-110" : ""}
                    `}
                />
            ))}
        </div>
    )
}

export default ProgressStepIndicator;