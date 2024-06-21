'use server'
import { AccountData } from './types';

const django_address = process.env.DJANGO_ADDRESS;
const django_port = process.env.DJANGO_PORT;


export async function FindAccount(account_data: AccountData) {
    const response = await fetch(`http://${django_address}:${django_port}/tft/account`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin// *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            "puuid": account_data.puuid,
            "gameName": account_data.gameName,
            "tagLine": account_data.tagLine
        },
    });
    if (!response.ok) {
        return (true)
    }

}

export async function GetSummonerDataFromPUUIDRegion(puuid: string, region: string) {
    const response = await fetch(`http://${django_address}:${django_port}/tft/summoner`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin// *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            "puuid": puuid,
            "region": region
        },
    });

    if (response.ok) {
        const data = await response.json()
        return data
    }
    else {
        const data = {}
        return data
    }

}

export async function GetPlayerMatchDataFromPUUIDRegion(puuid: string, region: string) {
    const response = await fetch(`http://${django_address}:${django_port}/tft/match`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin// *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            "puuid": puuid,
            "region": region
        },
    });

    if (response.ok) {
        const data = await response.json()
        return data
    }
    else {
        const data = {}
        return data
    }

}

export async function GetBasicPlayerMatchDataFromPUUIDRegion(puuid: string, region: string, page: any) {
    const response = await fetch(`http://${django_address}:${django_port}/tft/match/basic`, {
        method: "GET",
        mode: "cors",
        headers: {
            "puuid": puuid,
            "region": region,
            "page": page
        },
    });

    if (response.ok) {
        const data = await response.json();
        if (Object.keys(data).length === 0) {
            return null;
        }
        return data;
    } else {
        return null;
    }
}
  

export async function GetDetailedPlayerMatchDataFromPUUIDRegion(match_id: string, puuid: string) {
    const response = await fetch(`http://${django_address}:${django_port}/tft/match/detailed`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin// *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            "matchID": match_id,
            "puuid": puuid
        },
    });

    if (response.ok) {
        const data = await response.json()
        return data
    }
    else {
        const data = {}
        return data
    }

}

export async function UpdatePlayerProfileData(puuid: string, region: string) {
    const response = await fetch(`http://${django_address}:${django_port}/tft/profile`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin// *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            "puuid": puuid,
            "region": region
        },
    });
    if (!response.ok) {
        return (true)
    }

}

export async function UpdateMatchData(puuid: string) {
    const response = await fetch(`http://${django_address}:${django_port}/tft/player`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin// *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            "puuid": puuid
        },
    });
    if (!response.ok) {
        return (true)
    }

}

export async function AnalyzeMatches({puuid} : {puuid: string}) {
    const response = await fetch(`http://${django_address}:${django_port}/tft/summoner/analyze`, {
        method: "GET",
        mode: "cors",
        headers: {
            "puuid": puuid
        },
    });

    if (response.ok) {
        const data = await response.json()
        return data
    }
}

export async function MatchRecommendations({puuid} : {puuid: string}) {
    const response = await fetch(`http://${django_address}:${django_port}/tft/summoner/recommendations`, {
        method: "GET",
        mode: "cors",
        headers: {
            "puuid": puuid
        },
    });

    if (response.ok) {
        const data = await response.json()
        return data
    }
}


export async function GetPlayerID(playerID: number) {
    const rawFormData = {
        player_id: playerID,
    }
    const response = await fetch(`http://${django_address}:${django_port}/tft/playerid`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin// *default, no-cache, reload, force-cache, only-if-cached
        body: JSON.stringify(rawFormData),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    const data = await response.json()
    return data
}


export async function GetGameInfo(playerInfo: any) {
    const rawFormData = {
        player_name: playerInfo.playername,
        region: playerInfo.region,
    }
    const response = await fetch(`http://${django_address}:${django_port}/tft/game/info/playername`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin// *default, no-cache, reload, force-cache, only-if-cached
        body: JSON.stringify(rawFormData),
    });

    if (!response.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    const data = await response.json()
    return data
}

export async function GetPlayerGames(player_id: any, game_id: any) {
    const rawFormData = {
        player_id: player_id,
        game_id: game_id,
    }

    const response = await fetch(`http://${django_address}:${django_port}/tft/game`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin// *default, no-cache, reload, force-cache, only-if-cached
        body: JSON.stringify(rawFormData),
    });

    if (!response.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    const data = await response.json()
    return data
}

export async function GetGameUnits() {
    const response = await fetch(`http://${django_address}:${django_port}/tft/unit/all`, {
        method: "GET",
        mode: "cors"
    })
        if (!response.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    const data = await response.json()
    return data
}

export async function GetGameItems() {
    const response = await fetch(`http://${django_address}:${django_port}/tft/item/all`, {
        method: "GET",
        mode: "cors"
    })
        if (!response.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    const data = await response.json()
    return data
}