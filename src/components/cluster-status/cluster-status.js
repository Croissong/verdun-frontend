import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { get, merge } from 'lodash';
import parsePrometheusTextFormat from 'parse-prometheus-text-format';

import MatrixStatus from './matrix';
import MumbleStatus from './mumble';
import VerdunStatus from './verdun';
import MiscStatus from './misc';
import TraefikStatus from './traefik';

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

  const classes = useStyles();
  return (
    <>
      <MatrixStatus loading={loading} metrics={get(metrics, 'matrix')} />
      <MumbleStatus loading={loading} metrics={get(metrics, 'murmur')} />
      <MiscStatus loading={loading} metrics={get(metrics, 'misc')} />
      <VerdunStatus loading={loading} metrics={get(metrics, 'verdun')} />
      <TraefikStatus loading={loading} metrics={get(metrics, 'traefik')} />
    </>
  );
};

const fetchMetrics = () => {
  return axios.get('/metrics').then(({ data }) => {
    let metrics = parsePrometheusTextFormat(data);
    metrics = normalizeMetrics(metrics);
    console.log(metrics);
    return metrics;
  });
};

const useStyles = makeStyles((theme) => ({}));

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
