import { DiverState } from "../store/diverReducer";
import { Certificate } from "./certificateApi";

const apiKey = import.meta.env.VITE_BACKEND_API;

export type createDiverResponse = {
  userId: string;
	firstName: string;
	lastName: string;
	age: number;
	numberOfDives: number;
	bio: string;
	image: string;
	location: {
		suburb: string;
		state: string;
		postcode: string;
		countryCode: string;
	},
	lastActive: string;
	certificates: Certificate[];
}

type ResultResponse<T> =
  | { ok: true; status: number; data: T }
  | { ok: false; status: number; error: Error };




type DiverResponse = ResultResponse<createDiverResponse>;

export const createDiverApi = async (
  payload: DiverState,
): Promise<DiverResponse> => {
  try {
    const result = await fetch(`${apiKey}api/Diver/Create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (result.ok) {
      return {
        ok: result.ok,
        status: result.status,
        data: await result.json(),
      };
    }
    return {
      ok: false,
      status: result.status,
      error: new Error(result.statusText || "Failed to create diver"),
    };
  } catch (error) {
    throw new Error("call failed for create diver api");
  }
};
