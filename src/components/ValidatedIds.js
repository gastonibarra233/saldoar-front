import axios from "axios";

async function fetchSystemIDs() {
  try {
    const response = await axios.get("https://api.saldo.com.ar/v3/systems");
    const systemIDs = response.data.data
      .filter(system => system.attributes.can_send || system.attributes.can_receive)
      .map(system => system.id);

    return systemIDs;
  } catch (error) {
    console.error("Error al obtener los sistemas:", error);
    return [];
  }
}

export async function getValidSystemIDs() {
  const validSystemIDs = await fetchSystemIDs();
  return validSystemIDs;
}

(async function () {
  const validIDs = await getValidSystemIDs();
  console.log("IDs válidos:", validIDs);
})();
