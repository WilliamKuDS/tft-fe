'use server'

const django_address = process.env.DJANGO_ADDRESS;
const django_port = process.env.DJANGO_PORT;

export async function GetUnitsByPatch({patch}: {patch: string | undefined}) {
    const response = await fetch(`http://${django_address}:${django_port}/tft/champion/all/patch`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin// *default, no-cache, reload, force-cache, only-if-cached
        headers: patch ? {
            "patch": patch,
        } : {},
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