import { SousCompetion } from "./scompetion.model";

export class Arcarde{
        constructor(
            public _id?: any,
            public name?: any,
            public description?: any,
            public isOnlineGame ?: any,
            public canRegisterPlayer?: any,
            public isFreeRegistrationPlayer?: any,
            public maxPlayersNumber?: any,
            public startDate?: any,
            public endDate?: any,
            public startRegistrationDate?: any,
            public endRegistrationDate?: any,
            public gameState?: any,
            public owner?: any,
            public competitionGames?:SousCompetion[],
            public localisation?: any,
        ){

        }
}