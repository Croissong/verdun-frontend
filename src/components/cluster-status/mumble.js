import React from 'react';
import MumbleIcon from '../../images/mumble.svg';
import MysqlIcon from '../../images/mysql.svg';
import PodStatus from './pod-status';
import Status from './status';
import { get } from 'lodash';

const MumbleStatus = ({ loading, metrics }) => (
  <Status
    title="Murmur"
    loading={loading}
    icon={<MumbleIcon style={{ height: '2rem', width: '6rem' }} />}
  >
    <PodStatus
      icon={<MumbleIcon style={{ height: '2rem', width: '2rem' }} />}
      title="Murmur"
      subheader="Mumble Server"
      metrics={get(metrics, 'murmur')}
    />

    <PodStatus
      icon={<MysqlIcon style={{ height: '2rem', width: '2rem' }} />}
      title="MysqlQL Murmur"
      subheader="Database for Murmur"
      metrics={get(metrics, 'murmur-mysql-0')}
    />
  </Status>
);

export default MumbleStatus;
