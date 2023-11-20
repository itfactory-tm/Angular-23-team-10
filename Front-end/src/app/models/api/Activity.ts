import { ActivityType } from "./ActivityType";

export interface Activity {
    tripActivityId: number;
    activityId: number;
    tripId: number;
    name: String;
    price: number;
    startDate: Date;
    endDate: Date;
}