import { IUser, IMessage } from '../services/models';

export class Message implements IMessage {
    timestamp: Date;
    id: number;
    user: IUser;
    data: string;

    constructor(user: IUser, data: string, timestamp: Date) {
        this.user = user;
        this.data = data;
        this.timestamp = timestamp;
    }
}
