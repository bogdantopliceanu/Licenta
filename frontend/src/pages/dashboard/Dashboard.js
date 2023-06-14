import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getDestinations } from "../../redux/features/destination/destinationSlice";
import DestinationCard from "../../components/destination/destinationCard/DestinationCards";

const Dashboard = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { destinations, isLoading, isError, message } = useSelector(
    (state) => state.destination
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getDestinations());
    }


    
    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <DestinationCard  destinations={destinations} isLoading={isLoading} />
    </div>
  );
};

export default Dashboard;