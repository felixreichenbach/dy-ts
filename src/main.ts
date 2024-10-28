import * as VIAM from "@viamrobotics/sdk";

const HOST = import.meta.env.VITE_HOST;
const API_KEY_ID = import.meta.env.VITE_API_KEY_ID;
const API_KEY_SECRET = import.meta.env.VITE_API_KEY_SECRET;

async function connect(): Promise<VIAM.RobotClient> {
  const host = HOST;

  const machine = await VIAM.createRobotClient({
    host,
    credentials: {
      type: "api-key",
      payload: API_KEY_SECRET,
      authEntity: API_KEY_ID,
    },
    signalingAddress: "https://app.viam.com:443",

    // Required for the SDK to connect to a Viam micro server
    disableSessions: true,
  });

  return machine;
}

const button = <HTMLButtonElement>document.getElementById("main-button");

async function run(client: VIAM.RobotClient) {
  try {
    button.disabled = true;
    const textElement = <HTMLParagraphElement>document.getElementById("text");
    textElement.innerHTML = "waiting for data...";

    // nmea
    const nmeaClient = new VIAM.SensorClient(client, "nmea");
    const nmeaReturnValue = await nmeaClient.getReadings();
    console.log(nmeaReturnValue);

    textElement.innerHTML = JSON.stringify(nmeaReturnValue, null, 2);
  } finally {
    button.disabled = false;
  }
}

async function main() {
  let client: VIAM.RobotClient;
  try {
    button.textContent = "Connecting...";
    client = await connect();
    button.textContent = "Click for data";
  } catch (error) {
    button.textContent = "Unable to connect";
    console.error(error);
    return;
  }

  // Make the button in our app do something interesting
  button.addEventListener("click", async () => {
    await run(client);
  });
  button.disabled = false;
}

main();
