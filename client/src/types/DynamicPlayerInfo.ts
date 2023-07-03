interface DynamicPlayerInfo {
  blood: string;
  house: string;
  level: string;
  money: {
    noise: number;
    mornille: number;
    gallion: number;
  }
  player: string;
  quest: {
    name: string;
    id: number;
    step: number;
  }
}

export default DynamicPlayerInfo;
