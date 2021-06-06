import { CONFIGURATION } from "../config";

export class Configuration {
    public static getOs(): string {
        return CONFIGURATION.operationSystem;
    }
}