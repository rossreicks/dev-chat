import { IUser } from './Interfaces/IUser.model';
import { IMessage } from './Interfaces/IMessage.model';

export class Thread {
    name: string;
    description: string;
    users?: IUser[];
    messages?: IMessage[];
    _id?: string;

    constructor(name, description) {
        this.name = name;
        this.description = description;
    }
}
