import { SessionData } from "express-session";

export interface CustomSessionData extends SessionData {
    source: string;
    userId: string;
}