import { useState } from 'react';
import { useRagSearchMutation } from '../api/searchApi';

const SearchBox = () => {
    const [query, setQuery] = useState('');
    const [ragSearch, { data, isLoading, error }] = useRagSearchMutation();

    const handleSearch = async (e) => {
        e.preventDefault();
        if (query.trim()) {
            await ragSearch(query);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md h-full">
            <h2 className="text-2xl font-semibold mb-4">RAG Search</h2>
            <form onSubmit={handleSearch} className="flex gap-2">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask a question..."
                    className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                    disabled={isLoading}
                >
                    {isLoading ? 'Searching...' : 'Search'}
                </button>
            </form>
            {error && <p className="mt-4 text-red-500">Error: {error.message}</p>}
            {data && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                    <h3 className="font-medium">Answer:</h3>
                    <p>{data.answer}</p>
                    <h3 className="font-medium mt-2">Sources:</h3>
                    <pre className="text-sm overflow-auto max-h-40">{JSON.stringify(data.sources, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default SearchBox;