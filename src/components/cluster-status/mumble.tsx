import React from 'react';
import { ReactComponent as MumbleIcon } from '../../images/mumble.svg';
import { ReactComponent as MysqlIcon } from '../../images/mysql.svg';
import PodStatus from './pod-status';
import Status from './status';
import { useGetPodStatusQuery } from 'generated/graphql';
import { normalizePodStatus } from './utils';

const MumbleStatus = () => {
  const {
    loading,
    error,
    data: { podStatus = [] } = {}
  } = useGetPodStatusQuery({
    variables: { namespaces: ['murmur'] }
  });
  const metrics = normalizePodStatus(podStatus);
  return (
    <Status
      title="Murmur"
      icon={<MumbleIcon style={{ height: '2rem', width: '6rem' }} />}
      {...{ loading, error, podStatus }}
    >
      <PodStatus
        icon={<MumbleIcon style={{ height: '2rem', width: '2rem' }} />}
        title="Murmur"
        subheader="Mumble Server"
        metrics={metrics['murmur']}
      />

      <PodStatus
        icon={<MysqlIcon style={{ height: '2rem', width: '2rem' }} />}
        title="MysqlQL Murmur"
        subheader="Database for Murmur"
        metrics={metrics['murmur-mysql-0']}
      />
    </Status>
  );
};

export default MumbleStatus;
