import React from 'react';
import './App.css';
import Layout from './components/layout';
import SEO from './components/seo';
import ClusterStatus from './components/cluster-status';

const App: React.FC = () => (
  <Layout>
    <SEO title="Status" />
    <ClusterStatus />
  </Layout>
);

export default App;
