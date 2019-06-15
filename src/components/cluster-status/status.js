import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';

import { useStyles as useBarStyles } from '../shared/bars';
import { colors } from '../theme';

const Status = ({ loading, icon, title, children }) => {
  const classes = useStyles();
  const barClasses = useBarStyles({ color: colors.green.light });
  return (
    <ExpansionPanel elevation={2} className={classes.root}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className={barClasses.vertical}
      >
        {icon}
        {title && <h3 className={classes.title}>{title}</h3>}
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
    margin: 0,
    fontFamily: 'monospace',
    display: 'flex',
    alignItems: 'center'
  },
  list: { width: '100%' }
}));

export default Status;
