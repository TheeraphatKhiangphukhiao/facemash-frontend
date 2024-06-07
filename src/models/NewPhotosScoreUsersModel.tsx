// To parse this data:
//
//   import { Convert, NewPhotosScoreUsersModel } from "./file";
//
//   const newPhotosScoreUsersModel = Convert.toNewPhotosScoreUsersModel(json);

export interface NewPhotosScoreUsersModel {
    updateScore:    UpdateScore[];
    newPhotoRandom: NewPhotoRandom[];
    users:          User[];
}

export interface NewPhotoRandom {
    PID:       number;
    name:      string;
    photo_url: string;
    score:     number;
    UID:       number;
}

export interface UpdateScore {
    PID:   number;
    score: number;
    text:  string;
}

export interface User {
    UID:      number;
    name:     string;
    email:    string;
    password: string;
    image:    string;
    type:     string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toNewPhotosScoreUsersModel(json: string): NewPhotosScoreUsersModel {
        return JSON.parse(json);
    }

    public static newPhotosScoreUsersModelToJson(value: NewPhotosScoreUsersModel): string {
        return JSON.stringify(value);
    }
}
