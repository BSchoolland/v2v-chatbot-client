// A component for displaying help text
import { useState, useRef, useEffect } from "react";

function HelpText({ text }) {
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ position: 'center', arrowOffset: 0 });
    const tooltipRef = useRef(null);
    const triggerRef = useRef(null);

    useEffect(() => {
        if (showTooltip && tooltipRef.current && triggerRef.current) {
            const tooltip = tooltipRef.current;
            const trigger = triggerRef.current;
            const tooltipRect = tooltip.getBoundingClientRect();
            const triggerRect = trigger.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            
            // Calculate if tooltip would go off screen
            const tooltipLeft = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
            const tooltipRight = tooltipLeft + tooltipRect.width;
            
            let position = 'center';
            let arrowOffset = 0;
            
            // Check if tooltip goes off the right side
            if (tooltipRight > viewportWidth - 10) { // 10px margin
                position = 'right';
                // Position tooltip so its right edge is 10px from viewport edge
                const newLeft = viewportWidth - tooltipRect.width - 10;
                // Calculate how much the arrow needs to move to still point to trigger
                arrowOffset = triggerRect.left + triggerRect.width / 2 - newLeft - tooltipRect.width / 2;
            }
            // Check if tooltip goes off the left side
            else if (tooltipLeft < 10) { // 10px margin
                position = 'left';
                // Position tooltip 10px from left edge
                const newLeft = 10;
                // Calculate how much the arrow needs to move to still point to trigger
                arrowOffset = triggerRect.left + triggerRect.width / 2 - newLeft - tooltipRect.width / 2;
            }
            
            setTooltipPosition({ position, arrowOffset });
        }
    }, [showTooltip]);

    const getTooltipClasses = () => {
        const baseClasses = "w-[20rem] absolute bottom-full mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg shadow-lg z-10 break-words whitespace-normal text-center";
        
        switch (tooltipPosition.position) {
            case 'left':
                return `${baseClasses} left-0`;
            case 'right':
                return `${baseClasses} right-0`;
            default:
                return `${baseClasses} left-1/2 transform -translate-x-1/2`;
        }
    };

    const getArrowClasses = () => {
        return "absolute top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800";
    };

    const getArrowStyle = () => {
        if (tooltipPosition.position === 'center') {
            return {
                left: '50%',
                transform: 'translateX(-50%)'
            };
        } else {
            return {
                left: `calc(50% + ${tooltipPosition.arrowOffset}px)`,
                transform: 'translateX(-50%)'
            };
        }
    };

    return (
        <div className="flex flex-row justify-center items-center relative">
            <div
                ref={triggerRef}
                className="w-5 h-5 bg-gray-400 hover:bg-gray-600 rounded-full flex items-center justify-center cursor-help transition-colors duration-200"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                <span className="text-white text-xs font-bold leading-none">?</span>
            </div>
            
            {showTooltip && (
                <div ref={tooltipRef} className={getTooltipClasses()}>
                    {text}
                    <div 
                        className={getArrowClasses()} 
                        style={getArrowStyle()}
                    ></div>
                </div>
            )}
        </div>
    );
}

export default HelpText;