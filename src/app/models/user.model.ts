import { IUser } from '../services/models';

export class User implements IUser {
    id: number;
    email: string;
    username: string;
    icon: string;

    constructor(username: string, email: string, icon: string) {
        this.username = username;
        this.icon = icon;
    }
}
