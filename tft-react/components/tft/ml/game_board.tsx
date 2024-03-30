'use client'
import React, {useEffect, useState} from 'react';
import {DragDropContext, Draggable} from '@hello-pangea/dnd'
import {InsertImage} from "@/components/tft/ml/gameboard_image";
import {GetGameItems, GetGameUnits} from "@/components/django_api";

export function GameBoard() {
    const [units, setUnits] = useState(null)
    const [items, setItems] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const gameUnits = await GetGameUnits()
                setUnits(gameUnits)
                const gameItems = await GetGameItems()
                setItems(gameItems)
            } catch (error) {
                console.error(error);
            }
        };
        fetchData()
            .catch(console.error);
    }, []);

    if (items && units) {
        return (
            <DragDropContext>
                <div className="flex">
                    <div style={{marginRight: 'auto', overflow: 'scroll'}}>
                        {units.map((unit: any[], index: number) => (
                            <Draggable draggableId={unit.name} index={index}>
                                <InsertImage data={unit}/>
                            </Draggable>
                        ))}
                    </div>
                    <div style={{marginLeft: 'auto', overflow: 'scroll'}}>
                        {items.map((item: any[], index: number) => (
                            <div key={index} style={{margin: "auto"}}>
                                <InsertImage data={item}/>
                            </div>
                        ))}
                    </div>
                </div>
            </DragDropContext>
        )
    }
}
