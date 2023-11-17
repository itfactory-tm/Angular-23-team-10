import { Activity } from "./Activity";

export interface Trip {
  name: string;
  startDate: Date;
  endDate: Date;
  picture: string;
  description: string;
  isShared: boolean;
  activities: Activity[];
}
