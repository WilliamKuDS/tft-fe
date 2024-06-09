'use client'
import React from 'react';
import { Image } from '@nextui-org/image';
import { Tooltip } from '@nextui-org/tooltip'

export default function ItemCard(items: any) {
    return (
        <Tooltip content={items.items.display_name}>
            <Image
                width={100}
                height={100}
                alt={items.items.display_name}
                src={items.items.icon}
            />
        </Tooltip>
    );
};
