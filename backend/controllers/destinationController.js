//include totul intr-un try catch
const asyncHandler = require("express-async-handler");
const Destination = require("../models/destinationModel");
const { fileSizeFormatter } = require("../utils/fileUpload");


const addDestination = asyncHandler( async (req, res) => {
    const {name, description, things_to_do} = req.body

    //Validation
    if(!name || !description || !things_to_do){
        res.status(400)
        throw new Error("Fill all the fields")
    }

    //handle image upload
    let fileData = {}
    if(req.file){
        fileData = {
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2),
        }
    }


    //add destinaion
    const destination = await Destination.create({
        name: name,
        description: description,
        things_to_do: things_to_do,
        image: fileData,
    })

    res.status(201).json(destination)
});



module.exports = {
    addDestination,
}