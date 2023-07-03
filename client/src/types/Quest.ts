export interface Quest {
  questId: number,
  stepId: number,
  state: "ACTIVE" | "INACTIVE" | "FINISH",
  realization: boolean,
  realizable: boolean
}