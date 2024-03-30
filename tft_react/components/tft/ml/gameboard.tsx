'use server'
import React from "react";
import {GetGameItems, GetGameUnits} from "@/components/django_api";
import {InsertImage} from "@/components/tft/ml/gameboard_image";
import {GameBoard} from "@/components/tft/ml/game_board";
import {DragDropContext} from "react-beautiful-dnd";


export default async function MLForm() {
    // const gameUnits = await GetGameUnits()
    // const gameItems = await GetGameItems()
    return (
        <div>
            <GameBoard/>
        </div>
    )
}

// function GameCharacters () {
//     return (
//         <div style={{display: "flex", flexDirection: "row", marginLeft: 'auto'}}>
//             {data.data.map((trait: any[], index: number) => (
//                 <div key={index} style={{margin: "auto", marginRight: "10px"}}>
//                     <div className="flex items-center space-x-1">
//                     </div>
//                 </div>
//             ))}
//         </div>
//     )
// }
