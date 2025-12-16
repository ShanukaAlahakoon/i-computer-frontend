import { Link } from "react-router-dom";
import { FaArrowRight, FaMicrochip, FaPhoneAlt } from "react-icons/fa";

export default function Home() {
  return (
    <div className="w-full h-[calc(100vh-100px)] relative flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/home.jpg"
          alt="i-Computers Gaming Background"
          className="w-full h-full object-cover object-center animate-[zoomIn_20s_infinite_alternate]"
        />
      </div>

      <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/50 to-black/80 z-10"></div>

      <div className="relative z-20 max-w-6xl px-6 w-full flex flex-col items-center text-center">
        <div className="mb-4 animate-fade-in-down">
          <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 tracking-wider uppercase drop-shadow-md">
            Welcome to i-Computers
          </h2>
        </div>

        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-900/20 backdrop-blur-md text-cyan-300 text-xs md:text-sm font-semibold tracking-widest uppercase animate-fade-in-down delay-100">
          <FaMicrochip /> The Ultimate Tech Hub
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tight leading-tight mb-4 drop-shadow-2xl animate-fade-in-up">
          LEVEL UP <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 filter drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
            YOUR REALITY
          </span>
        </h1>

        <p className="text-gray-300 text-sm md:text-xl max-w-4xl mb-8 font-light leading-relaxed animate-fade-in-up delay-200">
          Discover the best custom PC builds, laptops, and gaming accessories at{" "}
          <span className="text-cyan-400 font-semibold whitespace-nowrap">
            i-Computers
          </span>
          .
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in-up delay-300">
          <Link
            to="/products"
            className="group relative px-8 py-3 bg-cyan-600 text-white font-bold rounded-full overflow-hidden shadow-[0_0_20px_rgba(8,145,178,0.5)] transition-all hover:scale-105"
          >
            <span className="absolute inset-0 w-full h-full bg-linear-to-r from-cyan-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative flex items-center justify-center gap-2">
              Start Shopping <FaArrowRight />
            </span>
          </Link>

          <Link
            to="/contact"
            className="px-8 py-3 bg-white/5 backdrop-blur-md border border-white/20 text-white font-bold rounded-full hover:bg-white/10 hover:border-cyan-400/50 transition-all flex items-center justify-center gap-2"
          >
            <FaPhoneAlt /> Contact Us
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes zoomIn {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .delay-100 { animation-delay: 0.2s; }
        .delay-200 { animation-delay: 0.4s; }
        .delay-300 { animation-delay: 0.6s; }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
