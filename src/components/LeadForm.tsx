import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Phone, Mail, User, Activity, Building2, Clock, MapPin, Stethoscope } from "lucide-react";

export const LeadForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    serviceType: "electrical_repair",
    urgency: "routine",
    propertyType: "residential",
    address: "",
    projectDescription: "",
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
            ? "Success! Our healthcare assistant will call you shortly." 
            : "Thank you! We've received your request and will be in touch soon.",
          { duration: 5000 }
        );

        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          phoneNumber: "",
          email: "",
          serviceType: "electrical_repair",
          urgency: "routine",
          propertyType: "residential",
          address: "",
          projectDescription: "",
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
    <Card className="w-full max-w-2xl transform transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl hover:shadow-primary/10 bg-white/95 backdrop-blur-xl border-primary/20">
      <CardHeader className="text-center pb-8">
        <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-in fade-in slide-in-from-top-4 duration-700">
          Request Healthcare Support
        </CardTitle>
        <CardDescription className="text-base mt-3 font-normal text-foreground/70 animate-in fade-in slide-in-from-top-4 duration-700 delay-150">
          Share your health concerns and our AI assistant will connect you with personalized care
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <div className="space-y-2 group">
              <Label htmlFor="firstName" className="flex items-center gap-2 transition-colors duration-300 group-focus-within:text-primary font-medium">
                <User className="h-4 w-4 text-primary transition-transform duration-300 group-hover:scale-110 group-focus-within:rotate-12" />
                First Name
              </Label>
              <Input
                id="firstName"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder="John"
                className="transition-all duration-300 focus:scale-[1.01] focus:shadow-lg focus:shadow-primary/20 border-primary/20"
              />
            </div>
            <div className="space-y-2 group">
              <Label htmlFor="lastName" className="flex items-center gap-2 transition-colors duration-300 group-focus-within:text-primary font-medium">
                <User className="h-4 w-4 text-primary transition-transform duration-300 group-hover:scale-110 group-focus-within:rotate-12" />
                Last Name
              </Label>
              <Input
                id="lastName"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="Doe"
                className="transition-all duration-300 focus:scale-[1.01] focus:shadow-lg focus:shadow-primary/20 border-primary/20"
              />
            </div>
          </div>

          <div className="space-y-2 group animate-in fade-in slide-in-from-bottom-4 duration-700 delay-[400ms]">
            <Label htmlFor="phoneNumber" className="flex items-center gap-2 transition-colors duration-300 group-focus-within:text-primary font-medium">
              <Phone className="h-4 w-4 text-primary transition-transform duration-300 group-hover:scale-110 group-focus-within:rotate-12" />
              Phone Number
            </Label>
            <Input
              id="phoneNumber"
              type="tel"
              required
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              placeholder="1 (555) 123-4567"
              className="transition-all duration-300 focus:scale-[1.01] focus:shadow-lg focus:shadow-primary/20 border-primary/20"
            />
          </div>

          <div className="space-y-2 group animate-in fade-in slide-in-from-bottom-4 duration-700 delay-[500ms]">
            <Label htmlFor="email" className="flex items-center gap-2 transition-colors duration-300 group-focus-within:text-primary font-medium">
              <Mail className="h-4 w-4 text-primary transition-transform duration-300 group-hover:scale-110 group-focus-within:rotate-12" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@example.com"
              className="transition-all duration-300 focus:scale-[1.01] focus:shadow-lg focus:shadow-primary/20 border-primary/20"
            />
          </div>

          <div className="space-y-2 group animate-in fade-in slide-in-from-bottom-4 duration-700 delay-[600ms]">
            <Label htmlFor="serviceType" className="flex items-center gap-2 transition-colors duration-300 group-focus-within:text-primary font-medium">
              <Stethoscope className="h-4 w-4 text-primary transition-transform duration-300 group-hover:scale-110 group-focus-within:rotate-12" />
              Type of Support Needed
            </Label>
            <Select
              value={formData.serviceType}
              onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
            >
              <SelectTrigger id="serviceType" className="transition-all duration-300 hover:scale-[1.01] hover:shadow-md hover:shadow-primary/10 border-primary/20">
                <SelectValue placeholder="Select support type" />
              </SelectTrigger>
              <SelectContent className="animate-in fade-in slide-in-from-top-2 duration-200">
                <SelectItem value="residential_wiring" className="cursor-pointer transition-all duration-200 hover:translate-x-1">General Health Inquiry</SelectItem>
                <SelectItem value="commercial_wiring" className="cursor-pointer transition-all duration-200 hover:translate-x-1">Medication Information</SelectItem>
                <SelectItem value="panel_upgrade" className="cursor-pointer transition-all duration-200 hover:translate-x-1">Appointment Scheduling</SelectItem>
                <SelectItem value="lighting_installation" className="cursor-pointer transition-all duration-200 hover:translate-x-1">Symptom Assessment</SelectItem>
                <SelectItem value="electrical_repair" className="cursor-pointer transition-all duration-200 hover:translate-x-1">Follow-up Care</SelectItem>
                <SelectItem value="emergency_service" className="cursor-pointer transition-all duration-200 hover:translate-x-1">Mental Health Support</SelectItem>
                <SelectItem value="ev_charger_installation" className="cursor-pointer transition-all duration-200 hover:translate-x-1">Wellness Consultation</SelectItem>
                <SelectItem value="generator_installation" className="cursor-pointer transition-all duration-200 hover:translate-x-1">Second Opinion</SelectItem>
                <SelectItem value="other" className="cursor-pointer transition-all duration-200 hover:translate-x-1">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-[700ms]">
            <Label htmlFor="urgency" className="flex items-center gap-2 transition-colors duration-300 font-medium">
              <Clock className="h-4 w-4 text-primary" />
              When Do You Need Support?
            </Label>
            <RadioGroup
              value={formData.urgency}
              onValueChange={(value) => setFormData({ ...formData, urgency: value })}
              className="grid grid-cols-2 gap-3"
            >
              <div className="flex items-center space-x-2 p-3 rounded-lg border border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:shadow-primary/10 cursor-pointer">
                <RadioGroupItem value="routine" id="routine" />
                <Label htmlFor="routine" className="cursor-pointer font-normal">Non-Urgent</Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg border border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:shadow-primary/10 cursor-pointer">
                <RadioGroupItem value="soon" id="soon" />
                <Label htmlFor="soon" className="cursor-pointer font-normal">Within a Week</Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg border border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:shadow-primary/10 cursor-pointer">
                <RadioGroupItem value="urgent" id="urgent" />
                <Label htmlFor="urgent" className="cursor-pointer font-normal">Urgent (1-2 Days)</Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg border border-destructive/30 hover:border-destructive hover:bg-destructive/5 transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:shadow-destructive/10 cursor-pointer">
                <RadioGroupItem value="emergency" id="emergency" />
                <Label htmlFor="emergency" className="cursor-pointer font-normal text-destructive">Emergency (Now)</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-[800ms]">
            <Label htmlFor="propertyType" className="flex items-center gap-2 transition-colors duration-300 font-medium">
              <Building2 className="h-4 w-4 text-primary transition-transform duration-300 hover:scale-110" />
              Care Setting
            </Label>
            <RadioGroup
              value={formData.propertyType}
              onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2 group">
                <RadioGroupItem value="residential" id="residential" className="transition-transform duration-200 group-hover:scale-110" />
                <Label htmlFor="residential" className="cursor-pointer font-normal transition-colors duration-200 group-hover:text-primary">Individual</Label>
              </div>
              <div className="flex items-center space-x-2 group">
                <RadioGroupItem value="commercial" id="commercial" className="transition-transform duration-200 group-hover:scale-110" />
                <Label htmlFor="commercial" className="cursor-pointer font-normal transition-colors duration-200 group-hover:text-primary">Family Member</Label>
              </div>
              <div className="flex items-center space-x-2 group">
                <RadioGroupItem value="industrial" id="industrial" className="transition-transform duration-200 group-hover:scale-110" />
                <Label htmlFor="industrial" className="cursor-pointer font-normal transition-colors duration-200 group-hover:text-primary">Group/Facility</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2 group animate-in fade-in slide-in-from-bottom-4 duration-700 delay-[900ms]">
            <Label htmlFor="address" className="flex items-center gap-2 transition-colors duration-300 group-focus-within:text-primary font-medium">
              <MapPin className="h-4 w-4 text-primary transition-transform duration-300 group-hover:scale-110 group-focus-within:rotate-12" />
              Location (Optional)
            </Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="City, State or Zip Code"
              className="transition-all duration-300 focus:scale-[1.01] focus:shadow-lg focus:shadow-primary/20 border-primary/20"
            />
          </div>

          <div className="space-y-2 group animate-in fade-in slide-in-from-bottom-4 duration-700 delay-[1000ms]">
            <Label htmlFor="projectDescription" className="transition-colors duration-300 group-focus-within:text-primary font-medium">
              Health Concerns or Questions (Optional)
            </Label>
            <Textarea
              id="projectDescription"
              value={formData.projectDescription}
              onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
              placeholder="Share any symptoms, concerns, or questions you have..."
              rows={4}
              className="transition-all duration-300 focus:scale-[1.01] focus:shadow-lg focus:shadow-primary/20 resize-none border-primary/20"
            />
          </div>

          <div className="flex items-start space-x-3 p-5 rounded-xl bg-primary/5 border border-primary/30 transition-all duration-300 hover:border-primary/50 hover:scale-[1.01] hover:shadow-lg hover:shadow-primary/10 cursor-pointer animate-in fade-in slide-in-from-bottom-4 duration-700 delay-[1100ms]">
            <Checkbox
              id="optInCall"
              checked={formData.optInCall}
              onCheckedChange={(checked) => 
                setFormData({ ...formData, optInCall: checked as boolean })
              }
              className="transition-transform duration-200 hover:scale-110 border-primary"
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="optInCall"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer transition-colors duration-300 hover:text-primary"
              >
                Yes, I want to receive a call from a healthcare assistant
              </Label>
              <p className="text-sm font-normal text-foreground/70">
                Our AI-powered assistant will call you to discuss your health concerns and provide personalized guidance
              </p>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            size="lg"
            className="w-full text-base font-semibold tracking-wide relative overflow-hidden group animate-in fade-in slide-in-from-bottom-4 duration-700 delay-[1200ms] shadow-lg shadow-primary/30"
          >
            <span className="relative z-10 flex items-center justify-center gap-2 transition-transform duration-300 group-hover:scale-105">
              {loading ? (
                <>
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"></span>
                  Submitting...
                </>
              ) : (
                <>
                  Get Healthcare Support
                  <Activity className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </span>
            <span className="absolute inset-0 -z-10 bg-gradient-to-r from-accent to-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};