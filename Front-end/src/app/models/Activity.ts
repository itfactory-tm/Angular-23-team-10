import { ActivityType } from "./ActivityType";

export interface Activity {
    tripActivityId: number;
    activityId: number;
    tripId: number;
    name: String;
    description: String | null;
    participants: number;
    startDate: Date;
    endDate: Date;
    activity: ActivityType;
}