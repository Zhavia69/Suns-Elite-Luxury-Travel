import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HelpSection = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      question: "Where can I find my booking reference number?",
      answer: `Your booking reference number was sent to your email when you completed your reservation. It follows the format ST + Date + Sequence number (e.g., ST240818001). Check your email confirmation or SMS notification for this reference.`
    },
    {
      question: "What if I can't find the confirmation email?",
      answer: `Check your spam/junk folder first. If you still can't find it, use the 'Search by Email & Travel Date' option below the main form. We'll help you locate your booking using your travel details.`
    },
    {
      question: "How long does the magic link take to arrive?",
      answer: `Magic links are typically delivered within 30 seconds to 2 minutes. The link is valid for 15 minutes for security reasons. If you don't receive it, check your spam folder or try resending.`
    },
    {
      question: "Can I access my booking from a different device?",
      answer: `Yes! The magic link works on any device with internet access. You can check your email on your phone and access your booking details from there, or forward the link to another device.`
    },
    {
      question: "What if my booking was made by someone else?",
      answer: `If your booking was made by a travel agent, assistant, or family member, you'll need to use the email address that was used during the booking process. Contact the person who made the booking for the confirmation details.`
    }
  ];

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <div className="bg-card/30 border border-border/30 rounded-lg p-6">
        <div className="text-center mb-6">
          <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
            Need Help Finding Your Booking?
          </h3>
          <p className="text-sm text-muted-foreground">
            Common questions and solutions for booking lookup
          </p>
        </div>

        <div className="space-y-3">
          {faqs?.map((faq, index) => (
            <div key={index} className="border border-border/50 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-muted/30 luxury-transition"
              >
                <span className="font-medium text-sm text-foreground pr-4">
                  {faq?.question}
                </span>
                <Icon 
                  name={expandedFaq === index ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                  className="text-muted-foreground flex-shrink-0" 
                />
              </button>
              {expandedFaq === index && (
                <div className="px-4 pb-3 border-t border-border/30">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {faq?.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-border/30">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Still can't find your booking? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open('https://wa.me/254700000000?text=I need help finding my booking', '_blank')}
                iconName="MessageCircle"
                iconPosition="left"
              >
                WhatsApp Support
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.href = 'tel:+254700000000'}
                iconName="Phone"
                iconPosition="left"
              >
                Call +254 700 000 000
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.href = 'mailto:support@sunstravel.co.ke?subject=Booking Lookup Assistance'}
                iconName="Mail"
                iconPosition="left"
              >
                Email Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSection;