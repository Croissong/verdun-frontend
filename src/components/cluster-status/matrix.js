import React from 'react';
import MatrixIcon from '../../images/matrix.svg';
import MatrixRiotIcon from '../../images/matrix-riot.svg';
import PostgresIcon from '../../images/postgres.svg';
import PodStatus from './pod-status';
import Status from './status';
import { get } from 'lodash';

const MatrixStatus = ({ loading, metrics }) => (
  <Status
    title="Matrix"
    loading={loading}
    icon={<MatrixIcon style={{ height: '2rem', width: '6rem' }} />}
  >
    <PodStatus
      icon={<MatrixIcon style={{ height: '2rem', width: '2rem' }} />}
      title="Synapse"
      subheader="Matrix Homeserver"
      metrics={get(metrics, 'matrix-synapse')}
    />
    <PodStatus
      icon={<MatrixRiotIcon style={{ height: '2rem', width: '2rem' }} />}
      title="Riot"
      subheader="Matrix Webclient"
      metrics={get(metrics, 'matrix-riot')}
    />

    <PodStatus
      icon={<PostgresIcon style={{ height: '2rem', width: '2rem' }} />}
      title="PostgreSQL Synapse"
      subheader="Database for Synapse"
      metrics={get(metrics, 'matrix-synapse-postgres-0')}
    />
  </Status>
);

export default MatrixStatus;
