export function SegmentedProgress({ total = 5, value = 4, activeColor = 'var(--chart-1)' }) {
  return (
    <div className="flex gap-2 w-full">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`h-2 flex-1 rounded-sm transition-colors ${
            index >= value ? 'bg-stone-200' : ''
          }`}
          style={{
            backgroundColor: index < value ? activeColor : undefined,
          }}
        />
      ))}
    </div>
  );
}
