import React from 'react';
import { ReactComponent as StashIcon } from '../../images/stash.svg';
import PodStatus from './pod-status';
import Status from './status';
import { useGetPodStatusQuery } from 'generated/graphql';
import { normalizePodStatus } from './utils';

const StashStatus = () => {
  const {
    loading,
    error,
    data: { podStatus = [] } = {}
  } = useGetPodStatusQuery({
    variables: { namespaces: ['stash'] }
  });
  const metrics = normalizePodStatus(podStatus);
  return (
    <Status
      title="Stash"
      icon={<StashIcon style={{ height: '2rem', width: '6rem' }} />}
      {...{ loading, error, podStatus }}
    >
      <PodStatus
        icon={<StashIcon style={{ height: '2rem', width: '2rem' }} />}
        title="Stash Operator"
        subheader="Restic backup operator"
        metrics={metrics['stash']}
      />
    </Status>
  );
};

export default StashStatus;
