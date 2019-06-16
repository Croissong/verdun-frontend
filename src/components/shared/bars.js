import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

export const HorizontalBar = () => {
  const classes = useStyles();
  return <div className={classes.horizontal} />;
};

export const VerticalBar = () => {
  const classes = useStyles();
  return <div className={classes.vertical} />;
};

export const useStyles = makeStyles((theme) => ({
  horizontal: {
    backgroundColor: '#07bbb5',
    height: 6,
    width: '35%',
    margin: '0 auto 1rem auto',
    borderRadius: 50
  },
  vertical: {
    '&:before ': {
      display: 'block',
      left: 0,
      content: '""',
      height: '75%',
      width: '0.3rem',
      background: ({ color }) => color || theme.palette.primary.main,
      borderRadius: 10,
      position: 'absolute',
      top: 0,
      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    },
    '&.MuiExpansionPanelSummary-root:before': {
      opacity: 0.3
    },
    '&.Mui-expanded:before': {
      opacity: 1,
      height: '100%'
    }
  }
}));
