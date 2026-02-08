import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityNotice = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'Secure Access',
      description: 'Magic links expire after 15 minutes and can only be used once'
    },
    {
      icon: 'Lock',
      title: 'Data Protection',
      description: 'Your booking information is encrypted and securely transmitted'
    },
    {
      icon: 'Eye',
      title: 'Privacy First',
      description: 'Only you can access your booking details with the emailed link'
    },
    {
      icon: 'Clock',
      title: 'Rate Limited',
      description: 'Multiple lookup attempts are monitored to prevent abuse'
    }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <div className="bg-card/50 border border-border/50 rounded-lg p-6">
        <div className="text-center mb-6">
          <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
            Your Security Matters
          </h3>
          <p className="text-sm text-muted-foreground">
            We use industry-standard security measures to protect your booking information
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {securityFeatures?.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg flex-shrink-0">
                <Icon name={feature?.icon} size={16} className="text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-sm text-foreground mb-1">
                  {feature?.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {feature?.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-border/50">
          <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Shield" size={12} className="text-success" />
              <span>SSL Encrypted</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="CheckCircle" size={12} className="text-success" />
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Lock" size={12} className="text-success" />
              <span>PCI Secure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityNotice;