import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { get, minBy } from 'lodash';

const ContainerStatus = ({ title, subheader, icon, metrics }) => {
  const classes = useStyles();
  const containers = get(metrics, 'containers');
  const isHealthy = containers
    ? minBy(Object.values(containers), ({ ready }) => ready)
    : true;
  return (
    <ListItem>
      <Card className={`${classes.card} ${isHealthy ? classes.healthy : ''}`}>
        <Header icon={icon} title={title} subheader={subheader} />
        {containers && <Metrics containers={containers} />}
      </Card>
    </ListItem>
  );
};

const Header = ({ icon, title, subheader }) => {
  const classes = useStyles();
  return (
    <div className={classes.header}>
      <CardHeader avatar={icon} title={title} subheader={subheader} />
      <div className={classes.headerIcons} />
    </div>
  );
};

const Metrics = ({ containers }) => {
  return (
    <CardContent>
      {Object.values(containers).map((container) => (
        <Typography key={container.image}>
          Image: <code>{container.image}</code>
        </Typography>
      ))}
    </CardContent>
  );
};

const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%'
  },
  healthy: {
    boxShadow: `0px 1px 3px 0px ${theme.palette.green.main}, 0px 1px 3px 0px ${theme.palette.green.main}, 0px 0px 3px -1px ${theme.palette.green.main}`
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  headerIcons: {
    padding: '16px'
  }
}));

const getContainerMetrics = (container, metrics, images) => {
  const pod = metrics.containers[container];
  return metrics.pods;
};

export default ContainerStatus;
