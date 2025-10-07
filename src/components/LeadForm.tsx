import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Phone, Mail, User, Languages } from "lucide-react";

export const LeadForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    intent: "buy",
    language: "english",
    optInCall: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('submit-lead', {
        body: formData
      });

      if (error) throw error;

      toast.success(
        formData.optInCall 
          ? "Success! You'll receive a call in 30 seconds." 
          : "Thank you! We'll be in touch soon."
      );

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        intent: "buy",
        language: "english",
        optInCall: false,
      });
    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast.error("Failed to submit form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl border-none shadow-[var(--shadow-card)]">
      <CardHeader className="text-center pb-8">
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Get Started Today
        </CardTitle>
        <CardDescription className="text-base mt-2">
          Fill out the form below and our AI assistant will contact you
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                First Name
              </Label>
              <Input
                id="firstName"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder="John"
                className="border-border focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Last Name
              </Label>
              <Input
                id="lastName"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="Doe"
                className="border-border focus:ring-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              Phone Number
            </Label>
            <Input
              id="phoneNumber"
              type="tel"
              required
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              placeholder="+1 (555) 123-4567"
              className="border-border focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@example.com"
              className="border-border focus:ring-primary"
            />
          </div>

          <div className="space-y-3">
            <Label>I want to:</Label>
            <RadioGroup
              value={formData.intent}
              onValueChange={(value) => setFormData({ ...formData, intent: value })}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="buy" id="buy" />
                <Label htmlFor="buy" className="cursor-pointer font-normal">Buy</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sell" id="sell" />
                <Label htmlFor="sell" className="cursor-pointer font-normal">Sell</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Languages className="h-4 w-4 text-primary" />
              Preferred Language
            </Label>
            <RadioGroup
              value={formData.language}
              onValueChange={(value) => setFormData({ ...formData, language: value })}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="english" id="english" />
                <Label htmlFor="english" className="cursor-pointer font-normal">English</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="french" id="french" />
                <Label htmlFor="french" className="cursor-pointer font-normal">French</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex items-start space-x-2 p-4 rounded-lg bg-secondary/30 border border-secondary">
            <Checkbox
              id="optInCall"
              checked={formData.optInCall}
              onCheckedChange={(checked) => 
                setFormData({ ...formData, optInCall: checked as boolean })
              }
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="optInCall"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Yes, I want to receive an AI voice call
              </Label>
              <p className="text-sm text-muted-foreground">
                Our personalized AI assistant will call you in 30 seconds to discuss your needs
              </p>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity shadow-[var(--shadow-glow)]"
          >
            {loading ? "Submitting..." : "Submit & Get Started"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};