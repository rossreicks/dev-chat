import { IUser, IMessage, IThread } from '../services/models';

export class Thread implements IThread {
    id: number;
    teamId: number;
    name: string;
    description: string;
    users?: IUser[];
    messages: IMessage[];
    _id?: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }
}
