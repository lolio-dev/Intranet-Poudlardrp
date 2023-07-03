import { MinecraftBloods } from "@types";

export const formatBlood = (blood: string) => {
  if (!blood) return MinecraftBloods.NOT_DEFINED;

  const key = blood.replace(/"/g, '') as keyof typeof MinecraftBloods;
  return MinecraftBloods[key]
}