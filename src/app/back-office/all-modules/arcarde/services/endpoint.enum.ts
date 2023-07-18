export enum Endpoint{
        LOAD_ARCARDE_LIST = 'game-arcarde/', //logged in user arcarde
        GET_ACARDE_BY_ID = 'game-arcarde/', //+{id arcarde}
        ADD_USER_TO_ARCARDE = 'game-arcarde/subscription',
        GET_LIST_ARCARDE = 'game-arcarde/', //complete with -1/-1 to get the global list
        CREATE_ARCARDE = 'game-arcarde',
}