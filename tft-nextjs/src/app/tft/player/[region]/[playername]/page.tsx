'use server'
import {title} from "@/components/primitives";
import {Spacer} from "@nextui-org/spacer";
import {GameTable} from "@/components/tft/player/game-table";
import {GetGameInfo, GetPlayerID} from "@/components/tft/django_api";
import {Divider} from "@nextui-org/divider";
import {Image} from "@nextui-org/image"
import React from "react";


export default async function Home(params: any) {
    const playerInfo = params.params
    const promise = await GetGameInfo(playerInfo)
    const player = await GetPlayerID(promise.playerID)

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Image src={player.icon}/>
            </div>
            <Spacer y={5}/>
            <h1 className={title()}>Player:&nbsp;</h1>
            <h1 className={title({color: "violet"})}>{playerInfo.playername}&nbsp;</h1>
            <br/>
            <h1 className={title()}>Rank:&nbsp;</h1>
            <h1 className={title({color: "violet"})}>{player.player_rank}&nbsp;</h1>
            <h1 className={title({color: "yellow"})}>{player.player_lp} LP&nbsp;</h1>
            <Spacer y={10}/>
            <Divider orientation='horizontal'/>
            <Spacer y={10}/>
            <GameTable playerGames={promise.gameinfo} playerID={promise.playerID}/>
        </div>
    );
}
