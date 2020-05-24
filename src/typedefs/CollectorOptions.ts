export interface MessageCollectorOptions {
  max?: number;
  maxMatches?: number;
  time?: number;
  errors?: Array<CollectorError>;
}

export interface ReactionCollectorOptions extends MessageCollectorOptions {}

export enum CollectorError {
  TIME = 'time',
  MAX = 'max',
}
