import { Configuration } from "./configuration";

const DEFAULT_PATH_PLACEHOLDER: string = "%PATH%";
const DEFAULT_CHIA_LOGS_PATH_UBUNTU: string = "~/.chia/mainnet/log/debug.log";

// ubuntu commands
const SHOW_LOGS_UBUNTU: string = "grep ~/.chia/mainnet/log/debug.log -e harvester";
const WATCH_LOGS_UBUNTU: string = `tail -F ${DEFAULT_PATH_PLACEHOLDER}`;

// windows commands
const SHOW_LOGS_WINDOWS: string = "node --version";

export class Commands {
    // commands per OS
    static WINDOWS_COMMANDS: string[] = []; // static for now, not tested with chia
    static UBUNTU_COMMANDS: string[] = [];

    // Operation System specific config
    public static getCommands(): string[] {
        let operationSystem: string = Configuration.operatingSystem();

        switch (operationSystem) {
            case "windows":
                // TODO: remove, test purpose only
                Commands.WINDOWS_COMMANDS.push("ls");

                if (Configuration.watchLogs()) {
                    Commands.WINDOWS_COMMANDS.push(SHOW_LOGS_WINDOWS);
                }
                
                return  Commands.WINDOWS_COMMANDS;
            case "ubuntu":
            default:
                // TODO: remove, test purpose only
                Commands.UBUNTU_COMMANDS.push("ls");

                if (Configuration.watchLogs()) {
                    if (Configuration.logsPath() != "default") {
                        Commands.UBUNTU_COMMANDS.push(WATCH_LOGS_UBUNTU.replace(DEFAULT_PATH_PLACEHOLDER, Configuration.logsPath));
                    } else {
                        Commands.UBUNTU_COMMANDS.push(WATCH_LOGS_UBUNTU.replace(DEFAULT_PATH_PLACEHOLDER, DEFAULT_CHIA_LOGS_PATH_UBUNTU));
                    }
                } else {
                    Commands.UBUNTU_COMMANDS.push(SHOW_LOGS_UBUNTU);
                }
                return  Commands.UBUNTU_COMMANDS;
        }
    }
}