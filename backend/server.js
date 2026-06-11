require("dotenv").config();

const app = require("./app");
const pool = require("./src/config/db");

const {
  createDefaultSuperAdmin
} = require("./src/services/authService");

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {

    const connection =
      await pool.getConnection();

    console.log(
      "Database Connected Successfully"
    );

    connection.release();

    await createDefaultSuperAdmin();

    app.listen(PORT, () => {
      console.log(
        "Server running on port " + PORT
      );
    });

  } catch (error) {

    console.error(
      "Server Startup Failed"
    );

    console.error(error);

  }
}

startServer();