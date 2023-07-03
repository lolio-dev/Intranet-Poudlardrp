import { v4 } from 'uuid';

import { Response, Request } from '@types';

import { FutureRequest } from '../rabbit/rabbit.service';

const requests = new Map();

export const consumeResponse = (response: Response) => {
  const futurRequest: FutureRequest = requests.get(response.uuid_request);
  if (futurRequest && futurRequest.responseCallback) {
    futurRequest.responseCallback(response);
  }
};

export const storeRequest = (request: Request): FutureRequest => {
  if (!request.uuid_request) {
    request.uuid_request = v4();
  }
  const futurRequest = new FutureRequest();
  requests.set(request.uuid_request, futurRequest);
  return futurRequest;
};
