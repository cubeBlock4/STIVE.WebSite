import { Flex } from "@radix-ui/themes";
import { Link } from "react-router";

export function Welcome() {
  return (
    <div className="relative min-h-[calc(100vh-100px)] w-full flex flex-col items-center justify-center overflow-hidden animate-fade-in pb-20">
      {/* Background glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--red-9)] rounded-full mix-blend-screen filter blur-[128px] opacity-30 animate-pulse-glow" style={{ zIndex: -1 }}></div>
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-[#117f90] rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-float" style={{ animationDelay: "2s", zIndex: -1 }}></div>

      <Flex direction="column" align="center" justify="center" gap="6" className="relative z-10 px-6 text-center max-w-4xl mx-auto">
        
        {/* Badge */}
        <div className="glass-panel px-5 py-2 rounded-full mb-4 animate-slide-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
           <span className="text-[var(--red-5)] text-sm font-semibold tracking-wider uppercase flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-[var(--red-9)] animate-pulse shadow-[0_0_10px_var(--red-9)]"></span>
             La nouvelle expérience d'achat
           </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-tight animate-slide-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
          Simplifiez votre <br />
          <span className="text-gradient">gestion des stocks</span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-lg md:text-xl text-[var(--gray-8)] max-w-2xl mt-4 animate-slide-up" style={{ animationDelay: "0.3s", opacity: 0 }}>
          STIVE révolutionne la gestion de votre inventaire avec une interface premium, des animations fluides et une expérience utilisateur sans compromis.
        </p>

        {/* CTA Buttons */}
        <Flex gap="4" mt="6" className="animate-slide-up flex-col sm:flex-row w-full sm:w-auto" style={{ animationDelay: "0.4s", opacity: 0 }}>
          <Link to="/products" className="w-full sm:w-auto">
            <button className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-[var(--red-9)] to-[var(--red-11)] text-white font-bold text-lg shadow-lg shadow-[var(--red-a6)] hover:shadow-[var(--red-a8)] transition-all hover:-translate-y-1 active:scale-95 cursor-pointer border border-[var(--red-6)]/30">
              Découvrir les produits
            </button>
          </Link>
          <Link to="/login" className="w-full sm:w-auto">
            <button className="w-full px-8 py-4 rounded-xl glass-panel text-white font-semibold text-lg hover:bg-white/10 transition-all hover:-translate-y-1 active:scale-95 cursor-pointer">
              Espace Client
            </button>
          </Link>
        </Flex>
      </Flex>
      
      {/* Floating UI Elements for decoration */}
      <div className="absolute left-[8%] top-[25%] hidden xl:block animate-float pointer-events-none" style={{ animationDelay: "1s" }}>
         <div className="glass-card p-4 rounded-2xl flex items-center gap-4 w-56 shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-[var(--red-a4)] flex items-center justify-center border border-[var(--red-6)]/20">
               <span className="block w-5 h-5 rounded-md bg-gradient-to-br from-[var(--red-7)] to-[var(--red-9)] shadow-[0_0_15px_var(--red-a8)]"></span>
            </div>
            <div>
               <div className="h-2.5 w-24 bg-white/30 rounded-full mb-2.5"></div>
               <div className="h-2 w-16 bg-white/10 rounded-full"></div>
            </div>
         </div>
      </div>

      <div className="absolute right-[8%] bottom-[25%] hidden xl:block animate-float pointer-events-none" style={{ animationDelay: "2.5s" }}>
         <div className="glass-card p-5 rounded-2xl flex flex-col gap-4 w-64 shadow-2xl">
            <div className="flex justify-between items-center">
              <div className="h-3 w-28 bg-white/30 rounded-full"></div>
              <div className="h-3 w-10 bg-[var(--red-5)]/80 rounded-full"></div>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
               <div className="h-full w-[70%] bg-gradient-to-r from-[var(--red-8)] to-[var(--red-10)] shadow-[0_0_10px_var(--red-10)]"></div>
            </div>
            <div className="flex justify-between mt-1">
               <div className="h-2 w-10 bg-white/20 rounded-full"></div>
               <div className="h-2 w-16 bg-white/20 rounded-full"></div>
            </div>
         </div>
      </div>
    </div>
  );
}
