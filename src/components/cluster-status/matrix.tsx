import React from 'react';

import { ReactComponent as MatrixIcon } from '../../images/matrix.svg';
import { ReactComponent as MatrixRiotIcon } from '../../images/matrix-riot.svg';
import { ReactComponent as PostgresIcon } from '../../images/postgres.svg';
import PodStatus from './pod-status';
import Status from './status';
import { useGetPodStatusQuery } from 'generated/graphql';
import { normalizePodStatus } from './utils';

const MatrixStatus = () => {
  const {
    loading,
    error,
    data: { podStatus = [] } = {}
  } = useGetPodStatusQuery({ variables: { namespaces: ['matrix'] } });
  const metrics = normalizePodStatus(podStatus);
  return (
    <Status
      title="Matrix"
      icon={<MatrixIcon style={{ height: '2rem', width: '6rem' }} />}
      {...{ loading, error, podStatus }}
    >
      {!loading && (
        <>
          <PodStatus
            icon={<MatrixIcon style={{ height: '2rem', width: '2rem' }} />}
            title="Synapse"
            subheader="Matrix Homeserver"
            url="https://matrix.patrician.gold"
            metrics={metrics['matrix-synapse']}
          />
          <PodStatus
            icon={<MatrixRiotIcon style={{ height: '2rem', width: '2rem' }} />}
            title="Riot"
            subheader="Matrix Webclient"
            url="https://riot.patrician.gold"
            metrics={metrics['matrix-riot']}
          />

          <PodStatus
            icon={<PostgresIcon style={{ height: '2rem', width: '2rem' }} />}
            title="PostgreSQL Synapse"
            subheader="Database for Synapse"
            metrics={metrics['matrix-synapse-postgres-0']}
          />
        </>
      )}
    </Status>
  );
};

export default MatrixStatus;
