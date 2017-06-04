export interface Team {
    id: number,
    name: string,
    owner: User,
    description: string,
    threads: Thread[],
    users: User[]
}

export interface User {
    id: number,
    nickname: string,
    icon: string
}

export interface Thread {
    id: number,
    messages: Message[],
    name: string,
    teamId: number
}

export interface Message {
    id: number,
    data: string,
    timestamp: Date,
    user: User
}

export interface TeamCreate {
    email: string,
    password: string,
    team: string,
    description: string,
    nickname: string,
    icon: string
}