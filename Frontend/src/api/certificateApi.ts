const apiKey = import.meta.env.VITE_BACKEND_API;

type ResultResponse<T> = {ok: true; status: number; data: T} 
| {ok: false; status: number; error: Error};


type CertificateResponse = ResultResponse<Certificate[]>;

export type Certificate = {
    id: string;
    name: string;
    agency: string;
    url: string;
}


export const getCertificatesApi = async (): Promise<CertificateResponse> => {
    try {
        const result = await fetch(`${apiKey}api/Certificate/GetCertificates`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if(result.ok) {
            return {
                ok: result.ok,
                status: result.status,
                data: await result.json()
            };
        }

        return {ok: false, status: result.status, error: new Error(result.statusText || 'Failed to fetch certificates')};
    } catch (error) {
        throw new Error("call failed for get certificates api");
    }
}
