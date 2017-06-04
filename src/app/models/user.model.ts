export class User {
    username: String;
    email: String;
    password: String;
    icon: String;

    constructor(username: String, email: String, password: String, icon: String) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.icon = icon;
    }
}
