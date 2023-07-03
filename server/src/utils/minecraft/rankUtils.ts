import { MinecraftRanks } from "@types";

export const formatRank = (rank_id: number) => {
  return MinecraftRanks[rank_id]
}