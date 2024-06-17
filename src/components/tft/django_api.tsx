'use server'
import {redirect} from "next/navigation";
import { AccountData } from './types';


export async function FindAccount(account_data: AccountData) {
    const response = await fetch("http://127.0.0.1:8000/tft/account", {
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
    const response = await fetch("http://127.0.0.1:8000/tft/summoner", {
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
    const response = await fetch("http://127.0.0.1:8000/tft/match", {
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
    const response = await fetch(`http://127.0.0.1:8000/tft/match/basic`, {
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
    const response = await fetch("http://127.0.0.1:8000/tft/match/detailed", {
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
    const response = await fetch("http://127.0.0.1:8000/tft/profile", {
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
    const response = await fetch("http://127.0.0.1:8000/tft/player", {
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
    const response = await fetch(`http://127.0.0.1:8000/tft/summoner/analyze`, {
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
    const response = await fetch(`http://127.0.0.1:8000/tft/summoner/recommendations`, {
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
    const response = await fetch("http://127.0.0.1:8000/tft/playerid", {
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
    const response = await fetch("http://127.0.0.1:8000/tft/game/info/playername", {
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

    const response = await fetch("http://127.0.0.1:8000/tft/game", {
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
    const response = await fetch("http://127.0.0.1:8000/tft/unit/all", {
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
    const response = await fetch("http://127.0.0.1:8000/tft/item/all", {
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