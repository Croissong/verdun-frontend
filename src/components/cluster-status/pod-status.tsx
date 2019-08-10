import React from 'react';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { PodStatus, ContainerStatus } from 'generated/graphql';
import Highlight from 'prism-react-renderer';
import Prism from 'prismjs'; // Different source

import { useStyles } from './pod-status.styles';

type ContainerStatusProps = {
  title: string;
  subheader?: string;
  url?: string;
  icon: React.ReactNode;
  metrics: PodStatus;
};
const PodStatusComponent: React.FC<ContainerStatusProps> = ({
  title,
  subheader,
  url,
  icon,
  metrics
}) => {
  const classes = useStyles({});
  const isHealthy = metrics && metrics.ready;
  return (
    <ListItem>
      <Card className={`${classes.card} ${isHealthy ? classes.healthy : ''}`}>
        <Header {...{ icon, title, subheader, url }} />
        {metrics && (
          <Metrics
            containers={metrics.containers}
            initContainers={metrics.initContainers}
          />
        )}
      </Card>
    </ListItem>
  );
};
export default PodStatusComponent;

type HeaderProps = {
  title: string;
  subheader?: string;
  url?: string;
  icon: React.ReactNode;
};
const Header: React.FC<HeaderProps> = ({ icon, title, subheader, url }) => {
  const classes = useStyles({});
  return (
    <div className={classes.header}>
      <CardHeader avatar={icon} title={title} subheader={subheader} />
      <div className={classes.headerRight}>
        {url && (
          <Typography variant="subtitle1">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className={classes.url}
            >
              {url.replace('https://', '')}
            </a>
          </Typography>
        )}
      </div>
    </div>
  );
};

type MetricsProps = {
  containers: ContainerStatus[];
  initContainers: ContainerStatus[];
};
const Metrics: React.FC<MetricsProps> = ({ containers, initContainers }) => {
  return (
    <CardContent>
      {[...initContainers, ...containers].map(({ container, image }) => {
        const code = `Image: ${image}`;
        return (
          <Highlight
            key={container}
            theme={undefined}
            Prism={Prism}
            code={code}
            language="yaml"
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre className={className} style={style}>
                {tokens.map((line, i) => (
                  <div {...getLineProps({ line, key: i })}>
                    {line.map((token, key) => (
                      <span {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        );
      })}
    </CardContent>
  );
};
