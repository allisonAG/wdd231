const url = "./data/members.json";

export async function getMemberData() {
    const response = await fetch(url);
    const data = await response.json();
    //console.table(data.members);
    return data.members;
}