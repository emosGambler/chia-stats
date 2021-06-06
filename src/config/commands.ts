import { Configuration } from "./configuration";

export class Commands {
    public static getCommands(): string[] {
        // Operation System specific config
        let operationSystem: string = Configuration.getOs().toString();

        switch (operationSystem) {
            case "windows":
                return ["ls", "node --version"];
            case "ubuntu":
            default:
                return ["ls", "sensors"];
        }
    }
}