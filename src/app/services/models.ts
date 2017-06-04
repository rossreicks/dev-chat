export interface IGroup {
    id: number;
    name: string;
    owner: IUser;
    description: string;
    threads: IThread[];
    users: IUser[];
}

export interface IUser {
    id: number;
    email: string;
    username: string;
    icon: string;
}

export interface IThread {
    id: number;
    messages: IMessage[];
    name: string;
    teamId: number;
}

export interface IMessage {
    id: number;
    data: string;
    timestamp: Date;
    user: IUser;
}

export interface IGroupCreate {
    email: string;
    password: string;
    team: string;
    description: string;
    nickname: string;
    icon: string;
}
