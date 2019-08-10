import React from 'react';
import { ReactComponent as TraefikIcon } from '../../images/traefik.svg';
import { ReactComponent as OAuthIcon } from '../../images/oauth.svg';
import PodStatus from './pod-status';
import Status from './status';
import { useGetPodStatusQuery } from 'generated/graphql';
import { normalizePodStatus } from './utils';

const TraefikStatus = () => {
  const {
    loading,
    error,
    data: { podStatus = [] } = {}
  } = useGetPodStatusQuery({
    variables: { namespaces: ['traefik'] }
  });
  const metrics = normalizePodStatus(podStatus);
  return (
    <Status
      title="Traefik"
      icon={<TraefikIcon style={{ height: '2rem', width: '6rem' }} />}
      {...{ loading, error, podStatus }}
    >
      <PodStatus
        icon={<TraefikIcon style={{ height: '2rem', width: '2rem' }} />}
        title="Traefik"
        subheader="Traefik Edge Router"
        url="https://traefik.patrician.gold"
        metrics={metrics['traefik']}
      />

      <PodStatus
        icon={<OAuthIcon style={{ height: '2rem', width: '2rem' }} />}
        title="OAuth2 Proxy"
        subheader="Authenticating Reverse Proxy"
        metrics={metrics['auth-proxy']}
      />
    </Status>
  );
};

export default TraefikStatus;
