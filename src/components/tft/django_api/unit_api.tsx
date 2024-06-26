'use server'

const django_address = process.env.DJANGO_ADDRESS;
const django_port = process.env.DJANGO_PORT;

export async function GetUnitsByPatch({
    patch,
    page = 1,
    pageSize = 20,
    orderBy = 'id'
  }: {
    patch: string | undefined,
    page?: number,
    pageSize?: number,
    orderBy?: string
  }) {
    const url = new URL(`http://${django_address}:${django_port}/tft/champion/all/patch`);
    url.searchParams.append('patch', patch || '');
    url.searchParams.append('page', page.toString());
    url.searchParams.append('page_size', pageSize.toString());
    url.searchParams.append('order_by', orderBy);

    const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    });

    if (response.ok) {
    const data = await response.json();
    return data;
    } else {
    throw new Error('Failed to fetch data');
    }
}