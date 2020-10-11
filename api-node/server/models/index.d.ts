export interface Test {
    id?: string;
    name: string;
    code: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface Status {
    status: boolean;
    message: string;
}
