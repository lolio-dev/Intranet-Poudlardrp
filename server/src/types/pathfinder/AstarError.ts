import { Trace } from './Trace';
import { Location } from './Location';

export interface AstarError {
  start: Location;
  end: Location;
  neigbhours: Location[];
  nodes: Location[];
  stackTrace: Trace[];
}
