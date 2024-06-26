'use client'
import { useEffect, useState } from "react";
import {Select, SelectItem} from "@nextui-org/select";
import {Tabs, Tab} from "@nextui-org/tabs";
import { DatabaseTableAugments, DatabaseTableTraits, DatabaseTableUnits, DatabaseTableItems } from "@/components/tft/database/database-table";
import { Spacer } from "@nextui-org/spacer";

type Key = string | number;

export default function DatabaseSelect({setData, patchData}: {setData: any, patchData: any}) {
    const [currentPatch, setCurrentPatch] = useState<string | undefined>(undefined);
    const [currentSet, setCurrentSet] = useState<string | undefined>(undefined);
    const [filteredPatches, setFilteredPatches] = useState<any[]>([]);
    const [currentTab, setCurrentTab] = useState<string>("augments");


    useEffect(() => {
        // Filter patches based on the selected set and reset the current patch
        if (currentSet) {
            const filtered = patchData.filter((patch: any) => patch.set_id_id === parseFloat(currentSet));
            setFilteredPatches(filtered);
        } else {
            setFilteredPatches([]);
        }
        setCurrentPatch(undefined); // Reset the current patch when the set changes
    }, [currentSet, patchData]);

    const handleTabChange = (key: Key) => {
        setCurrentTab(key as string);
    };

    return (
        <div className="flex flex-col gap-2 w-full max-w-8xl mx-auto text-center">
            <div className="flex justify-center items-center gap-2.5">
                <Select
                label="Select Set"
                variant="underlined"
                className="max-w-xs" 
                onChange={(e) => setCurrentSet(e.target.value)}
                selectedKeys={currentSet ? [currentSet] : []}
            >
                {setData.map((set: any) => (
                    <SelectItem key={set.game_id} textValue={`Set ${set.game_id}: ${set.set_name}`}>
                        Set {set.game_id}: {set.set_name}
                    </SelectItem>
                ))}
                </Select>
                <Select 
                    label="Select a patch" 
                    variant="underlined"
                    className="max-w-xs" 
                    onChange={(e) => setCurrentPatch(e.target.value)}
                    selectedKeys={currentPatch ? [currentPatch] : []}
                >
                    {filteredPatches.map((patch: any) => (
                    <SelectItem key={patch.patch_id} textValue={patch.patch_id}>
                        Patch {patch.patch_id}
                    </SelectItem>
                    ))}
                </Select>
            </div>
            <Spacer y={1}/>
            <Tabs 
                aria-label="Options" 
                radius='sm' 
                variant="underlined" 
                color="primary"
                selectedKey={currentTab}
                onSelectionChange={handleTabChange}
                className="flex justify-center"
            >
                <Tab key="augments" title="Augments">
                    <DatabaseTableAugments patch={currentPatch}/>
                </Tab>
                <Tab key="items" title="Items">
                    <DatabaseTableItems patch={currentPatch}/>
                </Tab>
                <Tab key="traits" title="Traits">
                    <DatabaseTableTraits patch={currentPatch}/>
                </Tab>
                <Tab key="units" title="Units">
                    <DatabaseTableUnits patch={currentPatch}/>
                </Tab>
            </Tabs>
        </div>
    )
}