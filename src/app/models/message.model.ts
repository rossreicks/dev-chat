import { IUser } from './Interfaces/IUser.model';
import { User } from './user.model';

export class Message {
    user: IUser;
    data: string;
    timeStamp: Date;

    constructor(user, data, timeStamp) {
        this.user = user;
        this.data = data;
        this.timeStamp = timeStamp;
    }
}
