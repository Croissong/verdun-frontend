import React from 'react';
import VerdunIcon from '../../images/verdun-icon.svg';
import PrometheusIcon from '../../images/prometheus.svg';
import ContainerStatus from './container-status';
import Status from './status';
import { get } from 'lodash';

const VerdunStatus = ({ loading, metrics }) => (
  <Status
    loading={loading}
    icon={<VerdunIcon style={{ height: '2rem', width: '6rem' }} />}
  >
    <ContainerStatus
      icon={<VerdunIcon style={{ height: '2rem', width: '2rem' }} />}
      title="Verdun"
      subheader="Verdun Frontend"
      metrics={get(metrics, 'verdun-frontend')}
      images={{
        image: `verdun-frontend:asd`,
        extra: [{ name: 'Nginx', image: 'asdgg' }]
      }}
    />

    <ContainerStatus
      icon={<PrometheusIcon style={{ height: '2rem', width: '2rem' }} />}
      title="kube-state-metrics "
      subheader="Expose cluster-level metrics"
      metrics={get(metrics, 'kube-state-metrics')}
    />
  </Status>
);

export default VerdunStatus;
