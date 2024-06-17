'use client'
import React from "react";
import {Button} from "@nextui-org/button";
import { useState } from 'react';
import { UpdatePlayerProfileData } from "./django_api";
import { useRouter } from 'next/navigation'

export function SearchButton() {
    return (
        <Button type="submit" color="primary">
            Search
        </Button>
    );
}

export function QueryButton() {
    return (
        <Button type="submit" color="primary">
            Query
        </Button>
    );
}

export function RefreshButton(params: any) {
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    
    const handleClick = async () => {
        setLoading(true);
        try {
        // Replace this with your async function
        const response = await UpdatePlayerProfileData(params.params[3], params.params[2])
        } catch (error) {
        console.error('Error during async operation:', error);
        } finally {
        setLoading(false);
        router.refresh()
        }
    };
    
    return (
        <Button onPress={handleClick} isLoading={loading} disabled={loading} color='primary'>
        {loading ? 'Refreshing...' : 'Refresh'}
        </Button>
    );
};


interface OpenAIButtonProps {
    onClick: () => void;
}

export function AnalyzeButton({ onClick }: OpenAIButtonProps) {
    return (
        <Button type="submit" color="danger" onClick={onClick}>
            Overall Analysis
        </Button>
    );
}

export function RecommendationButton({ onClick }: OpenAIButtonProps) {
    return (
        <Button type="submit" color="danger" onClick={onClick}>
            Recommendations
        </Button>
    );
}

export function MetaButton({ onClick }: OpenAIButtonProps) {
    return (
        <Button type="submit" color="danger" onClick={onClick}>
            Meta Analysis
        </Button>
    );
}

      

