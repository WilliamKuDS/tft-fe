'use client'

import { useState, useMemo } from 'react';
import { Input } from '@nextui-org/input';
import { Select, SelectItem } from '@nextui-org/select'
import { Spacer } from '@nextui-org/spacer'
import { SearchButton } from '@/components/tft/buttons';
import {regions} from "@/app/tft/search/data";
import { get_puuid_from_account_name_tag } from "@/components/tft/riot_api"

export default function SearchPlayerForm() {
    const [gameName, setGameName] = useState('');
    const [tagline, setTagline] = useState('');
    const [region, setRegion] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const validateGameName = (value: string) => /^[a-zA-Z0-9]{3,16}$/.test(value);
    const validateTagline = (value: string) => /^[a-zA-Z0-9]{3,5}$/.test(value);

    const isGameNameInvalid = useMemo(() => {
        if (gameName === '') return false;
        return !validateGameName(gameName);
    }, [gameName]);

    const isTaglineInvalid = useMemo(() => {
        if (tagline === '') return false;
        return !validateTagline(tagline);
    }, [tagline]);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()

        if (isGameNameInvalid || isTaglineInvalid || gameName === '' || tagline === '' || region === '') {
            setErrorMessage("Please fill out all the fields");
            return;
        }
        // // Proceed with form submission
        setErrorMessage(''); // Clear the error message if validation passes
        const response = await get_puuid_from_account_name_tag(gameName, tagline, region)

        if (response === 'dne') {
            setErrorMessage('Player does not exist');
            return;
        }
        else if (response == 'failed') {
            setErrorMessage('Server Error. Please try again');
            return;    
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '30px auto', padding: '10px' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Input
                        label="Player Name"
                        //placeholder="Chaonix"
                        value={gameName}
                        onChange={(e) => setGameName(e.target.value)}
                        isInvalid={isGameNameInvalid}
                        color={isGameNameInvalid ? "danger" : "default"}
                        errorMessage={isGameNameInvalid ? "Invalid Name" : ""}
                        variant="underlined"
                    />
                    <Input
                        label="Player Tag"
                        //placeholder="NA1"
                        value={tagline}
                        onChange={(e) => setTagline(e.target.value)}
                        isInvalid={isTaglineInvalid}
                        color={isTaglineInvalid ? "danger" : "default"}
                        errorMessage={isTaglineInvalid ? "Invalid Tag" : ""}
                        variant="underlined"
                    />
                    <Select
                        label="Player Region"
                        //placeholder="NA"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        variant="underlined"
                    >
                        {regions.map((region) => (
                            <SelectItem key={region.value} value={region.value}>
                                {region.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                <Spacer y={1}/>
            <div className='inline'>
                    <SearchButton/>
                    <Spacer y={3}/>
                    {errorMessage && <div className="text-danger-400 mt-2">{errorMessage}</div>}
            </div>
            </form>
        </div>
    );
};