const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "specialist_app",
    password: "dataqwe665808",
    port: 5432,
});

module.exports = pool;
