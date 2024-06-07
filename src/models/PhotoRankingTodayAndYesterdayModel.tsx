// To parse this data:
//
//   import { Convert, PhotoRankingTodayAndYesterdayModel } from "./file";
//
//   const photoRankingTodayAndYesterdayModel = Convert.toPhotoRankingTodayAndYesterdayModel(json);

export interface PhotoRankingTodayAndYesterdayModel {
    ranking_photos_today:               RankingPhotosDay[];
    yesterdayRank_of_photoRankToday:    number[];
    ranking_photos_yesterday:           RankingPhotosDay[];
}

export interface RankingPhotosDay {
    PID:       number;
    name:      string;
    photo_url: string;
    score:     number;
    UID:       number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toPhotoRankingTodayAndYesterdayModel(json: string): PhotoRankingTodayAndYesterdayModel {
        return JSON.parse(json);
    }

    public static photoRankingTodayAndYesterdayModelToJson(value: PhotoRankingTodayAndYesterdayModel): string {
        return JSON.stringify(value);
    }
}
