import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center relative overflow-hidden">
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
      
      <div className="text-center space-y-6 px-4 relative z-10">
        <div className="glass-card p-12 rounded-3xl max-w-md mx-auto">
          <h1 className="mb-4 text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            404
          </h1>
          <p className="mb-8 text-xl text-foreground/70">
            Oops! Page not found
          </p>
          <Button 
            asChild
            size="lg"
            className="gap-2"
          >
            <a href="/">
              <Home className="h-4 w-4" />
              Return to Home
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
