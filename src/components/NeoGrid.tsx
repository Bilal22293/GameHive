// Neo grid component
export const NeoGrid = ({ className = "" }) => {
  return (
    <div className={`absolute inset-0 neo-grid opacity-20 pointer-events-none ${className}`}>
      <div className="h-full w-full bg-grid-pattern"></div>
    </div>
  );
};