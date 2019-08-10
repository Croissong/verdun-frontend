import React from 'react';
import { ReactComponent as HefeteigIcon } from '../../images/hefeteig.svg';
import PodStatus from './pod-status';
import Status from './status';
import { useGetPodStatusQuery } from 'generated/graphql';
import { normalizePodStatus } from './utils';

const HefeteigStatus = () => {
  const {
    loading,
    error,
    data: { podStatus = [] } = {}
  } = useGetPodStatusQuery({
    variables: { namespaces: ['hefeteig'] }
  });
  const metrics = normalizePodStatus(podStatus);
  return (
    <Status
      title="Hefeteig"
      icon={<HefeteigIcon style={{ height: '2rem', width: '6rem' }} />}
      {...{ loading, error, podStatus }}
    >
      <PodStatus
        icon={<HefeteigIcon style={{ height: '2rem', width: '2rem' }} />}
        title="Hefeteig App"
        subheader="Glutamatfrei"
        url="https://hefeteig.io"
        metrics={metrics['hefeteig-app']}
      />
    </Status>
  );
};

export default HefeteigStatus;
