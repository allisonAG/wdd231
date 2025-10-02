const url = "./data/areas.json";

export async function getAreasData() {
    const response = await fetch(url);
    const data = await response.json();
    return data.areas;
}