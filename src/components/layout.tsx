/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import { theme } from 'theme';
import './layout.css';

const Layout = ({ children }) => {
  const classes = useStyles({});
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.wrapper}>
        <main className={classes.main}>{children}</main>
      </div>
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

const useStyles = makeStyles((theme) => ({
  wrapper: {
    maxWidth: '98vw',
    padding: `0px 1.0875rem 1.45rem`,
    paddingTop: 0
  },
  main: {
    maxWidth: 960,
    margin: 'auto'
  }
}));

export default Layout;
