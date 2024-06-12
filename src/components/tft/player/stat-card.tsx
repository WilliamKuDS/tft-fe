'use client'
import React from 'react';
import { Card, CardBody } from '@nextui-org/card';
import { Chip } from '@nextui-org/chip'

export function StatCard(playerStats: any) {
    return (
            <Card isBlurred>
            <CardBody>
                <div style={{ display: "flex", flexDirection: "row", margin: "auto", justifyContent: "space-around", width: "100%" }}>
                    <p style={{ flexGrow: 1, textAlign: "center" }}>Level: {playerStats.playerStats.level}</p>
                    <p style={{ flexGrow: 1, textAlign: "center" }}>Wins: {playerStats.playerStats.wins}</p>
                    <p style={{ flexGrow: 1, textAlign: "center" }}>Losses: {playerStats.playerStats.losses}</p>
                </div>
                {/* <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
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
                </div> */}
            </CardBody>
        </Card>
    );
};
