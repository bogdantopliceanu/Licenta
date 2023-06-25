
//include totul intr-un try catch


const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const generateToken = (id) => {
    // return jwt.sign(cu_ce_vrem_sa_creem_tokenul, pasam_jwt_secret, cand_sa_expire)
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"})
};


//Register user
//procesul de interactiune cu baza de date a asincron -> try catch
const registerUser = asyncHandler( async (req, res) => {
   const {name, email, password} = req.body

   //Validation in caz ca trece de frontend
   if(!name || !email || !password){
    res.status(400)
    throw new Error("Please fill in all required fields");
    }

    if(password.length < 3){
        res.status(400)
        throw new Error("Password must be longer than 3 characters");
    }


    //Verif daca exista mailul
    const userExists = await User.findOne({email})
    if (userExists){
        res.status(400)
        throw new Error("Email already exists");
    }

    const usernameExists = await User.findOne({name})
    if (usernameExists){
        res.status(400)
        throw new Error("An user with this username already exists");
    }


    //Create new user
    const user = await User.create({
        name: name,
        email: email,
        password: password
    });

    
    //Generate Token
    const token = generateToken(user._id)

    //Send HTTP-only cookie pentru autologin dupa register
    res.cookie("token_auto_login", token, {
        path: "/",  //unde va fi stocat cookie-ul
        httpOnly: true,  //flag pt ca cookie-ul sa fie folosit de server
        expires: new Date(Date.now() + 86400),  //1 day
        sameSite:"none",  //permite ca frontend si backend sa aiba url-uri diferite
        secure: true  //marcheza cookie-ul sa fie folosit cu https
    });



    if(user){
        //return info din db de test
        const {_id, name, email, photo, phone, bio, destinations} = user

        res.status(201).json({
            //folosim datele din userul de mai sus
            _id, 
            name,
            email, 
            photo, 
            phone, 
            bio, 
            destinations,
            token
        }) 
    }
    else{
        res.status(400)
        throw new Error("Invalid user data")
    }


    res.send("Register User ex ")
});


//Login user
const loginUser = asyncHandler( async (req, res) => {
    const {email, password} = req.body

    //Validate request
    if(!email || !password){
        res.status(400)
        throw new Error("Please add email and password")
    }

    //Check if user exists
    const user = await User.findOne({email})
    if(!user){
        res.status(400)
        throw new Error("User not found, please signup")
    }

    //If user exists check password
    const passwordIsCorrect = await bcrypt.compare(password, user.password)

    
    //Generate Token
    const token = generateToken(user._id)


    //Send HTTP-only cookie pentru autologin dupa register
    res.cookie("token_auto_login", token, {
        path: "/",  //unde va fi stocat cookie-ul
        httpOnly: true,  //flag pt ca cookie-ul sa fie folosit de server
        expires: new Date(Date.now() + 86400e3),  //1 day
        sameSite:"none",  //permite ca frontend si backend sa aiba url-uri diferite
        secure: true  //marcheza cookie-ul sa fie folosit cu https
    });


    
    

    if(user && passwordIsCorrect){
        const {_id, name, email, photo, phone, bio, destinations} = user

        res.status(200).json({
            //folosim datele din userul de mai sus
            _id, 
            name, 
            email, 
            photo, 
            phone, 
            bio,
            destinations,
            token
        }) 
    }
    else{
        res.status(400);
        throw new Error("invalid email or password")
    }
});


//Logoutuser
const logout = asyncHandler(async (req, res) => {
    res.cookie("token_auto_login", "", {
        path: "/",  //unde va fi stocat cookie-ul
        httpOnly: true,  //flag pt ca cookie-ul sa fie folosit de server
        expires: new Date(Date(0)),  //expiram cookkie-ul in momentul curent
        sameSite:"none",  //permite ca frontend si backend sa aiba url-uri diferite
        secure: true  //marcheza cookie-ul sa fie folosit cu https
    });
    res.status(200).json({ message: "Succesfly logged out" })
});



//Get user data
const getUser = asyncHandler (async (req, res) => {
    const user = await User.findById(req.user._id)
    
    if(user){
        //return info din db de test
        const {_id, name, email, photo, phone, bio, destinations, admin} = user

        //trimitem catre frontend
        res.status(200).json({
            _id, 
            name,
            email, 
            photo, 
            phone, 
            bio,
            destinations,
            admin,
        }) 
    }
    else{
        res.status(400)
        throw new Error("User not found")
    }
});


//Get all users
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    const destinationsAndRatings = users.reduce((result, user) => {
      const userDestinations = user.destinations.map((destination) => ({
        destination: destination.destination,
        rating: destination.rating,
      }));
      return [...result, ...userDestinations];
    }, []);
    res.status(200).json(destinationsAndRatings);
  });


//get login satus
const loginStatus = asyncHandler( async (req, res) =>{
    const token = req.cookies.token_auto_login;
    if(!token) {
        return res.json(false);
    }

    //Verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    if(verified) {
        return res.json(true);
    }
    else {
        return res.json(false);
    }
});



//Update user
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
  
    if (user) {
      const { name, email, photo, phone, bio, destinations } = user;
      user.email = email;
      user.name = req.body.name || name;
      user.phone = req.body.phone || phone;
      user.bio = req.body.bio || bio;
      user.photo = req.body.photo || photo;
      user.destinations = req.body.destinations || destinations;
  
      const updatedUser = await user.save();
      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        photo: updatedUser.photo,
        phone: updatedUser.phone,
        bio: updatedUser.bio,
        destinations: updatedUser.destinations,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  });



  const getUserDestinations = asyncHandler(async (userId) => {
    const user = await User.findById(userId);
    if (user) {
      return user.destinations;
    } else {
      throw new Error("User not found");
    }
  });

  
const getSimilarUsers = asyncHandler(async (req, res) => {
    const currentUserDestinations =  await getUserDestinations(req.user._id);
    
    const similarUsers = await User.aggregate([
      {
        $match: {
          _id: { $ne: req.user._id }, // Exclude the current user
          "destinations.destination": {
            $in: currentUserDestinations.map(
              (destination) => destination.destination
            ),
          }, // Users with common destinations
        },
      },
      {
        $project: {
          name: 1,
          destinations: {
            $filter: {
              input: "$destinations",
              as: "destination",
              cond: {
                $in: [
                  "$$destination.destination",
                  currentUserDestinations.map((destination) => destination.destination),
                ],
              },
            },
          },
        },
      },
      {
        $addFields: {
          destinations: {
            $map: {
              input: "$destinations",
              as: "destination",
              in: {
                destination: "$$destination.destination",
                rating: "$$destination.rating",
              },
            },
          },
        },
      },
      {
        $project: {
          name: 1,
          destinations: 1,
          _id: 0,
        },
      },
    ]);
    const updatedSimilarUsers = similarUsers.map((user) => {
      const commonDestinationsCount = user.destinations.length;
      let differenceSum = 0;
  
      user.destinations.forEach((destination) => {
        const commonDestination = destination.destination;
        const commonRating = destination.rating;
        const currentUserDestination = currentUserDestinations.find(
          (dest) => dest.destination === commonDestination
        );
        const currentUserRating = currentUserDestination.rating;
  
        if (commonRating !== currentUserRating) {
          const difference = Math.abs(commonRating - currentUserRating);
          differenceSum += difference;
        }
      });
  
      const coefficient = (10 - differenceSum / (commonDestinationsCount )*2) / 10;
      
      return {
        ...user,
        commonDestinationsCount,
        differenceSum,
        coefficient,
      };
    });
  
    res.status(200).json(updatedSimilarUsers);
  });

  

  const getNotCommonDestinations = asyncHandler(async (req, res) => {
    const currentUserDestinations = await getUserDestinations(req.user._id);
  
    const similarUsers = await User.aggregate([
      {
        $match: {
          _id: { $ne: req.user._id }, // Exclude the current user
          "destinations.destination": {
            $in: currentUserDestinations.map((destination) => destination.destination),
          }, // Users with common destinations
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          destinations: 1,
        },
      },
    ]);
  
    const notCommonDestinations = [];
    similarUsers.forEach((user) => {
      const userDestinations = [];
      user.destinations.forEach((destination) => {
        const commonDestination = destination.destination;
        if (
          !currentUserDestinations.some((dest) => dest.destination === commonDestination)
        ) {
          userDestinations.push({
            destination: commonDestination,
            rating: destination.rating,
          });
        }
      });
  
      if (userDestinations.length > 0) {
        notCommonDestinations.push({
          user: user._id,
          name: user.name,
          destinations: userDestinations,
        });
      }
    });
  
    res.status(200).json(notCommonDestinations);
  });
  
  
  
  
  

module.exports = {
    registerUser,
    loginUser,
    logout,
    getUser,
    loginStatus,
    updateUser,
    getUsers,
    getSimilarUsers,
    getNotCommonDestinations,
};











