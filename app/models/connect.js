import "dotenv/config";
import pg from "pg";

const { Client } = pg;

const client = new Client({
  connectionString: process.env.PG_STRING_CONNEXION,
});

client.connect((error) => {
  if (error) {
    console.error(
      "Une erreur a lieu à la connexion avec notre BDD : ",
      error.message
    );
  } else {
    console.log("Connection à la BDD réussie !");
  }
});

export default client;
