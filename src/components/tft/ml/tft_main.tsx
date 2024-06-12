'use client'
import React from 'react';
import HexGrid from '@/components/tft/ml/tft_board';
import UnitList from '@/components/tft/ml/unit_list';
import ItemList from '@/components/tft/ml/item_list';
import {DndContext} from '@dnd-kit/core';

function TFTMain() {
    return (
    <DndContext>
        <UnitList/>
        <HexGrid rows={4} cols={7} size={80} />
        <ItemList/>
    </DndContext>
    )
}