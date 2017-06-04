import { IUser } from './Interfaces/IUser.model';
import { IThread } from './Interfaces/IThread.model';

export class Group {
    name: String;
    id: number;
    ownerId: number;
    users: IUser[];
    threads: IThread[];
    description: String;

    constructor(name, ownerId, description) {
        this.name = name;
        this.ownerId = ownerId;
        this.description = description;
    }
}
