import { PodStatus } from 'generated/graphql';

export const normalizePodStatus = (podStatus: PodStatus[]) => {
  return podStatus.reduce(
    (prev, pod) => {
      return { ...prev, [pod.label_app || pod.pod]: pod };
    },
    {} as { [key: string]: PodStatus }
  );
};
