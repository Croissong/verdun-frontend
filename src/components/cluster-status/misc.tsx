import React from 'react';
import { ReactComponent as NginxIcon } from '../../images/nginx.svg';
import { ReactComponent as MiscIcon } from '../../images/misc.svg';
import PodStatus from './pod-status';
import Status from './status';
import { useGetPodStatusQuery } from 'generated/graphql';
import { normalizePodStatus } from './utils';

const MiscStatus = () => {
  const {
    loading,
    error,
    data: { podStatus = [] } = {}
  } = useGetPodStatusQuery({
    variables: { namespaces: ['misc'] }
  });
  const metrics = normalizePodStatus(podStatus);
  return (
    <Status
      title="Misc"
      icon={<MiscIcon style={{ height: '2rem', width: '6rem' }} />}
      {...{ loading, error, podStatus }}
    >
      <PodStatus
        icon={<NginxIcon style={{ height: '2rem', width: '2rem' }} />}
        title="Nginx RTMP"
        subheader="RTMP Server"
        metrics={metrics['nginx-rtmp']}
      />
    </Status>
  );
};

export default MiscStatus;
