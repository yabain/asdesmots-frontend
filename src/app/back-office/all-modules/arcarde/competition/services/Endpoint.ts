export enum EndpointSousCompetion{
        CREATED_NEW_S_C = 'game-competition/', //+{ id arcarde}
        UPDATE_S_C  = 'game-competition/', //+{id game competition},
        WINNINGS_CRITERIAS = 'winner-criteria',
        GAME_LIST_WINNINGS_CRITERIAS = 'winner-criteria/', //+:competitionID
        REMOVE_GAME_CRITERIAS = 'game-competition/remove-criteria',
        APPLY_CRITERIAS_GAME = 'game-competition/apply-criteria',
        COMPETITION_STATE = 'game-competition/state',
        GET_ALL_COMPETITION = 'game-competition/',
        GET_ALL_BY_ARCADE = 'game-competition/by-arcade',
        GET_ALL_BY_COMPETITION = 'game-competition/by-competition',
        GET_ALL_WITH_CHILDREN_BY_ARCADE = 'game-competition/arcade-competition-and-sub-competitions',
        GET_LOCATIONS = 'game-competition/arcade-competition-locations',
        DELETE_COMPETITION = 'game-competition',
        SUBSCRIBE_TO_COMPETITION = 'game-competition/subscribe',
        
}
