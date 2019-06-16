import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { get, merge } from 'lodash';
import { flow, pickBy, min, flatMap, map } from 'lodash/fp';
import parsePrometheusTextFormat from 'parse-prometheus-text-format';

import MatrixStatus from './matrix';
import MumbleStatus from './mumble';
import VerdunStatus from './verdun';
import MiscStatus from './misc';
import TraefikStatus from './traefik';
import { HorizontalBar } from '../shared/bars';
import HeartbeatIcon from '../../images/heartbeat.svg';
import { headerStyles } from './cluster-status.styles';

const ClusterStatus = () => {
  const [metrics, setMetrics] = useState(null);
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
  return (
    <>
      {error}
      <StatusSection
        title="Applications"
        metrics={metrics}
        namespaces={appNamespaces}
      >
        <MatrixStatus loading={loading} metrics={get(metrics, 'matrix')} />
        <MumbleStatus loading={loading} metrics={get(metrics, 'murmur')} />
        <MiscStatus loading={loading} metrics={get(metrics, 'misc')} />
      </StatusSection>

      <StatusSection
        title="Infrastructure"
        metrics={metrics}
        namespaces={infraNamespaces}
      >
        <VerdunStatus loading={loading} metrics={get(metrics, 'verdun')} />
        <TraefikStatus loading={loading} metrics={get(metrics, 'traefik')} />
      </StatusSection>
    </>
  );
};

const appNamespaces = ['hefeteig', 'matrix', 'misc', 'murmur'];
const infraNamespaces = ['traefik', 'verdun'];

const getNamespacesHealth = (namespaces, metrics) => {
  return flow(
    pickBy((_val, namespace) => namespaces.includes(namespace)),
    flatMap((pods) => Object.values(pods)),
    flatMap(({ containers }) => Object.values(containers)),
    map(({ ready }) => ready),
    min
  )(metrics);
};

const metricsUrl = __DEVELOPMENT__ ? '/mock/metrics.txt' : '/metrics';
const fetchMetrics = () => {
  return axios.get(metricsUrl).then(({ data }) => {
    let metrics = parsePrometheusTextFormat(data);
    metrics = normalizeMetrics(metrics);
    console.log(metrics);
    return metrics;
  });
};

const metricMappers = {
  kube_pod_container_status_ready: ({ value, labels: { container } }) => ({
    containers: { [container]: { ready: value } }
  }),
  kube_pod_container_info: ({ labels: { image, container } }) => ({
    containers: { [container]: { image } }
  }),
  kube_pod_labels: ({
    labels: { pod, label_version: version, label_pod_template_hash: hash }
  }) => {
    const name = hash ? pod.substring(0, pod.indexOf(hash) - 1) : pod;
    return version ? { name, version } : { name };
  }
};

const normalizeMetrics = (data) => {
  let normalized = data.reduce((res, { name, metrics }) => {
    const mapper = metricMappers[name];
    if (!mapper) {
      return res;
    }
    const normalized = metrics.reduce((res, metric) => {
      let {
        labels: { namespace, pod }
      } = metric;
      return merge(res, {
        [pod]: { ...mapper(metric), namespace }
      });
    }, res);

    return merge(res, normalized);
  }, {});
  normalized = Object.values(normalized).reduce(
    (res, { namespace, name, ...metrics }) =>
      merge(res, { [namespace]: { [name]: metrics } }),
    {}
  );
  return normalized;
};

const StatusSection = ({ children, metrics, namespaces, title }) => {
  const healthy = metrics ? getNamespacesHealth(namespaces, metrics) : true;
  const classes = headerStyles({ healthy });
  return (
    <section className={classes.section}>
      <header className={classes.header}>
        <div className={classes.status}>
          <HeartbeatIcon className={classes.heartbeat} />
        </div>
        <div className={classes.title}>
          <h2>
            {title}
            <HorizontalBar />
          </h2>
        </div>
      </header>
      {children}
    </section>
  );
};

export default ClusterStatus;
