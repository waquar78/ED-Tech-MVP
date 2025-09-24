import React, { useState } from 'react';
import { useGetAllContentQuery, useGetContentBySubjectQuery } from "../api/contentApi";

const ContentExplorer = () => {
    const [selectedSubject, setSelectedSubject] = useState(null);

    // Fetch all content for subjects display
    const { data: allContent, isLoading: allLoading, error: allError } = useGetAllContentQuery();
    
    // Fetch content for a specific subject if selected
    const { data: subjectContent, isLoading: subjectLoading, error: subjectError } = useGetContentBySubjectQuery(selectedSubject, { skip: !selectedSubject });

    const handleSubjectClick = (subject) => {
        setSelectedSubject(subject);
    };

    const uniqueSubjects = allContent ? [...new Set(allContent.map(item => item.metadata.subject))] : [];

    return (
        <div className="bg-white p-6 rounded-lg shadow-md h-full col-span-1">
            <h2 className="text-2xl font-semibold mb-4">Content Explorer</h2>

            {selectedSubject ? (
                <div>
                    <button 
                        onClick={() => setSelectedSubject(null)}
                        className="mb-4 text-blue-600 hover:underline"
                    >
                        ← Back to all subjects
                    </button>
                    <h3 className="text-xl font-bold mb-4">{selectedSubject} Content</h3>
                    {subjectLoading && <p>Loading content for {selectedSubject}...</p>}
                    {subjectError && <p className="text-red-500">Error fetching content.</p>}
                    {subjectContent?.length > 0 ? (
                        <ul className="space-y-4">
                            {subjectContent.map((item) => (
                                <li key={item._id} className="p-4 border rounded-md">
                                    <p className="font-semibold">{item.metadata.topic}</p>
                                    <p className="text-sm text-gray-600">{item.text.substring(0, 100)}...</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        !subjectLoading && <p>No content found for this subject.</p>
                    )}
                </div>
            ) : (
                <div>
                    {allLoading && <p>Loading subjects...</p>}
                    {allError && <p className="text-red-500">Error fetching subjects.</p>}
                    {allContent && uniqueSubjects.length > 0 ? (
                        <div className="space-y-2">
                            {uniqueSubjects.map((subject, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSubjectClick(subject)}
                                    className="block w-full text-left p-3 border rounded-md hover:bg-gray-100"
                                >
                                    {subject}
                                </button>
                            ))}
                        </div>
                    ) : (
                        !allLoading && <p>No subjects found. Run preprocessing scripts.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ContentExplorer;