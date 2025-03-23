// src/components/onboarding/step1/planCard.tsx

function PlanCard({ plan, isSelected, onSelect }: { plan: any, isSelected?: boolean, onSelect?: () => void }) {
    return (
        <div 
            className={`flex flex-col w-full border-1  rounded-[8px] p-4 cursor-pointer bg-card ${
                isSelected ? 'border-color-primary' : 'border-gray-300'
            }`}
            onClick={onSelect}
        >
            <p className="text-[24px] font-bold">{plan.name}</p>
            <p className="text-[18px] font-bold text-left">
                ${plan.monthlyCost}
                <span className="pl-1 text-[12px] font-light">/mo</span>
            </p>
            <ul className="mt-4 gap-2 flex flex-col">
                {plan.features.map((feature: string) => (
                <li className="text-[14px] text-left" key={feature}>{feature}</li>
                ))}
            </ul>
        </div>
    )
}

export default PlanCard;