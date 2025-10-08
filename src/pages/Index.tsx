import { LeadForm } from "@/components/LeadForm";
import Navbar from "@/components/Navbar";
import { Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navbar />
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ pointerEvents: 'none' }}
        onContextMenu={(e) => e.preventDefault()}
      >
        <source src="/background_video.mp4" type="video/mp4" />
      </video>
      
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none"></div>
        
      <div className="container mx-auto px-4 pt-28 md:pt-32 pb-16 md:pb-24 relative z-10">
        <div className="text-center mb-16 space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-primary/30 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Choose us as your real estate agent</span>
          </div>
          
          
          
        </div>

        {/* Form Section */}
        <div className="flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
          <LeadForm />
        </div>
      </div>
    </div>
  );
};

export default Index;