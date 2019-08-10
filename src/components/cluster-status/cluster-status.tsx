import React from 'react';
import { all } from 'ramda';

import MatrixStatus from './matrix';
import MumbleStatus from './mumble';
import VerdunStatus from './verdun';
import PrometheusStatus from './prometheus';
import MiscStatus from './misc';
import TraefikStatus from './traefik';
import KubedbStatus from './kubedb';
import StashStatus from './stash';
import ConcourseStatus from './concourse';
import HefeteigStatus from './hefeteig';
import { HorizontalBar } from '../shared/bars';
import { ReactComponent as HeartbeatIcon } from '../../images/heartbeat.svg';
import { headerStyles } from './cluster-status.styles';
import { useGetPodStatusQuery, PodStatus } from 'generated/graphql';
import { concat } from 'ramda';

const ClusterStatus = () => {
  const { loading, data, error } = useGetPodStatusQuery({
    variables: { namespaces: concat(appNamespaces, infraNamespaces) }
  });
  const applicationPods =
    data.podStatus &&
    data.podStatus.filter((p) => appNamespaces.includes(p.namespace));
  const infraPods =
    data.podStatus &&
    data.podStatus.filter((p) => infraNamespaces.includes(p.namespace));
  return (
    <>
      <StatusSection
        title="Applications"
        loading={loading}
        error={!!error}
        pods={applicationPods}
      >
        <MatrixStatus />
        <MumbleStatus />
        <HefeteigStatus />
        <MiscStatus />
      </StatusSection>

      <StatusSection
        title="Infrastructure"
        loading={loading}
        pods={infraPods}
        error={!!error}
      >
        <VerdunStatus />
        <PrometheusStatus />
        <TraefikStatus />
        <KubedbStatus />
        <StashStatus />
        <ConcourseStatus />
      </StatusSection>
    </>
  );
};

export default ClusterStatus;

const appNamespaces = ['hefeteig', 'matrix', 'misc', 'murmur'];
const infraNamespaces = ['traefik', 'verdun', 'kubedb'];

type StatusSectionProps = {
  children: React.ReactNode;
  pods: PodStatus[];
  loading: boolean;
  error: boolean;
  title: string;
};
const StatusSection: React.FC<StatusSectionProps> = ({
  children,
  loading,
  pods,
  title
}) => {
  const healthy = loading ? false : isNamespaceHealthy(pods);
  const classes = headerStyles({ healthy });
  return (
    <section className={classes.section}>
      <header className={classes.header}>
        <div className={classes.status}>
          <HeartbeatIcon className={classes.heartbeat} />
        </div>
        <div className={classes.title}>
          <h2>
            {title}
            <HorizontalBar />
          </h2>
        </div>
      </header>
      {children}
    </section>
  );
};

const isNamespaceHealthy = (containerMetrics: PodStatus[]) => {
  return all((m) => m.ready.value === 1, containerMetrics);
};
