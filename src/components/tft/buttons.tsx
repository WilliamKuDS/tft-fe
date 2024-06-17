'use client'
import React from "react";
import {Button} from "@nextui-org/button";
import { useState } from 'react';
import { UpdatePlayerProfileData } from "./django_api";
import { useRouter } from 'next/navigation'
import { Link } from "@nextui-org/link";

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
    onPress: () => void;
}

export function AnalyzeButton({ onPress, loading }: { onPress: () => void, loading: boolean }) {
    return (
        <Button type="submit" color="danger" onPress={onPress} isLoading={loading} disabled={loading}>
            Overall Analysis
        </Button>
    );
}
export function DisabledAnalyzeButton() {
    return (
        <Button type="submit" color="danger" isDisabled>
            Overall Analysis
        </Button>
    );
}

export function RecommendationButton({ onPress, loading }: { onPress: () => void, loading: boolean }) {
    return (
        <Button type="submit" color="danger" onPress={onPress} isLoading={loading} disabled={loading}>
            Recommendations
        </Button>
    );
}

export function DisabledRecommendationButton() {
    return (
        <Button type="submit" color="danger" isDisabled>
            Recommendations
        </Button>
    );
}

export function MetaButton({ onPress }: OpenAIButtonProps) {
    return (
        <Button type="submit" color="danger" onPress={onPress}>
            Meta Analysis
        </Button>
    );
}

export function HomeButton() {
    return (
        <Link href="/">
            <Button color="default" variant="flat">
                Return Home
            </Button>
        </Link>
    )
}
      

