import React from 'react';

import useStyles from './badge.styles';

const StatusBadge: React.FC<StatusBadgeProps> = ({
  className,
  value,
  title,
  healthy,
  warning,
  error
}) => {
  const classes = useStyles({ healthy, warning, error });
  return (
    <div className={`${classes.wrapper} ${className}`}>
      <span>{value}</span>
      <span>{title}</span>
    </div>
  );
};
export default StatusBadge;

type StatusBadgeProps = {
  className: string;
  value: string;
  title: string;
  healthy: boolean;
  warning: boolean;
  error: boolean;
};
