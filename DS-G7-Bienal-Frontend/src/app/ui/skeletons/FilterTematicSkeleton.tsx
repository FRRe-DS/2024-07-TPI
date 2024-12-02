export default function FilterTematicSkeleton() {
    return (
      <div className="flex flex-wrap gap-2 p-4">
        {/* Simulate 4 filter buttons */}
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-8 w-32 bg-gray-200 rounded-full animate-pulse"
            aria-hidden="true"
          />
        ))}
      </div>
    )
  }