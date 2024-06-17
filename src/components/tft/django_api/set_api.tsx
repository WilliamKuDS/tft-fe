'use server'

export async function GetAllSets() {
    const response = await fetch("http://127.0.0.1:8000/tft/set/all", {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin// *default, no-cache, reload, force-cache, only-if-cached
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