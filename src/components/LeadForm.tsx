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
import { Phone, Mail, User, Zap, Home, Clock, MapPin } from "lucide-react";

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
            ? "Success! Our electrician will call you shortly." 
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
    <Card className="w-full max-w-2xl">
      <CardHeader className="text-center pb-8">
        <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Request Service Today
        </CardTitle>
        <CardDescription className="text-base mt-3 text-foreground/60">
          Tell us about your electrical needs and we'll get back to you right away
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

          <div className="space-y-2">
            <Label htmlFor="serviceType" className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              Service Type
            </Label>
            <Select
              value={formData.serviceType}
              onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
            >
              <SelectTrigger id="serviceType">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="residential_wiring">Residential Wiring</SelectItem>
                <SelectItem value="commercial_wiring">Commercial Wiring</SelectItem>
                <SelectItem value="panel_upgrade">Panel Upgrade</SelectItem>
                <SelectItem value="lighting_installation">Lighting Installation</SelectItem>
                <SelectItem value="electrical_repair">Electrical Repair</SelectItem>
                <SelectItem value="emergency_service">Emergency Service</SelectItem>
                <SelectItem value="ev_charger_installation">EV Charger Installation</SelectItem>
                <SelectItem value="generator_installation">Generator Installation</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="urgency" className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              How Soon Do You Need Service?
            </Label>
            <RadioGroup
              value={formData.urgency}
              onValueChange={(value) => setFormData({ ...formData, urgency: value })}
              className="grid grid-cols-2 gap-3"
            >
              <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:border-primary transition-colors">
                <RadioGroupItem value="routine" id="routine" />
                <Label htmlFor="routine" className="cursor-pointer font-normal">Routine</Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:border-primary transition-colors">
                <RadioGroupItem value="soon" id="soon" />
                <Label htmlFor="soon" className="cursor-pointer font-normal">Within a Week</Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:border-primary transition-colors">
                <RadioGroupItem value="urgent" id="urgent" />
                <Label htmlFor="urgent" className="cursor-pointer font-normal">Urgent (1-2 Days)</Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:border-primary transition-colors">
                <RadioGroupItem value="emergency" id="emergency" />
                <Label htmlFor="emergency" className="cursor-pointer font-normal">Emergency (Now)</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="propertyType" className="flex items-center gap-2">
              <Home className="h-4 w-4 text-primary" />
              Property Type
            </Label>
            <RadioGroup
              value={formData.propertyType}
              onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="residential" id="residential" />
                <Label htmlFor="residential" className="cursor-pointer font-normal">Residential</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="commercial" id="commercial" />
                <Label htmlFor="commercial" className="cursor-pointer font-normal">Commercial</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="industrial" id="industrial" />
                <Label htmlFor="industrial" className="cursor-pointer font-normal">Industrial</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Service Address (Optional)
            </Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="123 Main St, City, State"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectDescription">
              Project Description (Optional)
            </Label>
            <Textarea
              id="projectDescription"
              value={formData.projectDescription}
              onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
              placeholder="Tell us about your electrical needs..."
              rows={4}
            />
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
                Yes, I want to receive a call from an electrician
              </Label>
              <p className="text-sm text-foreground/60">
                Our AI assistant will call you shortly to discuss your electrical needs
              </p>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            size="lg"
            className="w-full text-base font-semibold"
          >
            {loading ? "Submitting..." : "Request Service Now"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};