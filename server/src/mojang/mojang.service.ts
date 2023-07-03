import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { from, map } from 'rxjs';

import { uuidToDashedUUID } from '../utils/minecraft/uuidUtils';

@Injectable()
export class MojangService {
  public decodeUsername(username: string) {
    return from(
      axios.get(`https://api.mojang.com/users/profiles/minecraft/${username}`),
    ).pipe(
      map((res) => {
        const uuid = res.data?.id;
        return { uuid: uuid ? uuidToDashedUUID(uuid) : null };
      }),
    );
  }

  public decodeUUID(uuid: string) {
    return from(
      axios.get(`https://minecraft-api.com/api/pseudo/${uuid}/json`),
    ).pipe(map((res) => ({ nickname: res.data?.pseudo })));
  }
}
