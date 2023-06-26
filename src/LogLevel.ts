export const enum LogLevel {
    Silent = 0,
    Error = 1,
    Warn = 1 << 1,
    Info = 1 << 2,
    Debug = 1 << 3,
}