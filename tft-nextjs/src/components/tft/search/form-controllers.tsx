'use client'

import {Controller} from "react-hook-form";
import {Input} from "@nextui-org/input";
import {Select, SelectItem} from "@nextui-org/select";
import {regions} from "@/app/tft/search/data";

export function PlayerName(control: any) {
    return (
        <Controller
            name="player_name"
            control={control}
            render={({field}) =>
                <Input {...field}
                       type="text"
                       label="Player Name" variant="bordered"
                       placeholder="Enter Player Name"
                       className="max-w-xs"/>}
        />
    )
}

export function PlayerTag(control: any) {
    return (
        <Controller
            name="player_tag"
            control={control}
            render={({field}) =>
                <Input {...field}
                       type="text"
                       label="Player Tag"
                       variant="bordered"
                       placeholder="Enter Player Tag"
                       className="max-w-xs"
                />}
        />
    )
}

export function PlayerRegion(control: any) {
    return (
        <Controller
            name="player_region"
            control={control}
            render={({field}) => (
                <Select
                    {...field}
                    label="Select a region"
                    className="max-w-xs"
                >
                    {regions.map((region) => (
                        <SelectItem key={region.value} value={region.value}>
                            {region.label}
                        </SelectItem>
                    ))}
                </Select>
            )}
        />
    )
}