const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const port=8000;

app.use(cors({ origin: "*" }));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

const connection=mysql.createConnection({
    host:'sql6.freesqldatabase.com',
    user:'sql6469944',
    password:'2lQmeUJjVf',
    database:'sql6469944',
    port:3306
});

try
{
    console.log("Database connected");
    var q = "SHOW TABLES LIKE 'carmanagement'";
    connection.query(q, function (error, result) {
        if(result.length === 0)
        {
            var q = "CREATE TABLE carmanagement (carId VARCHAR(50), carModel VARCHAR(50),  carNo VARCHAR(50),  status VARCHAR(50),  PRIMARY KEY (carId))";
            connection.query(q, function (error, result) {
                console.log("Table is created successfully");
            });
        }
        else{
            console.log("Table is already created");
        }
    });
}
catch(error)
{
    console.log(error);
}

const showData=(req,res)=>{
    var q = "SELECT * from carmanagement";
    connection.query(q, function (error, result) {
        if (error)
        {
            res.json({response: error});
        }
        else
        {
           res.json(result);
        }
    });
}

app.post('/saveCar',(req,res)=>{
    if(req.body.carId!==""){
        var q = "INSERT INTO carmanagement (carId, carModel, carNo, status) VALUES ("+"'"+ req.body.carId+"'" +", "+"'"+req.body.carModel+"'"+", "+"'"+req.body.carNo+"'"+", "+"'"+req.body.status+"'"+")";
        connection.query(q, function (error, result) {
            if (error)
            {
                res.json({response: error});
            }
            else
            {
                showData(req,res);
            }
        });
    }
    else{
        res.json({response: "Id should not be an empty field"});
    }
})

app.post('/editCar',(req,res)=>{
    if(req.query.id!==""){
        var q = "UPDATE carmanagement SET carModel="+"'"+req.body.carModel+"'"+","+"carNo="+"'"+req.body.carNo+"'"+","+" status="+"'"+req.body.status+"'"+" WHERE carId="+"'"+req.query.id+"'";
        connection.query(q, function (error, result) {
            if (error)
            {
                res.json({response: error});
            }
            else
            {
                showData(req,res);
            }
        });
    }
    else{
        res.json({response: "Id should not be an empty field"});
    }
})

app.get('/deleteCar',(req,res)=>{
    if(req.body.carId!==""){
        var q = "DELETE FROM carmanagement"+" WHERE carId="+"'"+req.query.id+"'";
        connection.query(q, function (error, result) {
            if (error)
            {
                res.json({response: error});
            }
            else
            {
                showData(req,res);
            }
        });
    }
    else{
        res.json({response: "Id should not be an empty field"});
    }
})

app.get('/getCars',(req,res)=>{
    if(typeof req.query.id != "undefined")
    {
        var q = "SELECT * from carmanagement WHERE carId="+"'"+req.query.id+"'";
    }
    else
    {
        var q = "SELECT * from carmanagement";
    }
    connection.query(q, function (error, result) {
        if (error)
        {
            res.json({response: error});
        }
        else
        {
            res.json(result);
        }
    });
})

app.listen(port,()=>console.log(`server is listening in port ${port}`));