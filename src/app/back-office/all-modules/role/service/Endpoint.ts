export enum EndpointRole{
        GET_LIST_ROLE = 'roles',
        GET_LIST_PERMISSION = 'perms/',
        CREATE_ROLE = 'roles',
        DELETE_ROLE = 'roles/',//+idRole,
        GET_USERS_ROLE = 'roles/', //+:roleID/users
        GET_ROLE_OF_USER = 'roles/user/', //+id
        PERMISSION_LIST = 'perms/',
        ADD_PERMISSION_ROLE = 'roles/add-perm',
        REMOVE_ROLE = 'roles/remove-user',
        REMOVE_ROLE_PERMISSION = 'roles/remove-perm',
        ADD_ROLE_ON_USER = 'roles/add-user', 

}