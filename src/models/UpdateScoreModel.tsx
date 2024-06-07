// To parse this data:
//
//   import { Convert, UpdateScoreModel } from "./file";
//
//   const updateScoreModel = Convert.toUpdateScoreModel(json);

export interface UpdateScoreModel {
    PID:   number;
    score: number;
    text:  string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toUpdateScoreModel(json: string): UpdateScoreModel {
        return JSON.parse(json);
    }

    public static updateScoreModelToJson(value: UpdateScoreModel): string {
        return JSON.stringify(value);
    }
}
