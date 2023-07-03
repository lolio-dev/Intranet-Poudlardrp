import { Response, Request } from '@types';

export class UpdateMapRequest implements Request {
  uuid_request: string;

  constructor(
    private slaveName: string,
    private updateAll: boolean,
    private mapsToDownload: string[],
  ) {}
}

export class UpdateMapResponse implements Response {
  uuid_request: string;

  constructor(public error: string | null) {}
}
