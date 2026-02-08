import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const FAQSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState(new Set());

  const faqCategories = [
    {
      category: 'Booking Process',
      icon: 'Calendar',
      items: [
        {
          id: 1,
          question: 'How do I book a luxury transfer service?',
          answer: `You can book through our website by selecting your service type, entering pickup and destination details, choosing your preferred vehicle, and completing payment. Our booking process takes just 3-5 minutes and provides instant confirmation.`
        },
        {
          id: 2,
          question: 'How far in advance should I book?',
          answer: `We recommend booking at least 2 hours in advance for standard services. For airport transfers, book 4-6 hours ahead. Same-day bookings are available subject to vehicle availability with a 25% surcharge.`
        },
        {
          id: 3,
          question: 'Can I modify my booking after confirmation?',
          answer: `Yes, modifications are allowed up to 2 hours before your scheduled pickup time. Changes to date, time, or pickup location may incur additional charges. Contact our support team for assistance.`
        }
      ]
    },
    {
      category: 'Payment Methods',
      icon: 'CreditCard',
      items: [
        {
          id: 4,
          question: 'What payment methods do you accept?',
          answer: `We accept M-Pesa, Visa, Mastercard, American Express, and bank transfers. All payments are processed securely with 256-bit SSL encryption. Corporate accounts can be invoiced monthly.`
        },
        {
          id: 5,
          question: 'When is payment processed?',
          answer: `Payment is processed immediately upon booking confirmation. For corporate accounts, payment terms are Net 30 days. Deposits may be required for multi-day bookings or high-value services.`
        },
        {
          id: 6,
          question: 'Are there any hidden fees?',
          answer: `No hidden fees. Our pricing includes driver gratuity, fuel, and standard waiting time. Additional charges may apply for extra stops, extended waiting, or premium add-ons which are clearly displayed during booking.`
        }
      ]
    },
    {
      category: 'Cancellation Policy',
      icon: 'XCircle',
      items: [
        {
          id: 7,
          question: 'What is your cancellation policy?',
          answer: `Free cancellation up to 4 hours before pickup. Cancellations 2-4 hours before incur 25% charge. Less than 2 hours: 50% charge. No-shows are charged full amount. Weather-related cancellations are fully refundable.`
        },
        {
          id: 8,
          question: 'How do I cancel my booking?',
          answer: `Cancel through your booking confirmation email, our website using your reference number, or by calling our support line. Refunds are processed within 3-5 business days to your original payment method.`
        }
      ]
    },
    {
      category: 'Service Areas',
      icon: 'MapPin',
      items: [
        {
          id: 9,
          question: 'Which areas do you serve?',
          answer: `We serve all of Nairobi, Mombasa, Kisumu, and major tourist destinations including Maasai Mara, Amboseli, Tsavo, and coastal regions. Airport transfers available from JKIA, Wilson Airport, and Moi International Airport.`
        },
        {
          id: 10,
          question: 'Do you provide intercity transfers?',
          answer: `Yes, we offer luxury intercity transfers between major Kenyan cities and tourist destinations. Multi-day safari packages and lodge transfers are available with professional driver-guides.`
        }
      ]
    },
    {
      category: 'Vehicle & Safety',
      icon: 'Shield',
      items: [
        {
          id: 11,
          question: 'What safety measures do you have?',
          answer: `All vehicles undergo daily safety inspections, drivers are professionally trained and vetted, vehicles have GPS tracking, and we maintain comprehensive insurance coverage. COVID-19 protocols include vehicle sanitization and health screening.`
        },
        {
          id: 12,
          question: 'What if my flight is delayed?',
          answer: `We monitor flight schedules in real-time for airport transfers. No additional charges for delays up to 2 hours. Our drivers will wait and adjust pickup times automatically. You'll receive SMS updates about any changes.`
        }
      ]
    }
  ];

  const toggleExpanded = (itemId) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded?.has(itemId)) {
      newExpanded?.delete(itemId);
    } else {
      newExpanded?.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const filteredFAQs = faqCategories?.map(category => ({
    ...category,
    items: category?.items?.filter(item =>
      item?.question?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      item?.answer?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    )
  }))?.filter(category => category?.items?.length > 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="HelpCircle" size={24} className="text-primary" />
        <h2 className="font-heading font-semibold text-xl">Frequently Asked Questions</h2>
      </div>
      <Input
        type="search"
        placeholder="Search FAQs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e?.target?.value)}
        className="mb-6"
      />
      <div className="space-y-6">
        {filteredFAQs?.map((category) => (
          <div key={category?.category} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Icon name={category?.icon} size={20} className="text-primary" />
              <h3 className="font-heading font-semibold text-lg">{category?.category}</h3>
            </div>

            <div className="space-y-3">
              {category?.items?.map((item) => (
                <div key={item?.id} className="border border-border rounded-lg">
                  <button
                    onClick={() => toggleExpanded(item?.id)}
                    className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-muted/50 luxury-transition rounded-lg"
                  >
                    <span className="font-medium text-foreground pr-4">{item?.question}</span>
                    <Icon
                      name={expandedItems?.has(item?.id) ? "ChevronUp" : "ChevronDown"}
                      size={20}
                      className="text-muted-foreground flex-shrink-0"
                    />
                  </button>
                  
                  {expandedItems?.has(item?.id) && (
                    <div className="px-4 pb-4 pt-2 border-t border-border">
                      <p className="text-muted-foreground leading-relaxed">{item?.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {filteredFAQs?.length === 0 && searchTerm && (
        <div className="text-center py-8">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="font-heading font-semibold text-lg mb-2">No results found</h3>
          <p className="text-muted-foreground">
            Try different keywords or contact our support team for assistance.
          </p>
        </div>
      )}
    </div>
  );
};

export default FAQSection;