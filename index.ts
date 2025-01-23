import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from './src/routes/authRoutes';
import { syncDatabase } from "./src/models";
import todoRoutes from "./src/routes/todoRoutes";
dotenv.config();

const PORT = process.env.PORT || 10000;

const app = express();


app.use(express.json());
app.use(cors());

app.use('/api', authRoutes);
app.use('/api/todos', todoRoutes);

syncDatabase()



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app
