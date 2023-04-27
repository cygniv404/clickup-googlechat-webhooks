import {config,} from "dotenv";
import tunnel from './scripts/tunnel.js';
import server from './server/index.js';
import createWebhooks from "./api/clickUp/createWebhooks.js";

config();
const port = process.env.APP_PORT;
const ngrokAuthKey = process.env.NGROK_AUTH_TOKEN;
const teamId = process.env.CLICKUP_TEAM_ID;
const authorizationKey = process.env.CLICKUP_AUTH_KEY;
const url = await tunnel.init(ngrokAuthKey, port);
await server.init(url, port)
await createWebhooks(url, teamId, authorizationKey)
