'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Verse {
  sadr: string
  ajz: string
}

export default function CreateQasida() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [verses, setVerses] = useState<Verse[]>([{ sadr: '', ajz: '' }])
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addVerse = () => {
    setVerses([...verses, { sadr: '', ajz: '' }])
  }

  const updateVerse = (index: number, field: 'sadr' | 'ajz', value: string) => {
    const newVerses = [...verses]
    newVerses[index][field] = value
    setVerses(newVerses)
  }

  const removeVerse = (index: number) => {
    if (verses.length > 1) {
      setVerses(verses.filter((_, i) => i !== index))
    }
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // TODO: Replace with actual user ID from authentication
      const tempAuthorId = "temp-user-id"
      
      const response = await fetch('/api/poem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          verses,
          tags,
          authorId: tempAuthorId
        })
      })

      console.log('Response:', response)

      if (!response.ok) {
        throw new Error('Failed to create he poem')
      }

      const newPoem = await response.json()
      router.push(`/listQasida`)
    } catch (error) {
      console.error('Error creating poem:', error)
      alert('حدث خطأ أثناء حفظ القصيدة')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-white p-8 text-right">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">قصيدة جديدة</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-2">
              العنوان
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              dir="rtl"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-lg font-medium text-gray-700">الأبيات</label>
            {verses.map((verse, index) => (
              <div key={index} className="flex gap-4 items-start">
                <button
                  type="button"
                  onClick={() => removeVerse(index)}
                  className="p-2 text-red-500 hover:text-red-700"
                  disabled={verses.length === 1}
                >
                  ✕
                </button>
                <div className="flex-grow space-y-2">
                  <input
                    type="text"
                    value={verse.sadr}
                    onChange={(e) => updateVerse(index, 'sadr', e.target.value)}
                    placeholder="صدر البيت"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                    dir="rtl"
                  />
                  <input
                    type="text"
                    value={verse.ajz}
                    onChange={(e) => updateVerse(index, 'ajz', e.target.value)}
                    placeholder="عجز البيت"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                    dir="rtl"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addVerse}
              className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400"
            >
              + إضافة بيت جديد
            </button>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              الوسوم
            </label>
            <div className="flex gap-2 mb-2 flex-wrap">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="أضف وسماً"
                className="flex-grow p-3 border border-gray-300 rounded-lg"
                dir="rtl"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                إضافة
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isSubmitting ? 'جاري الحفظ...' : 'حفظ القصيدة'}
          </button>
        </form>
      </div>
    </main>
  )
}