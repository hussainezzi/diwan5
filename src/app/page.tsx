import React from 'react'
import Link from 'next/link'


export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-white p-8 text-right">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">ديوان لي</h1>
        <p className="text-xl mb-8 text-gray-600">
          منصة لحفظ وتدوين الشعر العربي بطريقة سهلة وأنيقة
        </p>
        <div className="space-x-4 rtl:space-x-reverse">
          <Link 
            href="/createQasida" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            قصيدة جديدة
          </Link>
          <Link 
            href="/listQasida" 
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
          >
            استعراض القصائد
          </Link>
        </div>
      </div>
    </main>
  )
} 
    