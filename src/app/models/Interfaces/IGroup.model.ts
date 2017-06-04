import { IUser } from './IUser.model';
import { IThread } from './IThread.model';

export interface IGroup {
    name: String;
    id: number;
    ownerId: number;
    users: IUser[];
    threads: IThread[];
    description: String;
}
