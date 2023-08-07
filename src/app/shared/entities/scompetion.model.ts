import { WinnigsCriterias } from "./winnigCriterias";

export class SousCompetion{
        constructor(
            public _id?: any,
            public name?: any,
            public description?: any,
            public gameLevel?: any,
            public isSinglePart?: any,
            public canRegisterPlayer?: any,
            public localisation?: any,
            public maxPlayerLife?: any,
            public maxTimeToPlay?: any,
            public startDate?: any,
            public endDate?: any,
            public maxOfWinners?: any,
            public lang?: any,
            public parentCompetition?: any,
            public gameWinnerCriterias?: WinnigsCriterias[],
            public gameJudgesID?: any[],
            public gameParts?: any[]
        ){}
}