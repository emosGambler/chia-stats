import { CONFIGURATION } from "../config";

export class Configuration {
    public static operatingSystem(): string {
        return CONFIGURATION.operationSystem;
    }

    public static watchLogs(): boolean {
        return CONFIGURATION.logs.watch;
    }

    public static logsPath(): string {
        return CONFIGURATION.logs.path;
    }
}
