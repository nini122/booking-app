const fs = require('fs');
const express = require ('express');
const bodyParser = require ('body-parser');
const app = express();
const port = process.env.PORT || 5000;

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
})
connection.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// multer needs to send file to server
const multer = require('multer');
const upload = multer({dest: './upload'})

app.get('/api/api', (req, res) => {
    connection.query(
        "SELECT * FROM BARS",
        (err, rows, fields) => {
            res.send(rows);
        }
    )    
});

app.use('/image', express.static('./upload'));

app.post('/api/api', upload.single('image'), (req, res) => {
    let sql = 'INSERT INTO BARS VALUES (null, ?, ?, ?, ?, now())';
    let name = req.body.name;
    let address = req.body.address;
    let ads = req.body.ads;
    let image = '/image/' + req.file;
    console.log(name);

    let params = [name, address, ads, image];
    connection.query(sql, params, 
        (err, rows, fields) => {
            res.send(rows);
            // console.log(err);
            // console.log(rows);
        }
    );
});

app.listen(port, () => console.log(`listening on port ${port}`));