import React from 'react'

export default function NavbarSkeleton() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex items-center">
                <div className="h-8 w-24 bg-gray-200 rounded-md animate-pulse"></div>
            </div>
            <div className="flex space-x-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-4 w-20 bg-gray-200 rounded-md self-center animate-pulse"></div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="h-8 w-24 bg-gray-200 rounded-md animate-pulse"></div>
          </div>
          
          
        </div>
      </div>

      
    </nav>
  )
}