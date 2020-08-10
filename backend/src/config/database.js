// timestamp coloca created_at e update_at nas tabelas 
// underscored coloca o nome de tabelas e atributos como snake_case 

module.exports = {
    dialect: "mysql",
    host: "localhost",
    username: "root",
    password: "bcd127",
    database: "senai_overflow",
    define: {
        timestamp: true,
        underscored: true,
    },
};