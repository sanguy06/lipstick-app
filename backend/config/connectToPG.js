import pkg from "pg";

const {Pool, Client} = pkg; 

const pool = new Pool({
    host: "localhost", 
    user: "postgres",
    port: 5432,
    password: "cattran2006",
    database: "lipstick-server"
})

export{pool}