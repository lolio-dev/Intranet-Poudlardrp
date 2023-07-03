export const getCurrentQuests = (quests: any[]) => {
  return quests.filter(quest => quest.state === "ACTIVE")
}

export const formatCurrentQuests = (quests: string) => {
  return getCurrentQuests(JSON.parse(quests))
    .map(quest => quest.questId)
    .join(', ')
}

export const formatQuest = (quest: any) => {
  return {
    ...quest,
    realization: !!quest.realization,
    realizable: !!quest.realizable
  }
}