import { IUser } from './IUser.model';

export interface IMessage {
    user: IUser;
    data: string;
    timeStamp: Date;
}
