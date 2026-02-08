import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ActionButtons = ({ bookingData, onAction }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  const handleAddToCalendar = () => {
    const event = {
      title: `Sun's Travel - ${bookingData?.serviceType}`,
      start: new Date(bookingData.pickup.dateTime),
      end: new Date(new Date(bookingData.pickup.dateTime).getTime() + (2 * 60 * 60 * 1000)), // 2 hours duration
      description: `Pickup: ${bookingData?.pickup?.address}\nDestination: ${bookingData?.destination?.address}\nVehicle: ${bookingData?.vehicle?.name}\nReference: ${bookingData?.reference}`,
      location: bookingData?.pickup?.address
    };

    // Create calendar event URL (Google Calendar)
    const startTime = event?.start?.toISOString()?.replace(/[-:]/g, '')?.split('.')?.[0] + 'Z';
    const endTime = event?.end?.toISOString()?.replace(/[-:]/g, '')?.split('.')?.[0] + 'Z';
    
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event?.title)}&dates=${startTime}/${endTime}&details=${encodeURIComponent(event?.description)}&location=${encodeURIComponent(event?.location)}`;
    
    window.open(calendarUrl, '_blank');
    onAction?.('calendar_added');
  };

  const handleDownloadReceipt = async () => {
    setIsDownloading(true);
    try {
      // Simulate receipt generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a mock PDF download
      const receiptData = `
        Sun's Travel - Receipt
        Reference: ${bookingData?.reference}
        Date: ${new Date()?.toLocaleDateString()}
        Service: ${bookingData?.serviceType}
        Total: KES ${bookingData?.total?.toLocaleString()}
      `;
      
      const blob = new Blob([receiptData], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `receipt-${bookingData?.reference}.txt`;
      document.body?.appendChild(a);
      a?.click();
      document.body?.removeChild(a);
      URL.revokeObjectURL(url);
      
      onAction?.('receipt_downloaded');
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrintItinerary = async () => {
    setIsPrinting(true);
    try {
      // Create printable content
      const printContent = `
        <html>
          <head>
            <title>Trip Itinerary - ${bookingData?.reference}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 40px; }
              .header { text-align: center; margin-bottom: 30px; }
              .section { margin-bottom: 20px; }
              .label { font-weight: bold; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Sun's Travel</h1>
              <h2>Trip Itinerary</h2>
              <p>Reference: ${bookingData?.reference}</p>
            </div>
            <div class="section">
              <p><span class="label">Service:</span> ${bookingData?.serviceType}</p>
              <p><span class="label">Vehicle:</span> ${bookingData?.vehicle?.name}</p>
              <p><span class="label">Pickup:</span> ${bookingData?.pickup?.address}</p>
              <p><span class="label">Destination:</span> ${bookingData?.destination?.address}</p>
              <p><span class="label">Date & Time:</span> ${new Date(bookingData.pickup.dateTime)?.toLocaleString()}</p>
              <p><span class="label">Passenger:</span> ${bookingData?.passenger?.name}</p>
              <p><span class="label">Total:</span> KES ${bookingData?.total?.toLocaleString()}</p>
            </div>
          </body>
        </html>
      `;
      
      const printWindow = window.open('', '_blank');
      printWindow?.document?.write(printContent);
      printWindow?.document?.close();
      printWindow?.print();
      
      onAction?.('itinerary_printed');
    } catch (error) {
      console.error('Print failed:', error);
    } finally {
      setIsPrinting(false);
    }
  };

  const handleContactSupport = () => {
    // Open WhatsApp with pre-filled message
    const message = `Hello, I need assistance with my booking.\n\nReference: ${bookingData?.reference}\nService: ${bookingData?.serviceType}\nDate: ${new Date(bookingData.pickup.dateTime)?.toLocaleDateString()}`;
    const whatsappUrl = `https://wa.me/254700000000?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onAction?.('support_contacted');
  };

  const handleModifyBooking = () => {
    // Navigate to modification form or show modal
    onAction?.('modify_requested');
  };

  const primaryActions = [
    {
      label: 'Add to Calendar',
      icon: 'Calendar',
      variant: 'default',
      action: handleAddToCalendar,
      description: 'Save trip details to your calendar'
    },
    {
      label: 'Download Receipt',
      icon: 'Download',
      variant: 'outline',
      action: handleDownloadReceipt,
      loading: isDownloading,
      description: 'Get PDF receipt for your records'
    }
  ];

  const secondaryActions = [
    {
      label: 'Print Itinerary',
      icon: 'Printer',
      variant: 'ghost',
      action: handlePrintItinerary,
      loading: isPrinting,
      description: 'Print detailed trip information'
    },
    {
      label: 'Contact Support',
      icon: 'Phone',
      variant: 'ghost',
      action: handleContactSupport,
      description: '24/7 customer assistance'
    },
    {
      label: 'Modify Booking',
      icon: 'Edit',
      variant: 'ghost',
      action: handleModifyBooking,
      description: 'Request changes to your trip'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Primary Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {primaryActions?.map((action, index) => (
            <div key={index} className="space-y-2">
              <Button
                variant={action?.variant}
                size="default"
                onClick={action?.action}
                loading={action?.loading}
                iconName={action?.icon}
                iconPosition="left"
                className="w-full"
              >
                {action?.label}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                {action?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Secondary Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Additional Options</h3>
        <div className="space-y-3">
          {secondaryActions?.map((action, index) => (
            <Button
              key={index}
              variant={action?.variant}
              size="sm"
              onClick={action?.action}
              loading={action?.loading}
              iconName={action?.icon}
              iconPosition="left"
              className="w-full justify-start"
            >
              <div className="flex flex-col items-start ml-2">
                <span>{action?.label}</span>
                <span className="text-xs text-muted-foreground font-normal">
                  {action?.description}
                </span>
              </div>
            </Button>
          ))}
        </div>
      </div>
      {/* Emergency Contact */}
      <div className="bg-error/10 border border-error/20 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="AlertCircle" size={16} className="text-error" />
          <h4 className="font-semibold text-error">Emergency Contact</h4>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          For urgent assistance during your trip
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.location.href = 'tel:+254700000001'}
          iconName="Phone"
          iconPosition="left"
          className="border-error text-error hover:bg-error hover:text-error-foreground"
        >
          Call Emergency Line
        </Button>
      </div>
    </div>
  );
};

export default ActionButtons;