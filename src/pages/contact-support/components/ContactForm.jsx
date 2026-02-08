import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';
import emailjs from '@emailjs/browser';


const ContactForm = () => {
  const [formData, setFormData] = useState({
    purpose: '',
    name: '',
    email: '',
    phone: '',
    bookingReference: '',
    urgency: 'normal',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const purposeOptions = [
    { value: 'booking-inquiry', label: 'New Booking Inquiry' },
    { value: 'modification', label: 'Booking Modification' },
    { value: 'complaint', label: 'Service Complaint' },
    { value: 'general', label: 'General Question' },
    { value: 'payment', label: 'Payment Issue' },
    { value: 'cancellation', label: 'Cancellation Request' }
  ];

  const urgencyOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'normal', label: 'Normal Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'urgent', label: 'Urgent - Same Day' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const ticketId = `ST-${Date.now().toString().slice(-6)}`;

    const ticketMessage = `
==============================
   NEW SUPPORT TICKET
==============================

Ticket ID: ${ticketId}
Status: New
Source: Website Contact Form
Submitted: ${new Date().toLocaleString()}

--------------------------------
CLIENT INFORMATION
--------------------------------
Full Name: ${formData.name}
Email Address: ${formData.email}
Phone Number: ${formData.phone || 'Not provided'}

--------------------------------
REQUEST DETAILS
--------------------------------
Purpose of Contact: ${formData.purpose}
Urgency Level: ${formData.urgency}
Booking Reference: ${formData.bookingReference || 'Not provided'}

--------------------------------
CLIENT MESSAGE
--------------------------------
${formData.message}

==============================
END OF TICKET
==============================
`;

    await emailjs.send(
      'sammuelryan4050',
      'template_f02mzbp',
      {
        subject: `🎫 Support Ticket [${ticketId}] - ${formData.urgency.toUpperCase()}`,
        ticket_id: ticketId,
        from_name: formData.name,
        from_email: formData.email,
        ticket_body: ticketMessage
      },
      '6BaKcD82xJMuMp6kf'
    );

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        purpose: '',
        name: '',
        email: '',
        phone: '',
        bookingReference: '',
        urgency: 'normal',
        message: ''
      });
    }, 3000);

  } catch (error) {
    console.error('Email send failed:', error);
    alert('Failed to send message. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};

  const characterCount = formData?.message?.length;
  const maxCharacters = 1000;

  if (submitted) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <div className="flex items-center justify-center w-16 h-16 bg-success/10 rounded-full mx-auto mb-4">
          <Icon name="CheckCircle" size={32} className="text-success" />
        </div>
        <h3 className="font-heading font-semibold text-xl mb-2">Message Sent Successfully!</h3>
        <p className="text-muted-foreground mb-4">
          Thank you for contacting us. We'll respond within 2-4 hours during business hours.
        </p>
        <p className="text-sm text-muted-foreground">
          Reference ID: #CS{Date.now()?.toString()?.slice(-6)}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="MessageSquare" size={24} className="text-primary" />
        <h2 className="font-heading font-semibold text-xl">Contact Form</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Select
          label="Purpose of Contact"
          placeholder="Select inquiry type"
          options={purposeOptions}
          value={formData?.purpose}
          onChange={(value) => handleInputChange('purpose', value)}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={formData?.name}
            onChange={(e) => handleInputChange('name', e?.target?.value)}
            required
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="your.email@example.com"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Phone Number"
            type="tel"
            placeholder="+254 700 000 000"
            value={formData?.phone}
            onChange={(e) => handleInputChange('phone', e?.target?.value)}
          />

          <Input
            label="Booking Reference (Optional)"
            type="text"
            placeholder="ST-XXXXXX"
            value={formData?.bookingReference}
            onChange={(e) => handleInputChange('bookingReference', e?.target?.value)}
            description="If you have an existing booking"
          />
        </div>

        <Select
          label="Urgency Level"
          options={urgencyOptions}
          value={formData?.urgency}
          onChange={(value) => handleInputChange('urgency', value)}
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Message <span className="text-destructive">*</span>
          </label>
          <textarea
            className="w-full min-h-32 px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-y"
            placeholder="Please provide detailed information about your inquiry..."
            value={formData?.message}
            onChange={(e) => handleInputChange('message', e?.target?.value)}
            maxLength={maxCharacters}
            required
          />
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">
              Be as specific as possible for faster resolution
            </span>
            <span className={`${characterCount > maxCharacters * 0.9 ? 'text-warning' : 'text-muted-foreground'}`}>
              {characterCount}/{maxCharacters}
            </span>
          </div>
        </div>

        <div className="bg-muted/50 border border-border rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Response Times:</p>
              <ul className="space-y-1">
                <li>• General inquiries: 2-4 hours</li>
                <li>• Booking modifications: 1-2 hours</li>
                <li>• Urgent matters: 30 minutes</li>
                <li>• Emergency: Call +254 743248996</li>
              </ul>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          variant="default"
          loading={isSubmitting}
          disabled={!formData?.purpose || !formData?.name || !formData?.email || !formData?.message}
          iconName="Send"
          iconPosition="right"
          className="w-full"
        >
          {isSubmitting ? 'Sending Message...' : 'Send Message'}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;