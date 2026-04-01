import type { RootObject } from "../interfaces/dbData";

const url = "https://reaktor-genius-5d7d4c2ff9d5.herokuapp.com/app/oSoL26Scr2w8SIbbxjV0"

// fetchData.js
export async function fetchData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data: RootObject = await response.json();
    return data;
  } catch (error:any) {
    console.error("Fetch error:", error.message);
    // Manejar el error según sea necesario
    // Puedes retornar un objeto de error o valores predeterminados
    return null; // ejemplo de retorno en caso de error
  }
}
