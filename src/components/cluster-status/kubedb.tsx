import React from 'react';
import { ReactComponent as KubedbIcon } from '../../images/kubedb.svg';
import PodStatus from './pod-status';
import Status from './status';
import { useGetPodStatusQuery } from 'generated/graphql';
import { normalizePodStatus } from './utils';

const KubedbStatus = () => {
  const {
    loading,
    error,
    data: { podStatus = [] } = {}
  } = useGetPodStatusQuery({
    variables: { namespaces: ['kubedb'] }
  });
  const metrics = normalizePodStatus(podStatus);
  return (
    <Status
      title="KubeDB"
      icon={<KubedbIcon style={{ height: '2rem', width: '6rem' }} />}
      {...{ loading, error, podStatus }}
    >
      <PodStatus
        icon={<KubedbIcon style={{ height: '2rem', width: '2rem' }} />}
        title="KubeDB Operator"
        subheader="Run databases on Kubernetes"
        metrics={metrics['kubedb']}
      />
    </Status>
  );
};

export default KubedbStatus;
