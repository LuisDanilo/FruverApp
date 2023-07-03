export class Credentials {
    constructor(
        public username: string,
        public password: string
    ) { }
}

export class UserSession {
    constructor(
        public sessionId: string
    ) { }
}