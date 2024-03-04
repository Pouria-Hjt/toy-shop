export const UserRoles = {
    User: 1 ,
    Admin: 0
}
export type UserRole = typeof UserRoles[keyof typeof UserRoles];