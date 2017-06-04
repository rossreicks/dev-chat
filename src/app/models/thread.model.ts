import { IUser } from './user.model';
import { IMessage } from './message.model';

export interface IThread {
    name: string;
    description: string;
    users?: IUser[];
    messages?: IMessage[];
    _id?: string;
}
