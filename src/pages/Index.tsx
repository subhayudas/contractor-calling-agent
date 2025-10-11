import { LeadForm } from "@/components/LeadForm";
import Navbar from "@/components/Navbar";
import { Zap, CheckCircle, Clock, Shield } from "lucide-react";
import { GradientBars } from "@/components/GradientBars";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[rgb(10,10,10)]">
      <Navbar />
      {/* Animated Gradient Bars Background */}
      <GradientBars
        numBars={15}
        gradientFrom="rgb(255, 60, 0)"
        gradientTo="transparent"
        animationDuration={2}
      />
      
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none z-[1]"></div>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none z-[1]"></div>
        
      <div className="container mx-auto px-4 pt-28 md:pt-32 pb-16 md:pb-24 relative z-10">
        <div className="text-center mb-16 space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-primary/30 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-light tracking-wide text-primary">Licensed & Insured Electrical Services</span>
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