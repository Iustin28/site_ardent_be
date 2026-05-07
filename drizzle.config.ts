import { defineConfig } from "drizzle-kit";

console.log(process.env.PG_DATABASE!)

export default defineConfig({
  schema: "./src/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: process.env.PG_HOST!,
    port: Number(process.env.PG_PORT),
    user: process.env.PG_USER!,
    password: process.env.PG_PASS!,
    database: process.env.PG_DATABASE!,
    ssl: false, 
  },
});


// export default defineConfig({

//   schema: "./src/db/schema/index.ts", // Path to your schema files

//   out: "./drizzle", // Path for migration files (for Option 2)

//   dialect: "postgresql",

//   dbCredentials: {
//     url: process.env.RAILWAY_DB_URL!,

//   },

//   verbose: true,
//   strict: true,

// });