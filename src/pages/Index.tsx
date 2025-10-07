import { LeadForm } from "@/components/LeadForm";
import { Phone, Sparkles, Clock } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-hero)] opacity-10"></div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center mb-12 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Lead Generation</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
              Connect with Our
              <br />
              AI Voice Assistant
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience personalized, human-like conversations powered by advanced AI technology. Get instant support in your preferred language.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
            <div className="p-6 rounded-xl bg-card border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] transition-all duration-300">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Instant Connection</h3>
              <p className="text-sm text-muted-foreground">
                Get a call from our AI assistant within 30 seconds of submitting your information
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] transition-all duration-300">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Human-Like AI</h3>
              <p className="text-sm text-muted-foreground">
                Natural conversations that understand your needs and respond intelligently
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] transition-all duration-300">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">24/7 Availability</h3>
              <p className="text-sm text-muted-foreground">
                Multilingual support available anytime, in English or French
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="flex justify-center">
            <LeadForm />
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Powered by advanced AI technology
            </p>
            <div className="flex items-center justify-center gap-8 flex-wrap opacity-60">
              <div className="text-xs font-semibold tracking-wider">VAPI AI</div>
              <div className="h-4 w-px bg-border"></div>
              <div className="text-xs font-semibold tracking-wider">REAL-TIME PROCESSING</div>
              <div className="h-4 w-px bg-border"></div>
              <div className="text-xs font-semibold tracking-wider">SECURE & PRIVATE</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;