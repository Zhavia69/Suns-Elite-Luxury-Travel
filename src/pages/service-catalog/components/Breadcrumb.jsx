import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Breadcrumb = ({ items = [] }) => {
  const defaultItems = [
    { label: 'Home', path: '/homepage' },
    { label: 'Services', path: '/service-catalog' }
  ];

  const breadcrumbItems = items?.length > 0 ? items : defaultItems;

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
      {breadcrumbItems?.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-muted-foreground/60" />
          )}
          {index === breadcrumbItems?.length - 1 ? (
            <span className="text-foreground font-medium">{item?.label}</span>
          ) : (
            <Link
              to={item?.path}
              className="hover:text-foreground luxury-transition"
            >
              {item?.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;