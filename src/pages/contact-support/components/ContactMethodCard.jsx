import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ContactMethodCard = ({ method, icon, title, description, action, actionText, availability, response }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-luxury luxury-transition">
      <div className="flex items-start space-x-4">
        <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
          <Icon name={icon} size={24} className="text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-heading font-semibold text-lg mb-2">{title}</h3>
          <p className="text-muted-foreground mb-3">{description}</p>
          
          {availability && (
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Clock" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{availability}</span>
            </div>
          )}
          
          {response && (
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="Timer" size={16} className="text-success" />
              <span className="text-sm text-success">{response}</span>
            </div>
          )}
          
          <Button
            variant="outline"
            onClick={action}
            iconName="ExternalLink"
            iconPosition="right"
            className="w-full sm:w-auto"
          >
            {actionText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactMethodCard;