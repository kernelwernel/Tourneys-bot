import { TextChannel } from "discord.js"

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
    SYSTEM_SUCCESS: string = `[${BLK_BG}SYSTEM${ANS_TM}]::[${SUC_FG}${BLK_BG}SUCCESS${ANS_TM}]`
    SYSTEM_RELOADED: string  = `[${BLK_BG}SYSTEM${ANS_TM}]::[${SUC_FG}${BLK_BG}RELOADED${ANS_TM}]`
    SYSTEM_RELOADING: string  = `[${BLK_BG}SYSTEM${ANS_TM}]::[${REL_FG}${BLK_BG}RELOADING...${ANS_TM}]`
    SYSTEM_ERROR: string  = `[${BLK_BG}SYSTEM${ANS_TM}]::[${ERR_FG}${BLK_BG}ERROR${ANS_TM}]`
    SYSTEM_SHUTDOWN: string  = `[${BLK_BG}SYSTEM${ANS_TM}]::[${ERR_FG}${BLK_BG}SHUTDOWN${ANS_TM}]`

    // ==== CLIENT ====
    CLIENT_DM: string  = `[${CLT_FG}${BLK_BG}CLIENT${ANS_TM}]::[${CLT_FG}DM${ANS_TM}]`
    CLIENT_COMMAND: string  = `[${CLT_FG}${BLK_BG}CLIENT${ANS_TM}]::[${CMD_FG}CMD${ANS_TM}]`
    CLIENT_INFO: string  = `[${CLT_FG}${BLK_BG}CLIENT${ANS_TM}]::[${INF_FG}INFO${ANS_TM}]`
}