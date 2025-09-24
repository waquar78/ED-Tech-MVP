import { useState } from 'react';
import { useScoreEssayMutation } from '../api/eassyApi';

const EssayForm = () => {
    const [essayData, setEssayData] = useState({
        question: '',
        markingScheme: '',
        answer: '',
        userId: '654321', // Dummy User ID
    });
    const [scoreEssay, { data, isLoading, error }] = useScoreEssayMutation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEssayData({ ...essayData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await scoreEssay(essayData);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md h-full">
            <h2 className="text-2xl font-semibold mb-4">Essay Scoring</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    name="question"
                    value={essayData.question}
                    onChange={handleChange}
                    placeholder="Question"
                    className="p-2 border rounded-md"
                    required
                />
                <textarea
                    name="markingScheme"
                    value={essayData.markingScheme}
                    onChange={handleChange}
                    placeholder="Marking Scheme"
                    className="p-2 border rounded-md resize-none h-20"
                    required
                />
                <textarea
                    name="answer"
                    value={essayData.answer}
                    onChange={handleChange}
                    placeholder="Student's Answer"
                    className="p-2 border rounded-md resize-none h-40"
                    required
                />
                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:bg-gray-400"
                    disabled={isLoading}
                >
                    {isLoading ? 'Scoring...' : 'Score Essay'}
                </button>
            </form>
            {error && <p className="mt-4 text-red-500">Error: {error.message}</p>}
            {data && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                    <h3 className="font-medium">Result:</h3>
                    <p>Score: {data.score}/25</p>
                    <p>Feedback: {data.feedback}</p>
                </div>
            )}
        </div>
    );
};

export default EssayForm;