import React from 'react';
import { ReactComponent as ConcourseIcon } from '../../images/concourse.svg';
import { ReactComponent as PostgresIcon } from '../../images/postgres.svg';
import PodStatus from './pod-status';
import Status from './status';
import { useGetPodStatusQuery } from 'generated/graphql';
import { normalizePodStatus } from './utils';

const ConcourseStatus = () => {
  const {
    loading,
    error,
    data: { podStatus = [] } = {}
  } = useGetPodStatusQuery({
    variables: { namespaces: ['concourse'] }
  });
  const metrics = normalizePodStatus(podStatus);
  return (
    <Status
      title="Concourse"
      icon={<ConcourseIcon style={{ height: '2rem', width: '6rem' }} />}
      {...{ loading, error, podStatus }}
    >
      <PodStatus
        icon={<ConcourseIcon style={{ height: '2rem', width: '2rem' }} />}
        title="Concourse"
        subheader="Continuous thing-doer"
        url="https://concourse.patrician.gold"
        metrics={metrics['concourse-web']}
      />

      <PodStatus
        icon={<ConcourseIcon style={{ height: '2rem', width: '2rem' }} />}
        title="Concourse Worker"
        metrics={metrics['concourse-worker']}
      />

      <PodStatus
        icon={<PostgresIcon style={{ height: '2rem', width: '2rem' }} />}
        title="PostgreSQL Concourse"
        subheader="Database for Concourse"
        metrics={metrics['postgresql']}
      />
    </Status>
  );
};

export default ConcourseStatus;
