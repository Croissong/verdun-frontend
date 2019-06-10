/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { StaticQuery, graphql } from 'gatsby';

import Header from './header';
import './layout.css';

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={(data) => (
        <>
          <Header siteTitle={data.site.siteMetadata.title} />
          <div className={classes.wrapper}>
            <main className={classes.main}>{children}</main>
          </div>
        </>
      )}
    />
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
