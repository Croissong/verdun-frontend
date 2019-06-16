import React from 'react';
import VerdunIcon from '../../images/verdun-icon.svg';
import PrometheusIcon from '../../images/prometheus.svg';
import PodStatus from './pod-status';
import Status from './status';
import { get } from 'lodash';

const VerdunStatus = ({ loading, metrics }) => {
  const frontendMetrics = get(metrics, 'verdun-frontend');
  if (frontendMetrics) {
    frontendMetrics.containers = {
      ...frontendMetrics.containers,
      'verdun-frontend-init': {
        image: `croissong/verdun-frontend:${get(frontendMetrics, 'version')}`
      }
    };
  }
  return (
    <Status
      title="Verdun"
      loading={loading}
      icon={<VerdunIcon style={{ height: '2rem', width: '6rem' }} />}
    >
      <PodStatus
        icon={<VerdunIcon style={{ height: '2rem', width: '2rem' }} />}
        title="Verdun"
        subheader="Cluster Frontend"
        metrics={frontendMetrics}
      />

      <PodStatus
        icon={<PrometheusIcon style={{ height: '2rem', width: '2rem' }} />}
        title="kube-state-metrics"
        subheader="Expose cluster metrics"
        metrics={get(metrics, 'kube-state-metrics')}
      />
    </Status>
  );
};

export default VerdunStatus;
