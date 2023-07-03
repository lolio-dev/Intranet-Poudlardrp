import { Injectable } from '@nestjs/common';
import { MojangService } from '../../mojang/mojang.service';
import { AllSanctions, Ban, Kick, Mute } from '@types';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SanctionsAdapter {
  constructor(
    private mojangService: MojangService
  ) {
  }

  async changeUUIDsToNicknames(staffUUID, targetUUID) {
    const staff = await lastValueFrom(this.mojangService.decodeUUID(staffUUID));
    const target = await lastValueFrom(this.mojangService.decodeUUID(targetUUID));

    return [target.nickname, staff.nickname];
  }

  async banToFullBan(ban: Ban) {
    const nicknames = await this.changeUUIDsToNicknames(ban.staff, ban.target);

    ban.target = nicknames[0];
    ban.staff = nicknames[1];

    return ban;
  }

  async muteToFullMute(mute: Mute) {
    const nicknames = await this.changeUUIDsToNicknames(mute.staff, mute.target);

    mute.target = nicknames[0]
    mute.staff = nicknames[1]

    return mute
  }

  async kickToFullKick(kick: Kick) {
    const nicknames = await this.changeUUIDsToNicknames(kick.staff, kick.target);

    kick.target = nicknames[0]
    kick.staff = nicknames[1]

    return kick
  }

  async sanctionsToFullSanctions(sanctions: AllSanctions): Promise<AllSanctions> {
    return {
      bans: await Promise.all(sanctions.bans.map((ban: Ban) => this.banToFullBan(ban))),
      mutes: await Promise.all(sanctions.mutes.map((mute: Mute) => this.muteToFullMute(mute))),
      kicks: await Promise.all(sanctions.kicks.map((kick: Kick) => this.kickToFullKick(kick)))
    };
  }
}
