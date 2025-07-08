export type TimelineEvent = {
  year: number;
  title: string;
  description: string;
};

export type TimelinePeriod = {
  label: string;
  years: [number, number];
  events: TimelineEvent[];
}; 