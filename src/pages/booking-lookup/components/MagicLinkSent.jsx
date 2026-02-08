import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const MagicLinkSent = ({ email, onBackToForm, onResendLink }) => {
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleResend = () => {
    onResendLink();
    setCountdown(60);
    setCanResend(false);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card border border-border rounded-lg shadow-luxury p-6">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center w-16 h-16 bg-success/10 rounded-full mx-auto mb-4">
            <Icon name="Mail" size={32} className="text-success" />
          </div>
          <h2 className="font-heading font-semibold text-xl text-foreground mb-2">
            Check Your Email
          </h2>
          <p className="text-sm text-muted-foreground">
            We've sent a secure access link to
          </p>
          <p className="text-sm font-medium text-foreground mt-1">
            {email}
          </p>
        </div>

        <div className="bg-muted/30 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm text-muted-foreground">
              <p className="mb-2">
                Click the link in your email to securely access your booking details. 
                The link will expire in 15 minutes for your security.
              </p>
              <ul className="space-y-1 text-xs">
                <li>• Check your spam/junk folder if you don't see it</li>
                <li>• The email may take up to 2 minutes to arrive</li>
                <li>• Link works on any device with internet access</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            variant="outline"
            size="default"
            fullWidth
            onClick={handleResend}
            disabled={!canResend}
            iconName="RefreshCw"
            iconPosition="left"
          >
            {canResend ? 'Resend Link' : `Resend in ${countdown}s`}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            fullWidth
            onClick={onBackToForm}
            iconName="ArrowLeft"
            iconPosition="left"
          >
            Try Different Email
          </Button>
        </div>

        <div className="mt-6 pt-4 border-t border-border text-center">
          <p className="text-xs text-muted-foreground mb-2">
            Need immediate assistance?
          </p>
          <div className="flex space-x-4 justify-center">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => window.open('https://wa.me/254743248996', '_blank')}
              iconName="MessageCircle"
              iconPosition="left"
            >
              WhatsApp
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => window.location.href = 'tel:+254743248996'}
              iconName="Phone"
              iconPosition="left"
            >
              Call Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MagicLinkSent;