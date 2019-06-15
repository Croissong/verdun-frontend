import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';

const Status = ({ loading, icon, title, children }) => {
  const classes = useStyles();
  return (
    <ExpansionPanel elevation={2} className={classes.root}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className={classes.borderBar}
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
    marginBottom: '0.3rem'
  },
  title: {
    margin: 0,
    fontFamily: 'monospace',
    display: 'flex',
    alignItems: 'center'
  },
  list: { width: '100%' },
  borderBar: {
    '&:before ': {
      display: 'block',
      left: 0,
      content: '""',
      height: '75%',
      opacity: 0.5,
      width: '0.3rem',
      background: theme.palette.primary.light,
      borderRadius: 10,
      position: 'absolute',
      top: 0,
      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    },
    '&.Mui-expanded:before': {
      opacity: 1,
      height: '100%',
      background: theme.palette.primary.main
    }
  }
}));

export default Status;
