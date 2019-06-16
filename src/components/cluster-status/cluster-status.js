import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { get, merge } from 'lodash';
import { flow, pickBy, min, flatMap } from 'lodash/fp';
import parsePrometheusTextFormat from 'parse-prometheus-text-format';

import MatrixStatus from './matrix';
import MumbleStatus from './mumble';
import VerdunStatus from './verdun';
import MiscStatus from './misc';
import TraefikStatus from './traefik';
import { HorizontalBar } from '../shared/bars';
import HeartbeatIcon from '../../images/heartbeat.svg';

const ClusterStatus = () => {
  const [metrics, setMetrics] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    fetchMetrics()
      .then((metrics) => {
        setMetrics(metrics);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  }, []);

  const healthy = getApplicationHealth(metrics);
  console.log({ healthy });
  const classes = useHeaderStyles({ healthy });
  return (
    <section>
      <header className={classes.root}>
        <div className={classes.status}>
          <HeartbeatIcon className={classes.heartbeat} />
        </div>
        <div className={classes.title}>
          <h2>Applications</h2>
          <HorizontalBar />
        </div>
      </header>
      <MatrixStatus loading={loading} metrics={get(metrics, 'matrix')} />
      <MumbleStatus loading={loading} metrics={get(metrics, 'murmur')} />
      <MiscStatus loading={loading} metrics={get(metrics, 'misc')} />
      <VerdunStatus loading={loading} metrics={get(metrics, 'verdun')} />
      <TraefikStatus loading={loading} metrics={get(metrics, 'traefik')} />
    </section>
  );
};

const applicationNamespaces = ['hefeteig', 'matrix', 'misc', 'murmur'];
const getApplicationHealth = (metrics) =>
  flow(
    pickBy((_val, namespace) => applicationNamespaces.includes(namespace)),
    flatMap((pods) => Object.values(pods).map(({ ready }) => ready)),
    min
  )(metrics);

const metricsUrl = __DEVELOPMENT__ ? '/mock/metrics.txt' : '/metrics';
const fetchMetrics = () => {
  return axios.get(metricsUrl).then(({ data }) => {
    let metrics = parsePrometheusTextFormat(data);
    metrics = normalizeMetrics(metrics);
    console.log(metrics);
    return metrics;
  });
};

const useHeaderStyles = makeStyles((theme) => ({
  root: {
    padding: '0.2rem 24px',
    display: 'grid',
    gridTemplate: `
[row1-start] 'status title' [row1-end]
/ 6rem max-content
`
  },
  title: {
    paddingLeft: '1rem',
    gridArea: 'title',
    '& h2': {
      fontFamily: 'serif',
      fontWeight: 500,
      letterSpacing: '0.2rem',
      fontSize: '2rem',
      marginBottom: 0
    }
  },
  status: {
    gridArea: 'status',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '0.5rem'
  },
  heartbeat: {
    height: '2.5rem',
    width: '2.5rem',
    opacity: ({ healthy }) => (healthy === undefined ? 0.3 : 1),
    transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    color: ({ healthy }) =>
      healthy === undefined || healthy
        ? theme.palette.green.main
        : theme.palette.yellow.main
  }
}));

const metricMappers = {
  kube_pod_container_status_ready: ({ value }) => ({ ready: value }),
  kube_pod_container_info: ({ labels: { image } }) => ({ image }),
  kube_pod_labels: ({ labels: { label_version: version } }) =>
    version ? { version } : null
};

const normalizeMetrics = (data) =>
  data.reduce((res, { name, metrics }) => {
    const mapper = metricMappers[name];
    if (!mapper) {
      return res;
    }
    const normalized = metrics.reduce((res, metric) => {
      let {
        labels: { namespace, container, pod }
      } = metric;
      container = container || podToContainer(pod);
      return merge(res, {
        [namespace]: {
          [container]: mapper(metric)
        }
      });
    }, res);

    return merge(res, normalized);
  }, {});

const podToContainer = (pod) =>
  pod
    .split('-')
    .slice(0, -2)
    .join('-');

export default ClusterStatus;
