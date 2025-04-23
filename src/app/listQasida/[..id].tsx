'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Qasida {
    title: string;
    verse: {
        sadr: string;
        ajz: string;
    };
    tags: string[];
}

export default function QasidaDetailed() {
    const params = useParams();
    const id = params?.id?.[0];

    const [qasida, setQasida] = useState<Qasida | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            fetch(`/api/poem/${id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch qasida');
                    }
                    return response.json();
                })
                .then((data: Qasida) => {
                    setQasida(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error:', error);
                    setError(error.message);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) return <div className="text-center p-4">جاري التحميل...</div>;
    if (error) return <div className="text-center p-4 text-red-500">حدث خطأ: {error}</div>;
    if (!qasida) return <div className="text-center p-4">لم يتم العثور على القصيدة</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-right">{qasida.title}</h1>
            <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-right text-lg">{qasida.verse.sadr}</div>
                    <div className="text-right text-lg">{qasida.verse.ajz}</div>
                </div>
                <div className="flex flex-wrap gap-2 justify-end">
                    {qasida.tags.map((tag, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}