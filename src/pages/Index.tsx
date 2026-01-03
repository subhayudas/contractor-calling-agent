import { LeadForm } from "@/components/LeadForm";
import Navbar from "@/components/Navbar";
import { Heart, Shield, Clock, Award, Sparkles, Users } from "lucide-react";
import { GradientBars } from "@/components/GradientBars";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-teal-50/30 to-cyan-50">
      <Navbar />
      {/* Animated Gradient Bars Background - Healthcare colors */}
      <GradientBars
        numBars={12}
        gradientFrom="rgba(23, 127, 173, 0.12)"
        gradientTo="transparent"
        animationDuration={3}
      />
      
      {/* Subtle medical cross pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-[1]" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25 0h10v25h25v10H35v25H25V35H0V25h25V0z' fill='%23177fad' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      ></div>
      
      {/* Soft gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-primary/5 pointer-events-none z-[1]"></div>
        
      <div className="container mx-auto px-4 pt-28 md:pt-32 pb-16 md:pb-24 relative z-10">
        <div className="text-center mb-12 space-y-6 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-primary/20 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 shadow-lg">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium tracking-wide text-primary">AI-Powered Healthcare Support</span>
          </div>
          
          {/* Hero Headline */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-in fade-in slide-in-from-top-4 duration-700 delay-100">
            Your Health, Our Priority
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/70 font-light max-w-2xl mx-auto animate-in fade-in slide-in-from-top-4 duration-700 delay-200">
            Experience compassionate, AI-assisted healthcare that's available 24/7. Get personalized support and guidance when you need it most.
          </p>
          
          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/60 border border-primary/10 backdrop-blur-sm">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-sm font-medium text-foreground/80">HIPAA Compliant</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/60 border border-accent/10 backdrop-blur-sm">
              <Clock className="h-8 w-8 text-accent" />
              <span className="text-sm font-medium text-foreground/80">24/7 Available</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/60 border border-primary/10 backdrop-blur-sm">
              <Heart className="h-8 w-8 text-primary" />
              <span className="text-sm font-medium text-foreground/80">Compassionate Care</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/60 border border-accent/10 backdrop-blur-sm">
              <Award className="h-8 w-8 text-accent" />
              <span className="text-sm font-medium text-foreground/80">Expert-Backed</span>
            </div>
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