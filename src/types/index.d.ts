export enum Priority {
    Error,
    Warn,
    Info,
}

export interface Message {
    message: string;
    priority: Priority;
}

export type UniqueMessage = {
    uniqueId: string;
} & Message;
