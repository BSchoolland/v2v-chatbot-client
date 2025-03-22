// src/components/chatbot-creation/step1/plans.tsx

import { useState } from 'react';
import PlanCard from "./planCard";

// sample data for the plans
const plans = [
    {
        name: "Free",
        monthlyCost: 0,
        features: [
            "50 messages/month",
            "GPT-4o mini model",
            "Weekly re-indexing",
            "Understands up to 100 webpages",
            "Store and access 5 documents",
        ]
    },
    {
        name: "Basic",
        monthlyCost: 8,
        features: [
            "1000 messages/month",
            "Access to all models",
            "Weekly re-indexing",
            "Understands up to 200 webpages",
            "Store and access 20 documents",
        ]
    },
    {
        name: "Pro",
        monthlyCost: 30,
        features: [
            "5000 messages/month",
            "Access to all models",
            "Daily re-indexing",
            "Understands up to 200 webpages",
            "Store and access unlimited documents",
        ]
    }
];

function Plans({ onPlanSelect }: { onPlanSelect?: (plan: any) => void }) {
    const [selectedPlan, setSelectedPlan] = useState<any>(null);

    const handlePlanSelect = (plan: any) => {
        setSelectedPlan(plan);
        onPlanSelect?.(plan);
    };

    return <div className="flex flex-col w-full gap-4">
        <label className="text-[16px] text-color-neutral mt-3">Choose a plan:</label>
        <div className="flex flex-row w-full gap-4">
            {plans.map((plan) => (
                <PlanCard 
                    key={plan.name} 
                    plan={plan} 
                    isSelected={plan.name === selectedPlan?.name}
                    onSelect={() => handlePlanSelect(plan)}
                />
            ))}
        </div>
    </div>;
}

export default Plans;