import { ActivityType } from "./ActivityType";

export interface Activity {
    activityId: number;
    name: String;
    startDate: Date;
    endDate: Date;
}