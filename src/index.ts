import express from "express";
import bodyParser from "body-parser";
//import cors from 'cors';
import { router } from "./router/router"
import * as dotenv from 'dotenv'
import {serverConfigService} from "./config/config.service";
dotenv.config()

const app = express();



app.use(bodyParser.json());
//app.use(cors);
app.use('/api', router);


const start = () => {
    try {
        const PORT = serverConfigService.getPort() || 4546
        app.listen(PORT, () => {
            console.log(`Server has been listening on port http://localhost:${PORT}`)
        })
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message)
        }
    }
}

start()