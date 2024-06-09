'use server'
import {title, subtitle} from "@/components/primitives";
import {Spacer} from "@nextui-org/spacer";
import {GameTable} from "@/components/tft/player/game-table";
import {StatCard} from "@/components/tft/player/stat-card"
import {RefreshButton} from "@/components/tft/buttons"
import {GetSummonerDataFromPUUIDRegion, GetMatchDataFromPUUIDRegion} from "@/components/tft/django_api";
import {Divider} from "@nextui-org/divider";
import {Image} from "@nextui-org/image"
import React from "react";
import { CheckAccountNameAndTag } from "@/components/tft/riot_api";
import {regions} from "@/app/tft/search/data";

function capitalizeFirstLetter(text: string) {
if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

async function validateAndSplit(input: string, region: string): Promise<[ gameName: string, tagLine: string, region: string, puuid: string ] | null> {
// Regular expression to match the format "text1-text2"
    const regex = /^[a-zA-Z0-9]{3,16}-[a-zA-Z0-9]{3,5}$/;

    // Test if the input string matches the regex pattern
    if (regex.test(input)) {
        // Split the string into text1 and text2
        const [gameName, tagLine] = input.split('-');

        const puuid = await CheckAccountNameAndTag(gameName, tagLine)
        if (puuid === 'failed') {
            return null;
        } 
        const isValidRegion = regions.some(reg => reg.value === region);

        return [gameName, tagLine, region, puuid];
    }
        // Return null if the string does not match the pattern
        return null;
}

function PlayerIcon(playerData: any) {
    if (Object.values(playerData.playerData).length !== 0)
        return (
            <Image 
                width={90}
                src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${playerData.playerData.icon}.jpg`}
            />
        )
    return null;
}

function PlayerRankData(playerData: any) {
    if (Object.values(playerData.playerData).length !== 0)
        return (
            <h1 className={subtitle({color: "yellow"})}>{capitalizeFirstLetter(playerData.playerData.tier)} {playerData.playerData.rank} {playerData.playerData.league_points} LP</h1>
        )
    return null;
}

function PlayerStatCard(playerData: any) {
    if (Object.values(playerData.playerData).length !== 0)
        return (
            <StatCard playerStats={playerData.playerData}/>
        )
    return null;
}


export default async function Home(params: any) {
    const playerInfo = params.params
    const accountData = await validateAndSplit(playerInfo.playername, playerInfo.region)
    if (accountData === null)
    return (
        <div>
            <h1 className={title({color: "violet"})}>Error 404: Player not found</h1>
        </div>
    )

    const playerData = await GetSummonerDataFromPUUIDRegion(accountData[3], accountData[2])
    const matchData = await GetMatchDataFromPUUIDRegion(accountData[3], accountData[2])
    console.log(matchData)


    return (
    <div>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <PlayerIcon playerData={playerData}/>
            <Spacer y={3}/>
            <h1 className={title({color: "violet"})}>{accountData[0]}#{accountData[1]}</h1>
            <PlayerRankData playerData={playerData}/>
        </div>
        <Spacer y={5}/>
        <Divider orientation='horizontal'/>
        <Spacer y={5}/>
        <div>
            <RefreshButton params={accountData}/>
            <Spacer y={2}/>
            <PlayerStatCard playerData={playerData}/>
        </div>
        <Spacer y={5}/>
        <Divider orientation='horizontal'/>
        <Spacer y={5}/>
        {/* <GameTable playerGames={promise.gameinfo} playerID={promise.playerID}/> */}
    </div>
    );
}
