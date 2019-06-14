import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import HeartbeatIcon from '../../images/heartbeat.svg';

const Status = ({ loading, icon, title, children }) => {
  const classes = useStyles();
  return (
    <ExpansionPanel elevation="2">
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className={classes.borderBar}
      >
        {icon}
        {title && <h3 className={classes.title}>{title}</h3>}
        <div className={classes.headerIcons}>
          <HeartbeatIcon className={classes.heartbeat} />
        </div>
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
  title: {
    margin: 0
  },
  heartbeat: {
    height: '2rem',
    width: '2rem',
    color: 'green'
  },
  headerIcons: { marginLeft: 'auto' },
  list: { width: '100%' },
  borderBar: {
    '&:before ': {
      display: 'block',
      left: 0,
      content: '""',
      height: '75%',
      width: '0.3rem',
      background: '#11b4ae9c',
      borderRadius: 10,
      position: 'absolute',
      top: 0,
      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    },
    '&.Mui-expanded:before': {
      height: '100%',
      background: '#07bbb5'
    }
  }
}));

export default Status;
