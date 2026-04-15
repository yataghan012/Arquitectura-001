export default function GrainOverlay() {
  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      <div 
        className="absolute inset-[-200%] w-[400%] h-[400%] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"
        style={{
          animation: 'noise 0.5s infinite steps(4)',
          willChange: 'transform'
        }}
      />
      <style>{`
        @keyframes noise {
          0% { transform: translate(0,0) }
          25% { transform: translate(-2%,-2%) }
          50% { transform: translate(-4%,2%) }
          75% { transform: translate(2%,-4%) }
          100% { transform: translate(0,0) }
        }
      `}</style>
    </div>
  );
}
