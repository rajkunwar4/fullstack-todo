import { app } from "./app.js";
import { createDB } from "./data/database.js";

createDB();

app.listen(process.env.PORT, () => {
  console.log(
    `server started on PORT ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});
