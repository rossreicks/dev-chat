import { IUser } from './user.model';

export interface IMessage {
    user: IUser;
    data: string;
    timeStamp: Date;
}
