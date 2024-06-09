'use server'
import React from 'react';
import ItemCard from './item_card';
import { GetGameItems } from '@/components/tft/django_api';
import './scroll.css';

export default async function ItemList() {
    const data = await GetGameItems()

    return (
        <div className="scrollable-div">
        {data.map((item: any, index: any) => (
            <ItemCard key={index} items={item}/>
        ))}
        </div>
    );
    };
