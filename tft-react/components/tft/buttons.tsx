'use client'
import React from "react";
import {Button} from "@nextui-org/react";

export function SearchButton() {
    return (
        <Button type="submit" color="primary">
            Search
        </Button>
    );
}

export function QueryButton() {
    return (
        <Button type="query" color="primary">
            Query
        </Button>
    );
}

