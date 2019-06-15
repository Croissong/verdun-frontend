import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

export const HorizontalBar = () => {
  const classes = useStyles();
  return <div className={classes.horizontalBar} />;
};

const useStyles = makeStyles((theme) => ({
  horizontalBar: {
    backgroundColor: '#07bbb5',
    height: 6,
    width: 58,
    margin: '0 auto 1rem auto',
    borderRadius: 50
  }
}));
