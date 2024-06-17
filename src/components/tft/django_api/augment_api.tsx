'use server'

export async function GetAugmentsByPatch({patch}: {patch: string | undefined}) {
    const response = await fetch("http://127.0.0.1:8000/tft/augment/all/patch", {
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