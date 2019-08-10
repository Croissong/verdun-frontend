import React from 'react';
import { ReactComponent as PrometheusIcon } from 'images/prometheus.svg';
import PodStatus from './pod-status';
import Status from './status';
import { useGetPodStatusQuery } from 'generated/graphql';
import { normalizePodStatus } from './utils';

const PrometheusStatus = () => {
  const {
    loading,
    error,
    data: { podStatus = [] } = {}
  } = useGetPodStatusQuery({
    variables: { namespaces: ['prometheus'] }
  });
  const metrics = normalizePodStatus(podStatus);
  return (
    <Status
      title="Prometheus"
      icon={<PrometheusIcon style={{ height: '2rem', width: '6rem' }} />}
      {...{ loading, error, podStatus }}
    >
      {!loading && (
        <>
          <PodStatus
            icon={<PrometheusIcon style={{ height: '2rem', width: '2rem' }} />}
            title="Prometheus"
            subheader="Systems monitoring and alerting toolkit"
            url="https://prometheus.patrician.gold"
            metrics={metrics['prometheus']}
          />
          <PodStatus
            icon={<PrometheusIcon style={{ height: '2rem', width: '2rem' }} />}
            title="Prometheus Operator"
            subheader="Manager Prometheus setup"
            metrics={metrics['prometheus-operator-operator']}
          />
          <PodStatus
            icon={<PrometheusIcon style={{ height: '2rem', width: '2rem' }} />}
            title="Alertmanager"
            subheader="Handles alerts sent by Prometheus"
            metrics={metrics['alertmanager']}
          />
          <PodStatus
            icon={<PrometheusIcon style={{ height: '2rem', width: '2rem' }} />}
            title="kube-state-metrics"
            subheader="Expose cluster metrics"
            metrics={metrics['kube-state-metrics']}
          />
        </>
      )}
    </Status>
  );
};

export default PrometheusStatus;
