import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const EmergencyContact = () => {
  const emergencyContacts = [
    {
      title: '24/7 Emergency Line',
      number: '+254 743 248 996',
      description: 'For urgent booking issues, safety concerns, or emergency assistance',
      icon: 'Phone',
      action: () => window.location.href = 'tel:+254 743 248 996'
    },
    {
      title: 'WhatsApp Emergency',
      number: '+254 743 248 996',
      description: 'Quick emergency support via WhatsApp messaging',
      icon: 'MessageCircle',
      action: () => window.open('https://wa.me/254743248996?text=EMERGENCY: I need immediate assistance', '_blank')
    }
  ];

  return (
    <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="AlertTriangle" size={24} className="text-destructive" />
        <h3 className="font-heading font-semibold text-lg text-destructive">Emergency Support</h3>
      </div>
      <p className="text-muted-foreground mb-6">
        For urgent matters requiring immediate attention, use our emergency contact options below.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {emergencyContacts?.map((contact, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-destructive/10 rounded-lg">
                <Icon name={contact?.icon} size={20} className="text-destructive" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">{contact?.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{contact?.description}</p>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={contact?.action}
                  iconName="ExternalLink"
                  iconPosition="right"
                >
                  {contact?.number}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Emergency situations include:</p>
            <ul className="space-y-1">
              <li>• Vehicle breakdown or accident</li>
              <li>• Driver no-show for confirmed booking</li>
              <li>• Safety or security concerns</li>
              <li>• Medical emergencies during transport</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContact;