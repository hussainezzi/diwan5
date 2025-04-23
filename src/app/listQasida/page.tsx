'use client';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { PoemFullType } from '@/../prisma/customType';

// interface Qasida {
//     title: string;
//     verse: {
//         sadr: string;
//         ajz: string;
//     };
//     tags: string[];
// }

// export default function QasidaDetailed() {
//     return (
//         <div className="text-center p-4">قائمة القصائد</div>
//     )
// }



const listQasidaPage = (): React.ReactElement => {
    const [qasidas, setQasidas] = useState<PoemFullType[]>([]);
    console.log('qasidas , oijoijo')

    useEffect(() => {
        fetch('/api/poem')
            .then((response) => response.json())
            .then((data: PoemFullType[]) => setQasidas(data))
            .catch((error) => console.error('Error:', error));
    }, []);




    console.log('qasidas', qasidas)

    return (
        <div>
            <h1>قائمة القصائد</h1>

            <div className='flex flex-col space-y-4 mt-4 w-1/2 mx-auto'>
            <label>ابحث عن القصيدة</label>
            <input
                type="text"
                id='search'
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder='ابحث عن القصيدة'
            />
            <button
                type='submit'
                className="bg-blue-500 text-white p-2 rounded-lg"
            >ابحث</button>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 w-3/4 mx-auto'>
            {qasidas.map((qasida, index) => (
                <div
                key={index}
                className="border border-gray-300 rounded-lg p-4 shadow-md"
                >
                <h2 className="text-lg font-bold mb-2">{qasida.title}</h2>
                <div className="space-y-2">
                    {qasida.verses.map(({ ajz, sadr }, idx) => (
                    <div key={idx} className="border-t pt-2">
                        <div className="font-semibold">{sadr}</div>
                        <div className="text-gray-600">{ajz}</div>
                    </div>
                    ))}
                </div>
                <div className="mt-2 text-sm text-gray-500">
                    {qasida.tags.join(', ')}
                </div>
                </div>
            ))}
            </div>
        </div>
    );
}

export default listQasidaPage;