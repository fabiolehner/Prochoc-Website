export class LoginModel {
    constructor(public email: String, public password: String) { }
}

export class LoginData {
    constructor(public token: String) { }
}

export class RegisterModel {
    constructor(public firstName: string, public lastName: string, public email: string,
        public billingAddress: string, public country: string, public password: string) { }
}
