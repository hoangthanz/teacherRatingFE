export class User {
    index : number | undefined;
    isActive: boolean | undefined;
    activeCode!: string;
    displayName!: string;
    createdDate!: string;
    updatedDate: string | undefined;
    version: number | undefined;
    createdOn: string | undefined;
    claims: any;
    roles: any;
    logins: any;
    tokens: any;
    id: string | undefined;
    userName: string | undefined;
    normalizedUserName: string | undefined;
    email: string | undefined;
    normalizedEmail: string | undefined;
    emailConfirmed: boolean | undefined;
    passwordHash: string | undefined;
    securityStamp: string | undefined;
    concurrencyStamp: string | undefined;
    phoneNumber: string | undefined;
    phoneNumberConfirmed: boolean | undefined;
    twoFactorEnabled: boolean | undefined;
    lockoutEnd: any;
    lockoutEnabled: boolean | undefined;
    accessFailedCount: number | undefined;
}
