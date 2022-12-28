const express = require('express');
const app = express();
const port = 3000;

const mysql = require('mysql');
const dbConnectionConfig = {
    host: 'mysql-db',
    user: 'root',
    password: 'root',
    database: 'example-db'
};
const dbConnection = mysql.createConnection(dbConnectionConfig);
const table = 'people'
const query = `SELECT * FROM ${table};`;

app.get('/', (req, res) => {
    let html = '<h1>Full Cycle</h1>';
    html += '<table style="border: 1px solid black;">';
    html += '<tr><th style="border: 1px solid black;">id</th>';
    html += '<th style="border: 1px solid black;">name</th></tr>';
    dbConnection.query(query, (errors, results) => {
        if (errors) throw errors;
        results?.forEach(result => {
            html += `<tr><td style="border: 1px solid black;">${result.id}</td>`;
            html += `<td style="border: 1px solid black;">${result.name}</td></tr>`;
        });
        html += '</table>';
        res.send(html);
    });
});

app.listen(port, () => {
    console.log('Listening on port:', port);
    const createTableQuery = `CREATE TABLE IF NOT EXISTS ${table} (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY (id));`;
    dbConnection.query(createTableQuery, (errors, _results) => {
        if (errors) throw errors;
        dbConnection.query(`INSERT INTO ${table} (name) VALUES ('docker up');`);
    });
});

app.on('exit', () => dbConnection.end());