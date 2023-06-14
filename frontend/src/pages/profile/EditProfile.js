

/*
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import Loader from "../../components/loader/Loader";
import { selectUser } from "../../redux/features/auth/authSlice";
import "./Profile.scss";
import { toast } from "react-toastify";
import { updateUser } from "../../services/authService";

const EditProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(selectUser);
  const { email } = user;

  useEffect(() => {
    if (!email) {
      navigate("/profile");
    }
  }, [email, navigate]);

  const initialState = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    bio: user?.bio,
    photo: user?.photo,
    destinations: user?.destinations || [], // Array for storing destinations and ratings
  };
  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState("");
  const [destination, setDestination] = useState("");
  const [rating, setRating] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const addDestination = () => {
    const newDestination = { destination, rating };
    setProfile((prevProfile) => ({
      ...prevProfile,
      destinations: [...prevProfile.destinations, newDestination],
    }));
    setDestination("");
    setRating("");
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let imageURL = profile.photo;

      if (
        profileImage &&
        (profileImage.type === "image/jpeg" ||
          profileImage.type === "image/jpg" ||
          profileImage.type === "image/png")
      ) {
        const image = new FormData();
        image.append("file", profileImage);
        image.append("cloud_name", "ddpy3t4jd");
        image.append("upload_preset", "hmvpqqls");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/ddpy3t4jd/image/upload",
          { method: "POST", body: image }
        );
        const imgData = await response.json();
        imageURL = imgData.url.toString();
      }

      const formData = {
        name: profile.name,
        phone: profile.phone,
        bio: profile.bio,
        photo: imageURL,
        destinations: profile.destinations,
      };

      const data = await updateUser(formData);
      console.log(data);
      toast.success("User updated");
      navigate("/profile");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile --my2">
      {isLoading && <Loader />}

      <Card cardClass={"card --flex-dir-column"}>
        <span className="profile-photo">
          <img src={user?.photo} alt="profilepic" />
        </span>
        <form className="--form-control --m" onSubmit={saveProfile}>
          <span className="profile-data">
            <p>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={profile?.name}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Email:</label>
              <input type="text" name="email" value={profile?.email} disabled />
              <br />
              <code>Email cannot be changed.</code>
            </p>
            <p>
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={profile?.phone}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Bio:</label>
              <textarea
                name="bio"
                value={profile?.bio}
                onChange={handleInputChange}
                cols="30"
                rows="10"
              ></textarea>
            </p>
            <p>
              <label>Photo:</label>
              <input type="file" name="image" onChange={handleImageChange} />
            </p>
            <p>
              <label>Destinations:</label>
              <input
                type="text"
                name="destination"
                value={destination}
                onChange={handleDestinationChange}
              />
              <input
                type="number"
                name="rating"
                value={rating}
                onChange={handleRatingChange}
                min={1}
                max={10}
              />
              <button type="button" onClick={addDestination}>
                Add
              </button>
            </p>
            {profile.destinations.map((destination, index) => (
              <div key={index}>
                <p>Destination: {destination.destination}</p>
                <p>Rating: {destination.rating}</p>
              </div>
            ))}
            <div>
              <button className="--btn --btn-primary">Edit Profile</button>
            </div>
          </span>
        </form>
      </Card>
      <br />
    </div>
  );
};

export default EditProfile;

*/

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import Loader from "../../components/loader/Loader";
import { selectUser } from "../../redux/features/auth/authSlice";
import "./Profile.scss";
import { toast } from "react-toastify";
import { updateUser } from "../../services/authService";

const EditProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(selectUser);
  const { email } = user;

  useEffect(() => {
    if (!email) {
      navigate("/profile");
    }
  }, [email, navigate]);

  const initialState = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    bio: user?.bio,
    photo: user?.photo,
    destinations: user?.destinations || [], // Array for storing destinations and ratings
  };
  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState("");
  const [destination, setDestination] = useState("");
  const [rating, setRating] = useState("");
  const [editIndex, setEditIndex] = useState(-1); // Index of the destination being edited

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const addDestination = () => {
    if (editIndex !== -1) {
      // Modify the existing destination
      const updatedDestinations = [...profile.destinations];
      updatedDestinations[editIndex] = { destination, rating };
      setProfile({ ...profile, destinations: updatedDestinations });
      setDestination("");
      setRating("");
      setEditIndex(-1);
    } else {
      // Add a new destination
      const newDestination = { destination, rating };
      setProfile((prevProfile) => ({
        ...prevProfile,
        destinations: [...prevProfile.destinations, newDestination],
      }));
      setDestination("");
      setRating("");
    }
  };

  const editDestination = (index) => {
    const { destination, rating } = profile.destinations[index];
    setDestination(destination);
    setRating(rating);
    setEditIndex(index);
  };

  const deleteDestination = (index) => {
    const updatedDestinations = [...profile.destinations];
    updatedDestinations.splice(index, 1);
    setProfile({ ...profile, destinations: updatedDestinations });
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let imageURL = profile.photo;

      if (
        profileImage &&
        (profileImage.type === "image/jpeg" ||
          profileImage.type === "image/jpg" ||
          profileImage.type === "image/png")
      ) {
        const image = new FormData();
        image.append("file", profileImage);
        image.append("cloud_name", "ddpy3t4jd");
        image.append("upload_preset", "hmvpqqls");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/ddpy3t4jd/image/upload",
          { method: "POST", body: image }
        );
        const imgData = await response.json();
        imageURL = imgData.url.toString();
      }

      const formData = {
        name: profile.name,
        phone: profile.phone,
        bio: profile.bio,
        photo: imageURL,
        destinations: profile.destinations,
      };

      const data = await updateUser(formData);
      console.log(data);
      toast.success("User updated");
      navigate("/profile");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile --my2">
      {isLoading && <Loader />}

      <Card cardClass={"card --flex-dir-column"}>
        <span className="profile-photo">
          <img src={user?.photo} alt="profilepic" />
        </span>
        <form className="--form-control --m" onSubmit={saveProfile}>
          <span className="profile-data">
            <p>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={profile?.name}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Email:</label>
              <input type="text" name="email" value={profile?.email} disabled />
              <br />
              <code>Email cannot be changed.</code>
            </p>
            <p>
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={profile?.phone}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Bio:</label>
              <textarea
                name="bio"
                value={profile?.bio}
                onChange={handleInputChange}
                cols="30"
                rows="10"
              ></textarea>
            </p>
            <p>
              <label>Photo:</label>
              <input type="file" name="image" onChange={handleImageChange} />
            </p>
            <p>
              <label>Destinations:</label>
              <input
                type="text"
                name="destination"
                value={destination}
                onChange={handleDestinationChange}
              />
              <input
                type="number"
                name="rating"
                value={rating}
                onChange={handleRatingChange}
                min={1}
                max={10}
              />
              <button type="button" onClick={addDestination}>
                {editIndex !== -1 ? "Save" : "Add"}
              </button>
            </p>
            {profile.destinations.map((destination, index) => (
              <div key={index}>
                <p>Destination: {destination.destination}</p>
                <p>Rating: {destination.rating}</p>
                <button type="button" onClick={() => editDestination(index)}>
                  Edit
                </button>
                <button type="button" onClick={() => deleteDestination(index)}>
                  Delete
                </button>
              </div>
            ))}
            <div>
              <button className="--btn --btn-primary">Edit Profile</button>
            </div>
          </span>
        </form>
      </Card>
      <br />
    </div>
  );
};

export default EditProfile;
