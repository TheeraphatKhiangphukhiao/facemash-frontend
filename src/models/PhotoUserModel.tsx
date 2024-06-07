// To parse this data:
//
//   import { Convert, PhotoUserModel } from "./file";
//
//   const photoUserModel = Convert.toPhotoUserModel(json);

export interface PhotoUserModel {
    photos: Photo[];
    users:  User[];
}

export interface Photo {
    PID:       number;
    name:      string;
    photo_url: string;
    score:     number;
    UID:       number;
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
    public static toPhotoUserModel(json: string): PhotoUserModel {
        return JSON.parse(json);
    }

    public static photoUserModelToJson(value: PhotoUserModel): string {
        return JSON.stringify(value);
    }
}
