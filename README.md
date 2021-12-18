<h1 align="center">Tourneys Bot</h1>
<p align="center">
    <img alt="tourneys" src="assets/banner.png"><br>
    <img alt="GitHub last commit" align="center" src="https://img.shields.io/github/last-commit/existential-nonce/tourneys-bot">
    <img alt="GitHub code size in bytes" align="center" src="https://img.shields.io/github/languages/code-size/existential-nonce/tourneys-bot">
    <a href="https://www.codefactor.io/repository/github/existential-nonce/tourneys-bot"><img alt="codefactor" align="center" src="https://www.codefactor.io/repository/github/existential-nonce/tourneys-bot/badge?s=21c9d17dad3405b1a8947910ddd6fe5a3dfab838"></a>
    <a href="https://actions-badge.atrox.dev/atrox/sync-dotenv/goto"><img alt="github actions" align="center" src="https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fatrox%2Fsync-dotenv%2Fbadge"></a>
    <img src="https://discordapp.com/api/guilds/688510763387715649/widget.png?style=shield" align="center" alt="Discord Shield"/>
    <a href="https://GitHub.com/Existential-nonce/Tourneys-bot/graphs/commit-activity">
    <img alt="maintainance" align="center" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg"></a>
    <img alt="docker pulls" align="center" src="https://img.shields.io/docker/pulls/nonce1/tourneys-bot">
    <img alt="docker size" align="center" src="https://img.shields.io/docker/image-size/nonce1/tourneys-bot/latest">
    <a href="https://GitHub.com/Existential-nonce/Tourneys-bot">
    <img alt="release" align="center" src="https://img.shields.io/github/release/Existential-nonce/Tourneys-bot"></a>
    <img alt="GitHub" align="center" src="https://img.shields.io/github/license/existential-nonce/tourneys-bot">
    <br>
</p>
<p align="center"> A TypeScript bot for the Tourneys server </p>

- - -

## General Commands
| Command | Description | Alias(es) |
|---|---|---|
| `;announce <general/secret> <message>` | This will announce/send a message to the selected channel | say |
| `;help` | This will display all the commands ||
| `;links` | This will send all the relevant links of the server | link |
| `;ping` | Just a simple ping command ||
| `;send <id> <message>` | This will send a DM message to the inputted user id | say |
| `;snipe` | This will snipe the most recently deleted message in chat ||

- - -

## Utility Commands
| Command | Description | Alias(es) |
|---|---|---|
| `;members` | This will display the member count of the server | membercount, member |
| `;bot-info` | This will display the bot's information | botinfo, bot |
| `;server-info` | This will display the server's information, such as the creation date, channel count, etc... | serverinfo, server |
| `;update` | This will display the bot's latest release and show what has been updated | releases |

- - -

## Assassin Commands
| Command | Description | Alias(es) |
|---|---|---|
| `;members` | This will do a coinflip and output either Heads or Tails | coin, flip, coin-flip, cf |
| `;vipservers` | This will display the available vip server links | VIP, server, VIP-servers, VIP-server, VIPserver, servers, jxemo, chicken, cobra, dillon |

- - -

## Administrator commands
| Command | Description | Alias(es) |
|---|---|---|
| `;clear-console` | This will clear the bot's console. Used if there are too many log messages | console-clear |
| `;kill <local/serverside>` | This will terminate the bot process | terminate, abort, shutdown |
| `;reload` | This will refresh all the `.ts` files in the src directory and reconfigure the bot to default presence settings. | refresh, reboot |
| `;status <status>` | This will set the bot's activity status to the argument that's given |

- - -

## Update log

### `v1.0`
- Added core functionality
- Added basic general and admin commands

### `v2.0`
- Added deployment workflows
- Added github container registry to the bot repository
- Added Dockerfile for heroku to host
- Added catch net for each command if error occurs
- Added/Updated the following commands:
    - `bot-info`
    - `help`
    - `send`
    - `server-info`
- Added new command categoty section called "assassin"
- Udated and improved admin-only commands
- Updated `README.md` for better documentation
- Added useful development environment stuff such as makefiles
- Added a few other stuff for better collaboration

    ##### `v2.1`
    - Added anti-raid feature
    - Added anti-alt feature
    - Added the `announce` and `update` commands
    - Added the `Utility` section of commands
    - Added new client events in `index.ts`
    - Finished the `server-info` command

    ##### `v2.2`
    - Added snipe command
    - Made the announce command public
    - Created channel shortcuts for the announce command
    - Fixed announce command bug
    - Patched bypassing for the announce command
    - Corrected some typos in the documentation
    - Added coinflip command

    ##### `v2.3`
    - Added `;editsnipe`, `;assassinlinks`, `;suggest` and `;eval` commands
    - Added the "no log" feature so no commands will be logged if you execute either the `;send` or `;announce` command in secret general
    - Patch the bot from being in the snipe command output
    - Patched the `;announce` vulnerability where it doesn't replace pings for the second message argument
    - Patched bypassing for the snipe command (sad af)
    - Patched the `;send` bug where it would break the whole bot if the user ID didn't exist               
    - Fixed `;kill` command

- - -

## To do list / Ideas
- [ ] Add a powershell script as a makefile
- [ ] Add feature to send images or files with the `;send` command
- [x] Add a snipe command
- [ ] Figure out a way to make Diff files and add one to the repository
- [x] Finish the server info command
- [ ] Maybe add music features idk
- [ ] Figure out a way to SSH into heroku's dyno terminal
- [ ] Leaderboard of tourneys points
- [x] Auto alt account detector
- [ ] Create help menu for the `;help` command
- [ ] Implement the TeamGenerator bot's functions and replace the existing bot in the server

- - -

## Discord server
<img src="https://discordapp.com/api/guilds/688510763387715649/widget.png?style=banner2" alt="Discord Banner 2"/>
