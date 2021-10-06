const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "crud_task",
  password: "inshal14",
  port: 5432,
});
pool.connect();

module.exports = pool;
