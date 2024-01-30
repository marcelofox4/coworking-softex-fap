import "reflect-metadata";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { AppDataSource } from "./database/data-source";
import { routes } from "./app/routes/routes";
import swaggerDocs from "./swagger.json";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

// Adicionando swagger docs 
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const port = 8000;
AppDataSource.initialize().then(async () => {
    console.log("Database connected");
    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}/`);
    })
})