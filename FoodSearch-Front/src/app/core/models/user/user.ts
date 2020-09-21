export class User {
    private username: string;
    private password: string;
    private lastName: string;
    private firstName: string;

    constructor(username: string, password: string, lastName: string, firstName: string){
        this.username = username;
        this.password = password;
        this.lastName = lastName;
        this.firstName = firstName;
    }
}
