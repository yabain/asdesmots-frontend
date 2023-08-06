export enum EndpointSousCompetion{
        CREATED_NEW_S_C = 'game-competition/', //+{ id arcarde}
        UPDATE_S_C  = 'game-competition/', //+{id game competition},
        WINNINGS_CRITERIAS = 'winner-criteria',
        GAME_LIST_WINNINGS_CRITERIAS = 'winner-criteria/', //+:competitionID
        REMOVE_GAME_CRITERIAS = 'game-competition/remove-criteria',
        ADD_CRITERIAS_GAME = 'game-competition/apply-criteria',
}