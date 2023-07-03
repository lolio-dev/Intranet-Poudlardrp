import { Injectable } from '@nestjs/common';

import { LevelsEnum } from '@types';

@Injectable()
export class GraylogAdapter {
  levelToCriticityLevel(level: number): string {
    switch (level) {
      case 0:
        return LevelsEnum.emergency;
      case 1:
        return LevelsEnum.alert;
      case 2:
        return LevelsEnum.critical;
      case 3:
        return LevelsEnum.error;
      case 4:
        return LevelsEnum.warning;
      case 5:
        return LevelsEnum.notice;
      case 6:
        return LevelsEnum.info;
      case 7:
        return LevelsEnum.debug;
      default:
        return LevelsEnum.info;
    }
  }
}
