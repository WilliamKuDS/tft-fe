'use client'
import React from 'react';
import { Card, CardBody } from '@nextui-org/card';
import { Chip } from '@nextui-org/chip'

export function StatCard(playerStats: any) {
    return (
            <Card
            isBlurred
            >
            <CardBody>
                Level: {playerStats.playerStats.level}
                Wins: {playerStats.playerStats.wins}
                Losses: {playerStats.playerStats.losses}
                Last Updated: {new Date(playerStats.playerStats.last_updated).toLocaleString()}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {playerStats.playerStats.fresh_blood && (
                <Chip color="primary">Fresh Blood</Chip>
            )}
            {playerStats.playerStats.hot_streak && (
                <Chip color="danger">Hot Streak</Chip>
            )}
            {playerStats.playerStats.inactive && (
                <Chip color="warning">Inactive</Chip>
            )}
            {playerStats.playerStats.veteran && (
                <Chip color="primary">Veteran</Chip>
            )}
            </div>
            </CardBody>
            </Card>
        );
};
