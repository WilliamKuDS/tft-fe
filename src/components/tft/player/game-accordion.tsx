'use client'
import {Accordion, AccordionItem} from "@nextui-org/accordion";
import {GameCard} from "@/components/tft/player/game-card";
import React from "react";
import {Image} from "@nextui-org/image";
import {Divider} from "@nextui-org/divider";

type GameData = {
    companion_icon: string;
    game_creation: string;
    lobby_rank: number | null;
    match_id: string;
    patch: string;
    placement: number;
    puuid: string;
    queue: string;
    date: string;
}

interface GameAccordionProps {
    gameData: GameData;
}


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

export function GameAccordion({gameData}: GameAccordionProps) {
    return (
        <Accordion>
            <AccordionItem
                aria-label="GameAccordian"
                startContent={
                    <div className="flex h-10 items-center space-x-4">
                        <div>
                            <p className="text-xl text-gray-900 dark:text-white">
                                {gameData.placement}
                                {ordinal_suffix_of(gameData.placement)}
                            </p>
                            <p>
                                place
                            </p>
                        </div>
                        <Divider orientation='vertical'/>
                        <div>
                            <Image 
                            src={`/tft/companion/${gameData.companion_icon}`}
                            alt="CompanionIcon"
                            className="rounded-full w-12 h-12 object-cover" 
                            />
                        </div>
                    </div>
                }
                title={
                    <div className="flex">
                        <div style={{marginRight: "auto"}}>
                            {gameData.queue}
                        </div>
                        <div style={{marginLeft: "auto"}}>
                            {/* Lobby Rank: {gameData.gameData.lobby_rank} */}
                            {gameData.game_creation}
                        </div>
                    </div>
                }
                subtitle={
                    <div className="flex">
                        <div style={{marginRight: "auto"}}>
                            {gameData.date}
                        </div>
                        <div style={{marginLeft: "auto"}}>
                            Patch: {gameData.patch}
                        </div>
                    </div>
                }
            >
                <GameCard match_id={gameData.match_id} puuid={gameData.puuid}/>
            </AccordionItem>
        </Accordion>
    )
}