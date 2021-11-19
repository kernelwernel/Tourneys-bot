const BLK_BG: string = "\x1B[48;2;0;0;0m"
const CLT_FG: string = "\x1B[38;2;114;137;218m"
const CMD_FG: string = "\x1B[38;2;120;120;120m"
const ERR_FG: string = "\x1B[38;2;255;0;0m"
const SUC_FG: string = "\x1B[38;2;0;255;0m"
const REL_FG: string = "\x1B[38;2;255;158;3m"
const INF_FG: string = "\x1B[38;2;133;180;255m"
const ANS_TM: string = "\x1B[0m"

export default class LOG_TAGS {
    // ==== SYSTEM ====
    SYSTEM_SUCCESS: string = `[\x1B[48;2;0;0;0mSYSTEM\x1B[0m]::[\x1B[38;2;0;255;0m\x1B[48;2;0;0;0mSUCCESS\x1B[0m]`
    SYSTEM_RELOADED: string  = `[\x1B[48;2;0;0;0mSYSTEM\x1B[0m]::[\x1B[38;2;0;255;0m\x1B[48;2;0;0;0mRELOADED\x1B[0m]`
    SYSTEM_RELOADING: string  = `[\x1B[48;2;0;0;0mSYSTEM\x1B[0m]::[\x1B[38;2;255;158;3m\x1B[48;2;0;0;0mRELOADING...\x1B[0m]`
    SYSTEM_ERROR: string  = `[\x1B[48;2;0;0;0mSYSTEM\x1B[0m]::[\x1B[38;2;255;0;0m\x1B[48;2;0;0;0mERROR\x1B[0m]`
    SYSTEM_SHUTDOWN: string  = `[\x1B[48;2;0;0;0mSYSTEM\x1B[0m]::[\x1B[38;2;255;0;0m\x1B[48;2;0;0;0mSHUTDOWN\x1B[0m]`

    // ==== CLIENT ====
    CLIENT_DM: string  = `[\x1B[38;2;114;137;218m\x1B[48;2;0;0;0mCLIENT\x1B[0m]::[\x1B[38;2;114;137;218mDM\x1B[0m]`
    CLIENT_COMMAND: string  = `[\x1B[38;2;114;137;218m\x1B[48;2;0;0;0mCLIENT\x1B[0m]::[\x1B[38;2;120;120;120mCMD\x1B[0m]`
    CLIENT_INFO: string  = `[\x1B[38;2;114;137;218m\x1B[48;2;0;0;0mCLIENT\x1B[0m]::[\x1B[38;2;133;180;255mINFO\x1B[0m]`
}