import { useState } from 'react';
import { useGenerateLessonMutation } from '../api/lessonApi';

const LessonGenerator = () => {
    const [transcriptText, setTranscriptText] = useState('');
    const [generateLesson, { data, isLoading, error }] = useGenerateLessonMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await generateLesson(transcriptText);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md h-full">
            <h2 className="text-2xl font-semibold mb-4">Generate Lesson from Video Transcript</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <textarea
                    value={transcriptText}
                    onChange={(e) => setTranscriptText(e.target.value)}
                    placeholder="Paste video transcript here..."
                    className="p-2 border rounded-md resize-none h-40"
                    required
                />
                <button
                    type="submit"
                    className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 disabled:bg-gray-400"
                    disabled={isLoading}
                >
                    {isLoading ? 'Generating...' : 'Generate Lesson'}
                </button>
            </form>
            {error && <p className="mt-4 text-red-500">Error: {error.message}</p>}
            {data && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                    <h3 className="font-medium">Generated Lesson:</h3>
                    <pre className="whitespace-pre-wrap">{data.lesson}</pre>
                </div>
            )}
        </div>
    );
};

export default LessonGenerator;