export class GamePart{
    constructor(
        public _id?: any,
        public name?: string,
        public description?: string,
        public gameCompetitionID?: any,
        public gameLevel?: any,
        public numberOfWord?: any,
        public maxPlayersNumber?: any,
        public startDate?: any,
        public gameState?: string,
        public endDate?: any  
    ){}
}