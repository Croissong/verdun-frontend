import React from 'react';
import { ReactComponent as VerdunIcon } from 'images/verdun-icon.svg';
import { ReactComponent as ApolloIcon } from 'images/apollo.svg';
import { ReactComponent as ReactIcon } from 'images/react.svg';
import { ReactComponent as StakaterIcon } from 'images/stakater.svg';
import PodStatus from './pod-status';
import Status from './status';
import { useGetPodStatusQuery } from 'generated/graphql';
import { normalizePodStatus } from './utils';

const VerdunStatus = () => {
  const {
    loading,
    error,
    data: { podStatus = [] } = {}
  } = useGetPodStatusQuery({
    variables: { namespaces: ['verdun'] }
  });
  const metrics = normalizePodStatus(podStatus);
  return (
    <Status
      title="Verdun"
      icon={<VerdunIcon style={{ height: '2rem', width: '6rem' }} />}
      {...{ loading, error, podStatus }}
    >
      <PodStatus
        icon={<ReactIcon style={{ height: '2rem', width: '2rem' }} />}
        title="Verdun Frontend"
        subheader="Cluster statuspage"
        url="https://verdun.patrician.gold"
        metrics={metrics['verdun-frontend']}
      />

      <PodStatus
        icon={<ApolloIcon style={{ height: '2rem', width: '2rem' }} />}
        title="Verdun Api"
        subheader="Cluster status graphql api"
        url="https://verdun.patrician.gold/api"
        metrics={metrics['verdun-api']}
      />

      <PodStatus
        icon={<StakaterIcon style={{ height: '2rem', width: '2rem' }} />}
        title="Ingress Monitor Controller"
        subheader="Create liveness alerts in Uptime Robot"
        url="https://status.patrician.gold"
        metrics={metrics['ingressmonitorcontroller']}
      />
    </Status>
  );
};

export default VerdunStatus;
