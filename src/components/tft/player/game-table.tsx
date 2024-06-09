'use client'
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/table";
import React from "react";
import {GameAccordion} from "@/components/tft/player/game-accordion";


export function GameTable(params: any) {
    const matches = params.params

    return (
        <Table hideHeader removeWrapper isCompact layout='fixed' aria-label="GameTable">
            <TableHeader>
                <TableColumn>Games</TableColumn>
            </TableHeader>
            <TableBody items={matches} emptyContent={"No games to display."}>
                {(item: any) => (
                    <TableRow key={item.match_id}>
                        <TableCell>
                            <GameAccordion gameData={item}/>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}