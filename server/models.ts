export interface Team {
    id: number;
    name: string;
    ownerId: number;
    owner: User;
    description: string;
    threads: Thread[];
}

export interface User {
    id: number;
    email: string;
    nickname: string;
    icon: string;
}

export interface Thread {
    id: number;
    messages: Message[];
    name: string;
    teamId: number;
    users: User[];
    description: string;
}

export interface Message {
    id: number;
    data: string;
    timestamp: Date;
    user: User;
    threadId: number;
}

export interface TeamCreate {
    email: string;
    password: string;
    team: string;
    description: string;
    nickname: string;
    icon: string;
}
