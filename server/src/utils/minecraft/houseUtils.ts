import { MinecraftHouses } from "@types";

export const formatHouse = (house_id: number) => {
  if (!house_id) return MinecraftHouses[1];

  return MinecraftHouses[house_id]
}