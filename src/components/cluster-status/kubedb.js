import React from 'react';
import KubedbIcon from '../../images/kubedb.svg';
import OAuthIcon from '../../images/oauth.svg';
import PodStatus from './pod-status';
import Status from './status';
import { get } from 'lodash';

const KubedbStatus = ({ loading, metrics }) => {
  return (
    <Status
      title="KubeDB"
      loading={loading}
      icon={<KubedbIcon style={{ height: '2rem', width: '6rem' }} />}
    >
      <PodStatus
        icon={<KubedbIcon style={{ height: '2rem', width: '2rem' }} />}
        title="KubeDB Operator"
        subheader="Run databases Kubernetes"
        metrics={get(metrics, 'kubedb-operator')}
      />
    </Status>
  );
};

export default KubedbStatus;
