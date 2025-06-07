import HelpText from '@/components/ui/helpText';
import Question from '@/components/chatbot-creation/step3/question';
import { useState } from 'react';
// suggested questions
function SuggestedQuestions({ placeholder, label, helpText, value, onChange, ...props }) {
    const [questions, setQuestions] = useState(value);

    const updateQuestion = (value, index) => {
        const newQuestions = [...questions];
        newQuestions[index] = value;
        setQuestions(newQuestions);
        onChange(newQuestions);
    }

    const addQuestion = () => {
        setQuestions([...questions, ""]);
        onChange([...questions, ""]);
    }

    const deleteQuestion = (index) => {
        const newQuestions = [...questions];
        newQuestions.splice(index, 1);
        setQuestions(newQuestions);
        onChange(newQuestions);
    }
    
    //  size options: small, medium, large
    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-row justify-between items-end">
                {label && <label className="text-[16px] text-color-neutral mt-3">{label}</label>}
                {helpText && <HelpText text={helpText} />}
            </div>
            <div className="flex flex-col w-full">
                {questions.map((question, index) => (
                    <Question key={index} value={question} onChange={(e) => updateQuestion(e.target.value, index)} onDelete={() => deleteQuestion(index)}/>
                ))}
            </div>
            <button className="bg-color-dark text-white rounded-[8px] p-2 mb-8 cursor-pointer h-12 w-[50%] mx-auto" onClick={addQuestion}>Add Question</button>
        </div>
    )
}

export default SuggestedQuestions;