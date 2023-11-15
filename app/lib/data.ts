import { Roles, Habits, Initiatives } from "./starter-build";

export const fetchRoleByName = (name:string) => {
    const Role = Roles.filter((role) => role.name == name)
    return Role[0]
}

export const fetchRoleData = (role_id: string) => {
    const habits = Habits.filter((habit) => habit.role_id == role_id)
    const initiatives = Initiatives.filter((init) => init.role_id == role_id)
    return {
        habits,
        initiatives
    }
}