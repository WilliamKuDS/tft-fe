'use client'

import {Accordion, AccordionItem} from "@nextui-org/accordion";
import {GameCard} from "@/components/tft/player/game-card";
import React from "react";
import {Image} from "@nextui-org/image";
import {Divider} from "@nextui-org/divider";
import {Spacer} from "@nextui-org/spacer";

function ordinal_suffix_of(i: number) {
    let j = i % 10,
        k = i % 100;
    if (j === 1 && k !== 11) {
        return "st";
    }
    if (j === 2 && k !== 12) {
        return "nd";
    }
    if (j === 3 && k !== 13) {
        return "rd";
    }
    return "th";
}

export function GameAccordion(gameData: any) {
    return (
        <Accordion>
            <AccordionItem
                aria-label="GameAccordian"
                startContent={
                    <div className="flex h-10 items-center space-x-4">
                        <div>
                            <p className="text-xl text-gray-900 dark:text-white">
                                {gameData.gameData.placement}
                                {ordinal_suffix_of(gameData.gameData.placement)}
                            </p>
                            <p>
                                place
                            </p>
                        </div>
                        <Divider orientation='vertical'/>
                        <div>
                            <Image 
                            src={`/tft/companion/${gameData.gameData.companion_icon}`}
                            className="rounded-full w-12 h-12 object-cover" 
                            />
                        </div>
                    </div>
                }
                title={
                    <div className="flex">
                        <div style={{marginRight: "auto"}}>
                            {gameData.gameData.queue}
                        </div>
                        <div style={{marginLeft: "auto"}}>
                            {/* Lobby Rank: {gameData.gameData.lobby_rank} */}
                            {gameData.gameData.game_creation}
                        </div>
                    </div>
                }
                subtitle={
                    <div className="flex">
                        <div style={{marginRight: "auto"}}>
                            {gameData.gameData.date}
                        </div>
                        <div style={{marginLeft: "auto"}}>
                            Patch: {gameData.gameData.patch}
                        </div>
                    </div>
                }
            >
                <Divider orientation='horizontal'/>
                <Spacer y={1}/>
                <GameCard match_id={gameData.gameData.match_id} puuid={gameData.gameData.puuid}/>
            </AccordionItem>
        </Accordion>
    )
}