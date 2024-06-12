'use client'
import React from 'react';
import { Image } from '@nextui-org/image';
import { Tooltip } from '@nextui-org/tooltip'

export default function UnitCard(unit: any) {
    return (
        <Tooltip content={unit.unit.display_name}>
            <Image
                width={100}
                height={100}
                alt={unit.unit.display_name}
                src={unit.unit.icon}
            />
        </Tooltip>
    );
};
