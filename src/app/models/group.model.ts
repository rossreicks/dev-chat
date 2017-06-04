import { IUser, IThread, IGroup } from '../services/models';

export class Group implements IGroup {
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
