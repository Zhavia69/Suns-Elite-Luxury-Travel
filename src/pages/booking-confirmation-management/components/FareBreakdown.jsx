import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FareBreakdown = ({ fareDetails, currency = 'KES' }) => {
  const [selectedCurrency, setSelectedCurrency] = useState(currency);
  const [isExpanded, setIsExpanded] = useState(false);

  const exchangeRate = 0.0067; // KES to USD rate

  const convertAmount = (amount) => {
    if (selectedCurrency === 'USD') {
      return (amount * exchangeRate)?.toFixed(2);
    }
    return amount?.toLocaleString();
  };

  const getCurrencySymbol = () => selectedCurrency === 'USD' ? '$' : 'KES ';

  const fareItems = [
    { label: 'Base Fare', amount: fareDetails?.baseFare, icon: 'Car' },
    { label: 'Distance Charge', amount: fareDetails?.distanceCharge, icon: 'Route', detail: `${fareDetails?.distance} km @ ${getCurrencySymbol()}${convertAmount(fareDetails?.perKmRate)}/km` },
    { label: 'Time Charge', amount: fareDetails?.timeCharge, icon: 'Clock', detail: `${fareDetails?.duration} @ ${getCurrencySymbol()}${convertAmount(fareDetails?.perMinRate)}/min` },
    ...(fareDetails?.nightSurcharge > 0 ? [{ label: 'Night Surcharge', amount: fareDetails?.nightSurcharge, icon: 'Moon', detail: '10% after 10 PM' }] : []),
    ...(fareDetails?.airportFee > 0 ? [{ label: 'Airport Fee', amount: fareDetails?.airportFee, icon: 'Plane', detail: 'JKIA parking & access' }] : []),
    ...(fareDetails?.addons > 0 ? [{ label: 'Add-on Services', amount: fareDetails?.addons, icon: 'Plus' }] : [])
  ];

  const subtotal = fareItems?.reduce((sum, item) => sum + item?.amount, 0);
  const tax = fareDetails?.tax || subtotal * 0.16; // 16% VAT
  const total = subtotal + tax;

  const paymentMethods = [
    { type: 'M-Pesa', amount: fareDetails?.mpesaAmount || 0, icon: 'Smartphone' },
    { type: 'Card', amount: fareDetails?.cardAmount || 0, icon: 'CreditCard' }
  ]?.filter(method => method?.amount > 0);

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-lg text-foreground">Fare Breakdown</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSelectedCurrency(selectedCurrency === 'KES' ? 'USD' : 'KES')}
              className="flex items-center space-x-1 px-3 py-1 bg-muted rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground luxury-transition"
            >
              <Icon name="DollarSign" size={14} />
              <span>{selectedCurrency}</span>
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 text-muted-foreground hover:text-foreground luxury-transition"
            >
              <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-heading font-semibold text-foreground">
            {getCurrencySymbol()}{convertAmount(total)}
          </span>
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} className="text-success" />
            <span className="text-sm text-success font-medium">Paid</span>
          </div>
        </div>
      </div>
      {isExpanded && (
        <div className="p-6 space-y-4">
          <div className="space-y-3">
            {fareItems?.map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <Icon name={item?.icon} size={16} className="text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">{item?.label}</p>
                    {item?.detail && (
                      <p className="text-xs text-muted-foreground">{item?.detail}</p>
                    )}
                  </div>
                </div>
                <span className="font-medium text-foreground">
                  {getCurrencySymbol()}{convertAmount(item?.amount)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium text-foreground">
                {getCurrencySymbol()}{convertAmount(subtotal)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">VAT (16%)</span>
              <span className="font-medium text-foreground">
                {getCurrencySymbol()}{convertAmount(tax)}
              </span>
            </div>
            <div className="flex items-center justify-between text-lg font-semibold pt-2 border-t border-border">
              <span className="text-foreground">Total</span>
              <span className="text-primary">
                {getCurrencySymbol()}{convertAmount(total)}
              </span>
            </div>
          </div>

          {paymentMethods?.length > 0 && (
            <div className="border-t border-border pt-4">
              <p className="text-sm font-medium text-foreground mb-3">Payment Methods Used</p>
              <div className="space-y-2">
                {paymentMethods?.map((method, index) => (
                  <div key={index} className="flex items-center justify-between py-2 px-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Icon name={method?.icon} size={16} className="text-primary" />
                      <span className="text-sm font-medium text-foreground">{method?.type}</span>
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {getCurrencySymbol()}{convertAmount(method?.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      <div className="p-4 bg-muted/30 border-t border-border">
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Info" size={14} />
          <span>All prices include applicable taxes and fees</span>
        </div>
      </div>
    </div>
  );
};

export default FareBreakdown;