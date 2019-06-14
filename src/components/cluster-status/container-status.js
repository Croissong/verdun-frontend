import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

const ContainerStatus = ({ title, subheader, icon, metrics, images }) => {
  const classes = useStyles();
  const isHealthy = metrics ? metrics.ready : true;
  return (
    <ListItem>
      <Card className={`${classes.card} ${isHealthy ? classes.healthy : ''}`}>
        <Header icon={icon} title={title} subheader={subheader} />
        {metrics && <Metrics metrics={metrics} images={images} />}
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

const Metrics = ({ metrics, images }) => {
  return (
    <CardContent>
      {!images ? (
        <Typography key={metrics.image}>
          Image: <code>{metrics.image}</code>
        </Typography>
      ) : (
        [
          <Typography key={images.image}>
            Image: <code>{images.image}</code>
          </Typography>,
          ...images.extra.map((img) => (
            <Typography key={metrics.image}>
              {img.name}: <code>{img.image}</code>
            </Typography>
          ))
        ]
      )}
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

export default ContainerStatus;
