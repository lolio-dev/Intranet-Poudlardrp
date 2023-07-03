import { UseFilters } from '@nestjs/common';
import { QueryFailedFilter } from './query-failed.filter';

export function UseQueryFilter(message: string) {
  return UseFilters(new QueryFailedFilter(message));
}
