
export interface AddressResult {
    osm_id: number;
    display_name: string;
    address: {
      suburb?: string;
      postcode?: string;
      state?: string;
      country_code?: string;
      country?: string;
    };
}


export const addressApi = async (query: string): Promise<AddressResult[]> => {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1&limit=5`);
    return res.json();
};