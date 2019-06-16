import React from 'react';
import NginxIcon from '../../images/nginx.svg';
import MiscIcon from '../../images/misc.svg';
import PodStatus from './pod-status';
import Status from './status';
import { get } from 'lodash';

const MiscStatus = ({ loading, metrics }) => (
  <Status
    title="Miscellaneous"
    loading={loading}
    icon={<MiscIcon style={{ height: '2rem', width: '6rem' }} />}
  >
    <PodStatus
      icon={<NginxIcon style={{ height: '2rem', width: '2rem' }} />}
      title="Nginx RTMP"
      subheader="RTMP Server"
      metrics={get(metrics, 'nginx-rtmp')}
    />
  </Status>
);

export default MiscStatus;
