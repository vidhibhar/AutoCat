const HOST = "http://localhost:8000";

export async function searchCars(filters) {
  const url = new URL(`${HOST}/cars`);
  url.search = new URLSearchParams(filters).toString();
  console.log(url);
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const obj = await response.json();
    return obj;
  } catch (e) {
    console.error("API error", e);
  }
}

export async function getMakes() {
  const url = `${HOST}/options/makes`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const obj = await response.json();
    return obj;
  } catch (e) {
    console.error("API error", e);
  }
}

export async function getStyles() {
  const url = `${HOST}/options/styles`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const obj = await response.json();
    return obj;
  } catch (e) {
    console.error("API error", e);
  }
}

export async function getFuelTypes() {
  const url = `${HOST}/options/fuel`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const obj = await response.json();
    return obj;
  } catch (e) {
    console.error("API error", e);
  }
}

export async function getDriveWheels() {
  const url = `${HOST}/options/drives`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const obj = await response.json();
    return obj;
  } catch (e) {
    console.error("API error", e);
  }
}

export async function getCylinderTypes() {
  const url = `${HOST}/options/cylinders`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const obj = await response.json();
    return obj;
  } catch (e) {
    console.error("API error", e);
  }
}

export async function getEngineSizes() {
  const url = `${HOST}/options/engSizes`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const obj = await response.json();
    return obj;
  } catch (e) {
    console.error("API error", e);
  }
}
