import { formatBlood } from "src/utils/minecraft/bloodsUtils";
import { formatHouse } from "src/utils/minecraft/houseUtils";
import { formatQuest } from "src/utils/minecraft/questUtils";
import { formatRank } from "src/utils/minecraft/rankUtils";

export const toPlayer = (player: any) => {
  const quests = JSON.parse(player.quest_formats);

  return {
    id: player.id,
    uuid: player.uuid,
    name: player.name,
    discord_id: player.discord_id,
    discord_tag: player.discord_tag?.replace(/"/g, ''),
    rank: formatRank(player.rank_id),
    house: formatHouse(player.house_id),
    blood: formatBlood(player.blood),
    quests: {
      actives : quests
        ?.filter(quest => quest.state === "ACTIVE")
        .map(quest => formatQuest(quest)) || [],
      inactives : quests
        ?.filter(quest => quest.state === "INACTIVE")
        .map(quest => formatQuest(quest)) || [],
      finish : quests
        ?.filter(quest => quest.state === "FINISH")
        .map(quest => formatQuest(quest)) || [],
    }
  }
}