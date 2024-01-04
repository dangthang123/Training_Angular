export interface IUser {
    id: number;
    name: string;
    email: string;
    sdt: number;
    address: string;
    username: string;
    password: string;
    token?: string;
    role: string;
}