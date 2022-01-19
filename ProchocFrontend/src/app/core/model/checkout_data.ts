export class PersonalInformation {
    constructor(public firstName: string, public lastName: string, public address: string, public city: string, public state: string, public zipCode: string) { }
}

export class DeliveryInformation {
    constructor(public personalInformation: PersonalInformation) { }
}
