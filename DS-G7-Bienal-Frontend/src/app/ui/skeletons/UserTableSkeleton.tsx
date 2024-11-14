import React from 'react'

export default function TableUserSkeleton() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="space-y-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="bg-white shadow-md rounded-lg mb-4 overflow-hidden">
            <div className="p-4 flex justify-between items-center">
              <div className="space-y-2">
                <div className="h-6 w-48 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="h-4 w-32 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="h-4 w-40 bg-gray-200 rounded-md animate-pulse"></div>
              </div>
              <div className="h-10 w-24 bg-gray-200 rounded-md animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}