/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  driver: "mysql2",
  dbCredentials: {
    host: "localhost",
    user: "root",
    password: "",
    database: "student-attendance-tracking",
    port: 3306,
  },
};
