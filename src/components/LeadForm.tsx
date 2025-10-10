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
      // Normalize phone number - ensure it starts with +
      const normalizedPhoneNumber = formData.phoneNumber.trim().startsWith('+') 
        ? formData.phoneNumber.trim()
        : '+' + formData.phoneNumber.trim();

      const submissionData = {
        ...formData,
        phoneNumber: normalizedPhoneNumber
      };

      console.log('Submitting lead form with data:', submissionData);
      
      const { data, error } = await supabase.functions.invoke('submit-lead', {
        body: submissionData
      });

      console.log('Response from submit-lead:', { data, error });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      // Check if the response indicates success
      if (data && data.success) {
        console.log('Lead submitted successfully:', data.leadId);
        
        toast.success(
          formData.optInCall 
            ? "Success! You'll receive a call shortly from our assistant." 
            : "Thank you! We've received your information and will be in touch soon.",
          { duration: 5000 }
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
      } else {
        throw new Error(data?.error || 'Unknown error occurred');
      }
    } catch (error: any) {
      console.error('Error submitting form:', error);
      
      // Provide more specific error messages
      let errorMessage = "Failed to submit form. Please try again.";
      
      if (error.message?.includes('fetch')) {
        errorMessage = "Network error. Please check your internet connection and try again.";
      } else if (error.message?.includes('not found') || error.message?.includes('404')) {
        errorMessage = "Service not available. Please ensure the Supabase functions are deployed.";
      } else if (error.message) {
        errorMessage = `Error: ${error.message}`;
      }
      
      toast.error(errorMessage, { duration: 7000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="text-center pb-8">
        <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Get Started Today
        </CardTitle>
        <CardDescription className="text-base mt-3 text-foreground/60">
          Fill out the form below and our assistant will contact you
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
              placeholder="1 (555) 123-4567"
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

          <div className="flex items-start space-x-3 p-5 rounded-xl glass border border-primary/20">
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
                Yes, I want to receive a voice call
              </Label>
              <p className="text-sm text-foreground/60">
                Our assistant will call you in 30 seconds to discuss your needs
              </p>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            size="lg"
            className="w-full text-base font-semibold"
          >
            {loading ? "Submitting..." : "Submit & Get Started"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};