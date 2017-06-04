import { IUser } from './IUser.model';
import { IMessage } from './IMessage.model';

export interface IThread {
    name: string;
    description: string;
    users?: IUser[];
    messages?: IMessage[];
    _id?: string;
}
