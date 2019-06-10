import React from 'react';
import VerdunIcon from '../../images/verdun-icon.svg';
import PrometheusIcon from '../../images/prometheus.svg';
import ContainerStatus from './container-status';
import Status from './status';
import { get } from 'lodash';

const VerdunStatus = ({ loading, metrics }) => {
  const frontendMetrics = get(metrics, 'verdun-frontend');
  return (
    <Status
      title="Verdun"
      loading={loading}
      icon={<VerdunIcon style={{ height: '2rem', width: '6rem' }} />}
    >
      <ContainerStatus
        icon={<VerdunIcon style={{ height: '2rem', width: '2rem' }} />}
        title="Verdun"
        subheader="Cluster Frontend"
        metrics={frontendMetrics}
        images={{
          image: `croissong/verdun-frontend:${get(frontendMetrics, 'version')}`,
          extra: [{ name: 'Nginx', image: get(frontendMetrics, 'image') }]
        }}
      />

      <ContainerStatus
        icon={<PrometheusIcon style={{ height: '2rem', width: '2rem' }} />}
        title="kube-state-metrics"
        subheader="Expose cluster metrics"
        metrics={get(metrics, 'kube-state-metrics')}
      />
    </Status>
  );
};

export default VerdunStatus;
