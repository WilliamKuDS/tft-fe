'use server'
import {redirect} from "next/navigation";

export async function GetPlayerByPUUID(puuid: string, region: string) {
    const response = await fetch("http://127.0.0.1:8000/tft/playerid", {
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

export async function GetPlayerDataFromNameAndTag(playerName: string) {
    const response = await fetch("http://127.0.0.1:8000/tft/player", {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin// *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            "playerName": playerName
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    const data = await response.json()
    return data
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