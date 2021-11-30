export class LoginModel {
    constructor(public email: String, public password: String) { }
}

export class LoginData {
    constructor(public token: String) { }
}