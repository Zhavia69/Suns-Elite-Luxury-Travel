import React, { useState } from "react";
import { motion } from "framer-motion";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const HeroSection = () => {
  const [quoteData, setQuoteData] = useState({
    pickup: "",
    destination: "",
    serviceType: "",
    date: "",
    time: "",
    passengers: "1",
  });

  const [loading, setLoading] = useState(false);
  const [showWhatsAppConfirm, setShowWhatsAppConfirm] = useState(false);
  const [whatsAppUrl, setWhatsAppUrl] = useState("");

  const serviceOptions = [
    { value: "airport-transfer", label: "Airport Transfer" },
    { value: "executive-ride", label: "Executive Ride" },
    { value: "hourly-chauffeur", label: "Hourly Chauffeur" },
    { value: "safari-gateway", label: "Safari Gateway" },
    { value: "corporate-transport", label: "Corporate Transport" },
  ];

  const passengerOptions = [
    { value: "1", label: "1 Passenger" },
    { value: "2", label: "2 Passengers" },
    { value: "3", label: "3 Passengers" },
    { value: "4", label: "4 Passengers" },
    { value: "5+", label: "5+ Passengers"},
  ];

  const handleInputChange = (field, value) => {
    setQuoteData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ✅ WhatsApp flow with confirmation
  const handleGetQuote = () => {
    setLoading(true);

    const { pickup, destination, serviceType, date, time, passengers } =
      quoteData;

    const message = `🚖 New Transport Request
--------------------------
📍 Pickup Location: ${pickup || "-"}
🏁 Destination: ${destination || "-"}
🚘 Service Type: ${serviceType || "-"}
📅 Date: ${date || "-"}
⏰ Time: ${time || "-"}
👥 Passengers: ${passengers || "-"}

Please confirm availability.`;

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "254743248996";
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    setWhatsAppUrl(url);
    setShowWhatsAppConfirm(true);
    setLoading(false);
  };

  const proceedToWhatsApp = () => {
    window.open(whatsAppUrl, "_blank");

    // reset form
    setQuoteData({
      pickup: "",
      destination: "",
      serviceType: "",
      date: "",
      time: "",
      passengers: "1",
    });
    setShowWhatsAppConfirm(false);
  };

  // ✅ Call button: open dialer on mobile, alert on desktop
  const handleCall = () => {
    const phoneNumber = "+254743248996";
    if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
      window.location.href = `tel:${phoneNumber}`;
    } else {
      alert("📞 Please call us directly at " + phoneNumber);
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today?.toISOString()?.split("T")?.[0];
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-32 md:pb-40">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury vehicle against Nairobi cityscape at dusk"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground mb-6 leading-tight">
              Luxury Travel
              <span className="block text-primary">Redefined</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Experience premium transportation services across Kenya with our
              fleet of luxury vehicles and professional chauffeurs.
            </p>
          </motion.div>

          {/* Quick Quote Widget */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-card/95 backdrop-blur-sm border border-border rounded-2xl shadow-luxury p-6 md:p-8 max-w-4xl mx-auto"
          >
            <div className="flex items-center space-x-2 mb-6">
              <Icon name="MapPin" size={24} className="text-primary" />
              <h2 className="font-heading text-xl md:text-2xl font-semibold text-foreground">
                Get Instant Quote
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
             <Input
  label="Pickup Location"
  type="text"
  placeholder="Enter pickup address"
  value={quoteData?.pickup}
  onChange={(e) => handleInputChange("pickup", e?.target?.value)}
  className="w-full text-white bg-black/30 placeholder-gray-300"
  icon={<Icon name="MapPin" size={20} className="text-yellow-400" />}
/>

<Input
  label="Destination"
  type="text"
  placeholder="Enter destination"
  value={quoteData?.destination}
  onChange={(e) => handleInputChange("destination", e?.target?.value)}
  className="w-full text-white bg-black/30 placeholder-gray-300"
  icon={<Icon name="Flag" size={20} className="text-yellow-400" />}
/>

              <Select
                label="Service Type"
                placeholder="Select service"
                options={serviceOptions}
                value={quoteData?.serviceType}
                onChange={(value) => handleInputChange("serviceType", value)}
              />
              <Input
  label="Date"
  type="date"
  value={quoteData?.date}
  onChange={(e) => handleInputChange("date", e?.target?.value)}
  min={getCurrentDate()}
  className="w-full text-white bg-black/30 placeholder-gray-300"
  icon={<Icon name="Calendar" size={20} className="text-yellow-400" />}
/>

<Input
  label="Time"
  type="time"
  value={quoteData?.time}
  onChange={(e) => handleInputChange("time", e?.target?.value)}
  className="w-full text-white bg-black/30 placeholder-gray-300"
  icon={<Icon name="Clock" size={20} className="text-yellow-400" />}
/>

              <Select
                label="Passengers"
                options={passengerOptions}
                value={quoteData?.passengers}
                onChange={(value) => handleInputChange("passengers", value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="default"
                size="lg"
                onClick={handleGetQuote}
                iconName="Calculator"
                iconPosition="left"
                className="flex-1"
                disabled={loading}
              >
                {loading ? "Sending..." : "Get Instant Quote"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleCall}
                iconName="Phone"
                iconPosition="left"
                className="sm:w-auto"
              >
                Call +254 743 248 996
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-4 text-center">
              Instant quotes • Secure booking • 24/7 support • Premium service
              guaranteed
            </p>
          </motion.div>
        </div>
      </div>

      {/* ✅ WhatsApp Confirmation Modal */}
      {showWhatsAppConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full text-center shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Redirecting to WhatsApp
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              You’re about to be redirected to WhatsApp to complete your booking
              request. Do you want to proceed?
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                variant="default"
                onClick={proceedToWhatsApp}
                className="flex-1"
              >
                Proceed
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowWhatsAppConfirm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
