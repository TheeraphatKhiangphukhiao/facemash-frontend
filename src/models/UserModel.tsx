// To parse this data:
//
//   import { Convert } from "./file";
//
//   const userModel = Convert.toUserModel(json);

export interface UserModel {
    UID:      number;
    name:     string;
    email:    string;
    password: string;
    image:    string;
    type:     string;
}


// Converts JSON strings to/from your types
export class Convert {
    public static toUserModel(json: string): UserModel[] {
        return JSON.parse(json);
    }

    public static userModelToJson(value: UserModel[]): string {
        return JSON.stringify(value);
    }
}
