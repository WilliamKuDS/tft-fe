'use server'
import {GetPlayerByPUUID} from "@/components/tft/django_api"
import { redirect } from 'next/navigation'

export async function get_puuid_from_account_name_tag(player_name: string, player_tag: string, player_region: string) {
    const riotAPIKey = process.env.TFT_RIOT_API_KEY;
    if (riotAPIKey) {
        const response = await fetch(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${player_name}/${player_tag}`, {
            mode: 'cors', 
            headers: {
                "X-Riot-Token": riotAPIKey,
            },
        });

        if (response.ok) {
            const account_data = await response.json()
            const check_player_response = await GetPlayerByPUUID(account_data['puuid'], player_region)
            if (check_player_response === true)
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