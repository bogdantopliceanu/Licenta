//include totul intr-un try catch
const asyncHandler = require("express-async-handler");
const Destination = require("../models/destinationModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2

const addDestination = asyncHandler( async (req, res) => {
    const {name, country, description, things_to_do} = req.body

    //Validation
    if(!name || !country || !description || !things_to_do){
        res.status(400)
        throw new Error("Fill all the fields")
    }

    //handle image upload
    let fileData = {}
    if(req.file){
        //salvam imaginea in cloudinary
        let uploadFile;
        try {
            uploadFile = await cloudinary.uploader.upload(req.file.path, {folder: "Imagini destinatii", resource_type: "image"})
        }
        catch (error) {
            res.status(500)
            throw new Error("Image could not be uploaded")
        }

        fileData = {
            fileName: req.file.originalname,
            //filePath: req.file.path,  salvare locala
            filePath: uploadFile.secure_url,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2),
        }
    }


    //add destinaion
    const destination = await Destination.create({
        name: name,
        country: country,
        description: description,
        things_to_do: things_to_do,
        image: fileData,
    })

    res.status(201).json(destination)
});


//Get all Destinations
const getDestinations = asyncHandler( async (req, res) => {
    const destinations = await Destination.find()
    res.status(200).json(destinations)
})


//Get single Destionation
const getDestination = asyncHandler( async (req, res) => {
    const destination = await Destination.findById(req.params.id)
    if(!destination){
        res.status(404)
        throw new Error("Destination not found")
    }

    res.status(200).json(destination)
})

module.exports = {
    addDestination,
    getDestinations,
    getDestination,
}