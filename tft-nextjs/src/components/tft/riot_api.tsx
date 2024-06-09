'use server'
import {FindAccount} from "@/components/tft/django_api"
import { redirect } from 'next/navigation'
import { AccountData } from './types';

export async function GetPUUIDFromAccountNameAndTag(player_name: string, player_tag: string, player_region: string) {
    const riotAPIKey = process.env.TFT_RIOT_API_KEY;
    if (riotAPIKey) {
        const response = await fetch(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${player_name}/${player_tag}`, {
            mode: 'cors', 
            headers: {
                "X-Riot-Token": riotAPIKey,
            },
        });

        if (response.ok) {
            const account_data: AccountData = await response.json();
            const find_player_response = await FindAccount(account_data)
            if (find_player_response === true)
                return ('failed')

            redirect(`/tft/player/${player_region}/${player_name}-${player_tag}`)
        }
        else {
            return ('dne')
        }
    }
    else {
        return ('failed')
    }
}

export async function CheckAccountNameAndTag(player_name: string, player_tag: string) {
    const riotAPIKey = process.env.TFT_RIOT_API_KEY;
    if (riotAPIKey) {
        const response = await fetch(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${player_name}/${player_tag}`, {
            mode: 'cors', 
            headers: {
                "X-Riot-Token": riotAPIKey,
            },
        });
        if (response.ok) {
            const account_data = await response.json();
            return (account_data.puuid)
        }
        else {
            return ('failed')
        }
    }
    else {
        return ('failed')
    }
}