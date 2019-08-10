import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import StatusBadge from 'components/badge';

import { useStyles as useBarStyles } from '../shared/bars';
import { PodStatus } from 'generated/graphql';
import { ApolloError } from 'apollo-client';
import { all } from 'ramda';
import { Typography } from '@material-ui/core';

type StatusProps = {
  icon: React.ReactNode;
  title: string;
  podStatus: PodStatus[];
  loading: boolean;
  error: ApolloError;
  children: React.ReactNode;
};
const Status: React.FC<StatusProps> = ({
  icon,
  title,
  podStatus,
  error,
  children
}) => {
  const classes = useStyles({});
  const healthy = all((p) => p.ready.value === 1, podStatus);
  const barClasses = useBarStyles({});
  return (
    <ExpansionPanel elevation={2} className={classes.root}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className={barClasses.vertical}
      >
        {icon}
        <Typography variant="h4" className={classes.title}>
          {title}
        </Typography>
        <StatusBadge
          className={classes.badge}
          value={podStatus.length.toString()}
          title={podStatus.length === 1 ? 'Pod' : 'Pods'}
          healthy={healthy}
          warning={!healthy}
          error={!!error}
        />
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <List component="nav" className={classes.list}>
          {children}
        </List>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '0.3rem'
  },
  title: {
    fontFamily: 'monospace',
    display: 'flex',
    alignItems: 'center',
    marginLeft: '2%',
    fontSize: '1.95em'
  },
  badge: {
    marginLeft: 'auto'
  },
  list: { width: '100%' }
}));

export default Status;
