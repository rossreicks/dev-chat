import { IUser, IThread, ITeam } from '../services/models';

export class Team implements ITeam  {
    name: string;
    id: number;
    owner: IUser;
    users: IUser[];
    threads: IThread[];
    description: string;

    constructor(name: string, owner: IUser, description: string) {
        this.name = name;
        this.owner = owner;
        this.description = description;
    }
}
