import React from 'react';
import TraefikIcon from '../../images/traefik.svg';
import OAuthIcon from '../../images/oauth.svg';
import ContainerStatus from './container-status';
import Status from './status';
import { get } from 'lodash';

const TraefikStatus = ({ loading, metrics }) => {
  return (
    <Status
      title="Traefik"
      loading={loading}
      icon={<TraefikIcon style={{ height: '2rem', width: '6rem' }} />}
    >
      <ContainerStatus
        icon={<TraefikIcon style={{ height: '2rem', width: '2rem' }} />}
        title="Traefik"
        subheader="Traefik Edge Router"
        metrics={get(metrics, 'traefik')}
      />

      <ContainerStatus
        icon={<OAuthIcon style={{ height: '2rem', width: '2rem' }} />}
        title="OAuth2 Proxy"
        subheader="Authenticating Reverse Proxy"
        metrics={get(metrics, 'auth-proxy')}
      />
    </Status>
  );
};

export default TraefikStatus;
