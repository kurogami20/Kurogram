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

// async function test() {
//   const test = await client.query('select "name" from "all_user_info";');
//   return test.rows;
// }
// console.log(test());
// const result = await client.query('select "name" from "all_user_info";');

// console.log(result.rows);
export default client;
