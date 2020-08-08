// @authour TechPassion
// @version July 8th 2020
// Modules required
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const ibmdb = require('ibm_db');
app.use(bodyParser.json());

// Connect to DB2 in IBM Cloud
let connStr = "DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-lon02-13.services.eu-gb.bluemix.net;PORT=50000;PROTOCOL=TCPIP;UID=jxj57313;PWD=v8sj37792w5f5l-l;";

// Designations available
app.get('/designation', function (request, response) {
    console.log('Designations that are available')
    ibmdb.open(connStr, function (err, conn) {
        if (err) {
            return response.json({
                success: -1,
                message: err
            });
        }
        conn.query("SELECT * FROM JXJ57313.RL_DESIGNATION_MASTER;", function (err, data) {
            if (err) {
                return response.json({
                    success: -1,
                    message: err
                });
            }
            conn.close(function () {
                return response.json({
                    success: 1,
                    message: 'Data Received!',
                    data: data
                });
            });
        });
    });
})

// Lecturer details
app.get('/lecturer', function (request, response) {
    console.log('Lecturer Data')
    ibmdb.open(connStr, function (err, conn) {
        if (err) {
            return response.json({
                success: -1,
                message: err
            });
        }
        conn.query("SELECT * FROM JXJ57313.RL_LECTURERS;", function (err, data) {
            if (err) {
                return response.json({
                    success: -1,
                    message: err
                });
            }
            conn.close(function () {
                return response.json({
                    success: 1,
                    message: 'Data Received!',
                    data: data
                });
            });
        });
    });
})

// get lecturers that are under designationId one
app.get('/lecturer/designationId', function (request, response) {
    console.log('Lecturer Data by designation Id')
    ibmdb.open(connStr, function (err, conn) {
        if (err) {
            return response.json({
                success: -1,
                message: err
            });
        }
        conn.query("SELECT * FROM JXJ57313.RL_LECTURERS where designation_id = 1;", function (err, data) {
            if (err) {
                return response.json({
                    success: -1,
                    message: err
                });
            }
            conn.close(function () {
                return response.json({
                    success: 1,
                    message: 'Data Received!',
                    data: data
                });
            });
        });
    });
})

// get student details by designationId
app.get('/students/designationId', function (request, response) {
    console.log('Lecturer Data by designation Id')
    ibmdb.open(connStr, function (err, conn) {
        if (err) {
            return response.json({
                success: -1,
                message: err
            });
        }
        conn.query("SELECT * FROM JXJ57313.RL_STUDENTS where designation_id = 2;", function (err, data) {
            if (err) {
                return response.json({
                    success: -1,
                    message: err
                });
            }
            conn.close(function () {
                return response.json({
                    success: 1,
                    message: 'Data Received!',
                    data: data
                });
            });
        });
    });
})

// get student details by designationId
app.get('/students/designationId/lecturerId/:lecturerId', function (request, response) {
    console.log('Lecturer Data by designationId and lecturerId')
    ibmdb.open(connStr, function (err, conn) {
        if (err) {
            return response.json({
                success: -1,
                message: err
            });
        }
        conn.query("SELECT * FROM JXJ57313.RL_STUDENTS where designation_id = 2 and LECTURER_ID = " +request.params.lecturerId+";", function (err, data) {
            if (err) {
                return response.json({
                    success: -1,
                    message: err
                });
            }
            conn.close(function () {
                return response.json({
                    success: 1,
                    message: 'Data Received!',
                    data: data
                });
            });
        });
    });
})

// listening port
app.listen(8888, function () {
    console.log("Server is listening on port 8888");
})