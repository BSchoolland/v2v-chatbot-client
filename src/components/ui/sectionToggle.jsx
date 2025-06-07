// src/components/ui/sectionToggle.jsx
import { useState } from "react";
// A component for toggling between sections of a form

function SectionToggle({ section1, section2 }) {
    const [activeSection, setActiveSection] = useState(section1);

    const handleSectionChange = (section) => {
        setActiveSection(section);
    }

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-row gap-4 mb-6">
                <div 
                    className="flex flex-col items-center flex-1 cursor-pointer" 
                    onClick={() => handleSectionChange(section1)}
                >
                    <button className="mb-2 cursor-pointer">
                        {section1.title}
                    </button>
                    <hr 
                        key={1} 
                        className={`
                            w-full h-2 border-none rounded-full bg-[#909090] cursor-pointer
                            transition-all duration-500 ease-out
                            ${activeSection === section1 ? "bg-color-primary scale-y-110" : ""}
                        `}
                    />
                </div>
                <div 
                    className="flex flex-col items-center flex-1 cursor-pointer" 
                    onClick={() => handleSectionChange(section2)}
                >
                    <button className="mb-2 cursor-pointer">
                        {section2.title}
                    </button>
                    <hr 
                        key={2} 
                        className={`
                            w-full h-2 border-none rounded-full bg-[#909090] cursor-pointer
                            transition-all duration-500 ease-out
                            ${activeSection === section2 ? "bg-color-primary scale-y-110" : ""}
                        `}
                    />
                </div>
            </div>
            <div className="flex flex-row items-center justify-center">
                <div className={`w-full ${activeSection === section1 ? "block" : "hidden"}`}>
                    {section1.component}
                </div>
                <div className={`w-full ${activeSection === section2 ? "block" : "hidden"}`}>
                    {section2.component}
                </div>
            </div>
        </div>
    )
}

export default SectionToggle;