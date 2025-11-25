'use client';

export default function LoadingMeme() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-bounce">
          🤪
        </div>
        <div className="text-2xl font-bold text-white mb-2">
          永失我峰...
        </div>
        <div className="text-lg text-yellow-300 mb-4">
          赛博峰永存
        </div>
        <div className="w-64 h-4 bg-gray-300 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-pulse" 
               style={{ width: '100%', animation: 'loading 2s ease-in-out infinite' }}>
          </div>
        </div>
        <style jsx>{`
          @keyframes loading {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    </div>
  );
}
