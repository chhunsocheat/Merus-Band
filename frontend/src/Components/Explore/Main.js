import React, { useEffect, useState } from "react";
import BelowCategory from "./BelowCategory";
import axios from "axios";
import { useSelector } from "react-redux";
// import {returnLoggedInName} from "../util/utils"
import MultipleSlider from "./Carousel/MultipleSlide";
const Main = () => {
  const [client, setClient] = useState({});
  const loginBandState = useSelector((state) => {
    return state.loginBandState;
  });
  const user = useSelector((state) => {
    return state.user;
  });
  const band = useSelector((state) => {
    return state.band;
  });
  function returnLoggedInClientName() {
    if (loginBandState) return band.username;
    return user.username;
  }
  function returnLoggedInClient() {
    if (loginBandState) {
      setClient(band);
    } else setClient(user);
  }
  const clientName = returnLoggedInClientName();
  async function loadData() {
    console.log(clientName)
    const data = await axios.get(`https://bandquest-bandend.herokuapp.com/users/${clientName}`);
    //(data);
  }
  useEffect(() => {
    loadData();
    returnLoggedInClient();
  }, []);

  return (
    <div>
      <BelowCategory client={client} />
      {/* All band slide */}
      <MultipleSlider />
    </div>
  );
};

export default Main;
