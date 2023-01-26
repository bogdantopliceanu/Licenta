const { response } = require("express");

//Middle ware -> intre request si response
const errorHandler = (err, req, res, next) => {
    //daca exista un status code il folosim, daca nu, setam default pe 500
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode)

    res.json({
        message:  err.message,
        //daca suntem pe environment-ul de development afisam sursa erorii
        stack: process.env.NODE_ENV == "development" ? err.stack : null
    })
};

module.exports = errorHandler;