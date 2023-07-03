import { getCurrentQuests, formatCurrentQuests } from "./questUtils";

describe('Quest utils', () => {

  describe('getCurrentQuests', () => {
    it('sould return the current active quest', () => {
      const oneActiveQuest = [
        {"questId":11000000,"stepId":0,"state":"FINISH","realization":1,"realizable":0},
        {"questId":99999999,"stepId":0,"state":"INACTIVE","realization":1,"realizable":0},
        {"questId":11300013,"stepId":2,"state":"ACTIVE","realization":0,"realizable":1}
      ]
      expect(getCurrentQuests(oneActiveQuest)).toEqual([oneActiveQuest[2]]);
    })
  
    it('sould return null if no active quest', () => {
      const noActiveQuest = [
        {"questId":11000000,"stepId":0,"state":"FINISH","realization":1,"realizable":0},
        {"questId":99999999,"stepId":0,"state":"INACTIVE","realization":1,"realizable":0},
      ]
      expect(getCurrentQuests(noActiveQuest)).toEqual([]);
    })
  
    it('sould return all active quests', () => {
      const twoActiveQuest = [
        {"questId":11000000,"stepId":0,"state":"FINISH","realization":1,"realizable":0},
        {"questId":99999999,"stepId":0,"state":"ACTIVE","realization":1,"realizable":0},
        {"questId":11300013,"stepId":2,"state":"ACTIVE","realization":0,"realizable":1}
      ]
      expect(getCurrentQuests(twoActiveQuest)).toEqual([twoActiveQuest[1], twoActiveQuest[2]]);
    })
  })

  describe('formatCurrentQuests', () => {
    it('sould return the current active quest', () => {
      const oneActiveQuest = [
        {"questId":11000000,"stepId":0,"state":"FINISH","realization":1,"realizable":0},
        {"questId":99999999,"stepId":0,"state":"INACTIVE","realization":1,"realizable":0},
        {"questId":11300013,"stepId":2,"state":"ACTIVE","realization":0,"realizable":1}
      ]
      expect(formatCurrentQuests(JSON.stringify(oneActiveQuest))).toEqual('11300013');
    })
  
    it('sould return null if no active quest', () => {
      const noActiveQuest = [
        {"questId":11000000,"stepId":0,"state":"FINISH","realization":1,"realizable":0},
        {"questId":99999999,"stepId":0,"state":"INACTIVE","realization":1,"realizable":0},
      ]
      expect(formatCurrentQuests(JSON.stringify(noActiveQuest))).toEqual('');
    })
  
    it('sould return all active quests', () => {
      const twoActiveQuest = [
        {"questId":11000000,"stepId":0,"state":"FINISH","realization":1,"realizable":0},
        {"questId":99999999,"stepId":0,"state":"ACTIVE","realization":1,"realizable":0},
        {"questId":11300013,"stepId":2,"state":"ACTIVE","realization":0,"realizable":1}
      ]
      expect(formatCurrentQuests(JSON.stringify(twoActiveQuest))).toEqual('99999999, 11300013');
    })
  })
})