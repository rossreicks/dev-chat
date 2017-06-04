import { IUser } from './user.model';
import { IThread } from './thread.model';

export interface IGroup {
    name: String;
    id: number;
    ownerId: number;
    users: IUser[];
    threads: IThread[];
    description: String;
}
