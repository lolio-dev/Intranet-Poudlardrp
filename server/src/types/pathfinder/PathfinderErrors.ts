import { AstarError } from './AstarError';

export interface PathfinderErrors {
  dev: AstarError[],
  prod: AstarError[]
}