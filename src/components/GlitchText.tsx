export const GlitchText = ({ text, className = "" }) => {
    return (
      <div className={`relative ${className}`}>
        <span className="inline-block relative z-10">{text}</span>
        <span className="absolute top-0 left-0 z-0 opacity-70 text-neon-blue blur-[1px] animate-glitch1">{text}</span>
        <span className="absolute top-0 left-0 z-0 opacity-70 text-neon-red blur-[2px] animate-glitch2">{text}</span>
      </div>
    );
  };