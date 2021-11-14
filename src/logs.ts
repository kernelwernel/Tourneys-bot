export default class LOG_TAGS {
    BLK_BG = "\x1B[48;2;0;0;0m"

    CLT_FG = "\x1B[38;2;114;137;218m"
    //CMD_FG = "\x1B[38;2;66;135;245m"
    CMD_FG = "\x1B[38;2;120;120;120m"

    ERR_FG = "\x1B[38;2;255;0;0m"
    SUC_FG = "\x1B[38;2;0;255;0m"
    REL_FG = "\x1B[38;2;255;158;3m"

    ANSI_TERM = "\x1B[0m"

    SYSTEM_SUCCESS = `[${this.BLK_BG}SYSTEM${this.ANSI_TERM}]::[${this.SUC_FG}${this.BLK_BG}SUCCESS${this.ANSI_TERM}]`
    SYSTEM_RELOADED = `[${this.BLK_BG}SYSTEM${this.ANSI_TERM}]::[${this.SUC_FG}${this.BLK_BG}RELOADED${this.ANSI_TERM}]`
    SYSTEM_RELOADING = `[${this.BLK_BG}SYSTEM${this.ANSI_TERM}]::[${this.REL_FG}${this.BLK_BG}RELOADING...${this.ANSI_TERM}]`
    SYSTEM_ERROR = `[${this.BLK_BG}SYSTEM${this.ANSI_TERM}]::[${this.ERR_FG}${this.BLK_BG}ERROR${this.ANSI_TERM}]`
    SYSTEM_SHUTDOWN = `[${this.BLK_BG}SYSTEM${this.ANSI_TERM}]::[${this.ERR_FG}${this.BLK_BG}SHUTDOWN${this.ANSI_TERM}]`

    CLIENT_DM = `[${this.CLT_FG}${this.BLK_BG}CLIENT${this.ANSI_TERM}]::[${this.CLT_FG}DM${this.ANSI_TERM}]`
    CLIENT_COMMAND = `[${this.CLT_FG}${this.BLK_BG}CLIENT${this.ANSI_TERM}]::[${this.CMD_FG}CMD${this.ANSI_TERM}]`
}