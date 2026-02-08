import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ContactMethodCard from './components/ContactMethodCard';
import ContactForm from './components/ContactForm';
import FAQSection from './components/FAQSection';
import EmergencyContact from './components/EmergencyContact';
import BusinessHours from './components/BusinessHours';
import SupportWidget from '../../components/ui/SupportWidget';
import Icon from '../../components/AppIcon';
import { contactService } from '../../utils/supabaseService';

const ContactSupport = () => {
  const [faqs, setFaqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const contactMethods = [
    {
      method: 'whatsapp',
      icon: 'MessageCircle',
      title: 'WhatsApp Business',
      description: 'Get instant support through our WhatsApp Business account with quick responses and booking assistance.',
      availability: 'Available 24/7',
      response: 'Response within 5 minutes',
      actionText: 'Start WhatsApp Chat',
      action: () => {
        window.open('https://wa.me/254743248996?text=Hello, I need assistance with Sun\'s Travel services', '_blank');
      }
    },
    {
      method: 'phone',
      icon: 'Phone',
      title: 'Direct Phone Support',
      description: 'Speak directly with our customer service representatives for personalized assistance.',
      availability: 'Mon-Fri: 6AM-11PM, Sat-Sun: 8AM-10PM',
      response: 'Immediate assistance',
      actionText: 'Call Now',
      action: () => {
        window.location.href = 'tel:+254743248996';
      }
    },
    {
      method: 'email',
      icon: 'Mail',
      title: 'Email Support',
      description: 'Send detailed inquiries and receive comprehensive responses from our support team.',
      availability: 'Monitored 24/7',
      response: 'Response within 2-4 hours',
      actionText: 'Send Email',
      action: () => {
        window.location.href = 'mailto:sammuelryan4050@gmail.com?subject=Support Inquiry&body=Hello Sun\'s Travel Team,\n\nI need assistance with:\n\n';
      }
    },
    {
      method: 'live-chat',
      icon: 'MessageSquare',
      title: 'Live Chat Support',
      description: 'Connect with our support agents through real-time chat for immediate assistance.',
      availability: 'Business hours only',
      response: 'Response within 2 minutes',
      actionText: 'Start Live Chat',
      action: () => {
        // Mock live chat functionality
        console.log('Live chat initiated');
        alert('Live chat feature will be available soon. Please use WhatsApp or phone support for immediate assistance.');
      }
    }
  ];

  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const data = await contactService?.getFAQs();
      
      // Transform data to match existing component interface
      const transformedFAQs = data?.map(faq => ({
        id: faq?.id,
        question: faq?.question,
        answer: faq?.answer,
        category: faq?.category,
        isOpen: false
      })) || [];

      setFaqs(transformedFAQs);
    } catch (error) {
      console.error('Error loading FAQs:', error);
      setError(error?.message || 'Failed to load FAQs.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContactFormSubmit = async (formData) => {
    try {
      await contactService?.submitInquiry({
        full_name: formData?.name,
        email: formData?.email,
        phone: formData?.phone,
        subject: formData?.subject,
        message: formData?.message,
        inquiry_type: formData?.inquiryType || 'general'
      });

      // Show success message
      alert('Your inquiry has been submitted successfully. We will get back to you soon.');
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      alert('Failed to submit inquiry. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Contact & Support - Sun's Travel | 24/7 Customer Service</title>
        <meta name="description" content="Get comprehensive support for your luxury travel needs. Contact Sun's Travel through WhatsApp, phone, email, or our contact form. Emergency assistance available 24/7." />
        <meta name="keywords" content="contact support, customer service, WhatsApp support, emergency assistance, booking help, Sun's Travel Kenya" />
      </Helmet>
      <Header />
      <main className="container mx-auto px-4 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
            <Icon name="Headphones" size={32} className="text-primary" />
          </div>
          <h1 className="font-heading font-semibold text-4xl lg:text-5xl mb-4">
            Contact & Support
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're here to assist you 24/7 with all your luxury travel needs. Choose your preferred contact method below.
          </p>
        </div>

        {/* Emergency Contact Banner */}
        <div className="mb-8">
          <EmergencyContact />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Methods - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="font-heading font-semibold text-2xl mb-6">Get in Touch</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactMethods?.map((method, index) => (
                  <ContactMethodCard
                    key={index}
                    {...method}
                  />
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          {/* Business Hours - Right Column */}
          <div className="space-y-6">
            <BusinessHours />

            {/* Quick Stats */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-heading font-semibold text-lg mb-4">Support Statistics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Average Response Time</span>
                  <span className="font-semibold text-success">2.3 minutes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Customer Satisfaction</span>
                  <span className="font-semibold text-success">98.7%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">First Contact Resolution</span>
                  <span className="font-semibold text-success">94.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Languages Supported</span>
                  <span className="font-semibold text-primary">English, Swahili</span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-heading font-semibold text-lg mb-4">Quality Assurance</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} className="text-success" />
                  <span className="text-sm text-muted-foreground">ISO 9001:2015 Certified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Award" size={16} className="text-success" />
                  <span className="text-sm text-muted-foreground">Kenya Tourism Board Licensed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span className="text-sm text-muted-foreground">24/7 Emergency Support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Lock" size={16} className="text-success" />
                  <span className="text-sm text-muted-foreground">Secure Communication</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <FAQSection 
            faqs={faqs} 
            isLoading={isLoading}
            error={error}
            onRetry={loadFAQs}
          />
        </div>

        {/* Additional Support Information */}
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <Icon name="Heart" size={48} className="text-primary mx-auto mb-4" />
          <h3 className="font-heading font-semibold text-2xl mb-4">
            Committed to Excellence
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Our dedicated support team is trained to handle all aspects of luxury travel services. 
            From booking assistance to emergency support, we're committed to providing exceptional 
            service that exceeds your expectations.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center space-x-1">
              <Icon name="Clock" size={16} />
              <span>24/7 Availability</span>
            </span>
            <span className="flex items-center space-x-1">
              <Icon name="Globe" size={16} />
              <span>Multi-language Support</span>
            </span>
            <span className="flex items-center space-x-1">
              <Icon name="Users" size={16} />
              <span>Expert Team</span>
            </span>
            <span className="flex items-center space-x-1">
              <Icon name="Zap" size={16} />
              <span>Rapid Response</span>
            </span>
          </div>
        </div>
      </main>
      <SupportWidget />
    </div>
  );
};

export default ContactSupport;