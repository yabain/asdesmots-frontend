export class SousCompetion{
        constructor(
            public id?: any,
            public name?: any,
            public description?: any,
            public level?: any,
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
            public gameWinnerCriterias?: any[],
            public gameJudgesID?: any[],
            public gameParts?: any[]
        ){}
}