'use server'
import React from 'react';
import UnitCard from './unit_card';
import {GetGameUnits} from '@/components/tft/django_api'
import './scroll.css';

export default async function UnitList() {
    const data = await GetGameUnits()

    return (
        <div className="scrollable-div">
        {data.map((item: any, index: any) => (
            <UnitCard key={index} unit={item}/>
        ))}
        </div>
    );
};
