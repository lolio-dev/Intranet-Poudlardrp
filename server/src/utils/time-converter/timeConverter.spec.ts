import { isTimestampInADay } from "./timeConverter"

describe("Time Converter", () => {
  describe("isTimestampInADay", () => {
    it("Should return true with the same day", () => {
      expect(isTimestampInADay(1671127630442, 1671127630442)).toBeTruthy()
    })

    it("Should return false with different days", () => {
      expect(isTimestampInADay(1671127630442, 1671127690442)).toBeTruthy()
    })
  })
})