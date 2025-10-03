import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Receipt, TrendingUp, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
interface LandingPageProps {
  onLogin: () => void;
}


export const LandingPage = ({ onLogin }: LandingPageProps) => {
  const navigate=useNavigate();
  const handleLogin = ()=>
  {
      navigate("/login");
  }
  const handlesignup = ()=>
  {
      navigate("/signup");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Receipt className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Vandre'25</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold gradient-hero bg-clip-text text-transparent">
                Vandre'25
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                Modern billing made simple. Create invoices, track sales, and manage your business with ease.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="hero" size="lg" onClick={handleLogin} className="w-full sm:w-auto">
                Login
              </Button>
              <Button variant="outline" size="lg" onClick={handlesignup}  className="w-full sm:w-auto">
                Sign Up
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-16 pt-16">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                  <Receipt className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Easy Billing</h3>
                <p className="text-muted-foreground text-sm">
                  Create professional bills in seconds with our intuitive interface
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Track Sales</h3>
                <p className="text-muted-foreground text-sm">
                  Monitor your business performance with detailed insights
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Secure & Reliable</h3>
                <p className="text-muted-foreground text-sm">
                  Your data is protected with enterprise-grade security
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
