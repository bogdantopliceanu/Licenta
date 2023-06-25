import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import DestinationForm from "../../components/destination/destinationForm/DestinationForm";
import {
  createDestination,
  selectIsLoading,
} from "../../redux/features/destination/destinationSlice";

const initialState = {
  name: "",
  country: "",
};

const AddDestination = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(initialState);
  const [destinationImage, setDestinationImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");
  const [things_to_do, setThings_to_do] = useState("");

  const isLoading = useSelector(selectIsLoading);

  const { name, country } = destination;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDestination({ ...destination, [name]: value });
  };

  const handleCountryChange = (e) => {
    const { value } = e.target;
    setDestination({ ...destination, country: value });
  };

  const handleImageChange = (e) => {
    setDestinationImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveDestination = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("country", country);
    formData.append("things_to_do", things_to_do);
    formData.append("description", description);
    formData.append("image", destinationImage);

    await dispatch(createDestination(formData));

    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />} 
      <h3 className="--mt">Add New Destination</h3>
      <DestinationForm
        destination={destination}
        destinationImage={destinationImage}
        imagePreview={imagePreview}
        things_to_do={things_to_do}
        setThings_to_do={setThings_to_do}
        description={description}
        setDescription={setDescription}
        country={country}
        handleCountryChange={handleCountryChange}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveDestination={saveDestination}
      />
    </div>
  );
};

export default AddDestination;
