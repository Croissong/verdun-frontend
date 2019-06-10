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
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
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
  list: { width: '100%' }
}));

export default Status;
