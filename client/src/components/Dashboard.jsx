import { useGetRecommendationsQuery } from '../api/userApi';
import { useUpdateMasteryMutation } from '../api/userApi';

const userId = '654321'; // Dummy User ID

const UserDashboard = () => {
    const { data, isLoading, error } = useGetRecommendationsQuery(userId);
    const [updateMastery] = useUpdateMasteryMutation();
    
    // Example: Mastery update logic
    const handleUpdateMastery = async (contentId, isCorrect) => {
        await updateMastery({ userId, contentId, isCorrect });
        alert('Mastery updated!');
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md h-full col-span-1">
            <h2 className="text-2xl font-semibold mb-4">Personalized Recommendations</h2>
            {isLoading && <p>Loading recommendations...</p>}
            {error && <p className="text-red-500">Error loading recommendations.</p>}
            {data && data.recommendations.length > 0 ? (
                <ul className="list-disc list-inside space-y-2">
                    {data.recommendations.map((item, index) => (
                        <li key={index} className="text-blue-600">
                            Recommended Item ID: {item.contentId}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No recommendations available. Try completing some questions!</p>
            )}
            <p className="mt-4 text-sm text-gray-500">
                This dashboard shows recommendations based on your mastery score.
                (Note: This is a dummy UI. Backend logic will determine recommendations.)
            </p>
        </div>
    );
};

export default UserDashboard;