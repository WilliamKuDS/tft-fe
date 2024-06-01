'use client'
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/table";
import React from "react";
import {GameAccordion} from "@/components/tft/player/game-accordion";

export function GameTable(playerGames: any) {
    const playerID = playerGames.playerID
    const games = playerGames.playerGames

    return (
        <Table hideHeader removeWrapper isCompact layout='fixed' aria-label="GameTable">
            <TableHeader>
                <TableColumn>Games</TableColumn>
            </TableHeader>
            <TableBody items={games} emptyContent={"No games to display."}>
                {(item) => (
                    <TableRow key={item.game_id}>
                        <TableCell>
                            <GameAccordion gameData={item} playerID={playerID}/>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}