import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./banddetailform.css";
import { Input, Label ,Button} from "semantic-ui-react";
import SimpleModal from "./SimpleModal"
import { logoutBand } from "../../reducers/rootreducer";

import { useSelector,useDispatch } from "react-redux";
const BandDetailForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const band = useSelector((state) => {
    return state.band;
  });
  //all the state of the component
  const [modalState,setModalState] = useState(false)
  const [bandTitle, setBandTitle] = useState("");
  const [bandDescription, setBandDescription] = useState("");
  const [bandPrice, setBandPrice] = useState(0);
  const [bandPhoneNumber, setBandPhoneNumber] = useState(0);
  const [feedback, setFeedback] = useState(null);
  





 /**
  * Function to load data for the band from the server
  */
  async function loadBand() {
    const bandData = await axios.get(
      `https://bandquest-bandend.herokuapp.com/users/${band.username}`
    );
    return bandData;
  }
  /**
   * Function that will submit the information to the server
   * @param {Event} e 
   */
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      
    
    const bandData = await axios.post(
      "https://bandquest-bandend.herokuapp.com/moredetail/adddetail",
      {
        username: band.username,
        bandTitle,
        bandDescription,
        bandPrice,
        bandPhoneNumber
      },
      {
        headers: {
          Authorization: `Bearer ${band.accessToken}`,
        },
      }
    );
    console.log(bandData);
  
    if (bandData.status === 201) {
      setFeedback("Please Fill in the Required Fields");
    } else {
      history.push(`/band/${band.username}`);
    }
  } catch (error) {
    switch (error.response.status) {
      case 403:
        dispatch(
          logoutBand({ bandDetail: { username: "anonymous" }, loginBandState: false })
      );
        setModalState(true)
        setFeedback("You need to login again");
        break
      default:
          break
   }
  }
  };
  useEffect(() => {
    loadBand().then((res) => {
      const bandData = res.data.description;
      setBandTitle(bandData.bandTitle);
      setBandDescription(bandData.bandDescription);
      setBandPrice(bandData.bandPrice);
      setBandPhoneNumber(bandData.bandPhoneNumber)
    });
  }, []);
  return (
    <form className="form-container" action="">
      <h1>{band.username} Details</h1>
      <label htmlFor="title">Short Title About Your Band</label>
      <div className="form-group">
        <input
          type="title"
          name="bandTitle"
          className="form-control"
          placeholder="Title"
          maxlength="30"
          value={bandTitle}
          onChange={(e) => {
            setBandTitle(e.target.value);
          }}
        />
      </div>
      <label htmlFor="description">Description About the Band</label>
      <div className="form-group">
        <input
          type="text"
          maxlength="40"

          className="form-control"
          placeholder="Description"
          value={bandDescription}
          onChange={(e) => {
            setBandDescription(e.target.value);
          }}
        />
      </div>
      <label htmlFor="username">Your Base Price in AUD</label>
      <div className="form-group">
        <Input
          label="AUD"
          type="value"
          name="price"
          placeholder="Your Price"
        >
          <Label basic>$</Label>
          <input
            value={bandPrice}
            onChange={(e) => {
              setBandPrice(e.target.value);
            }}
          />
          <Label>.00</Label>
        </Input>
      </div>

      <label htmlFor="username">Your Phone Number</label>
      <div className="form-group">
        <Input
          label="AUD"
          type="value"
          name="phone"
          placeholder="Your Price"
        >
          <Label basic>+61</Label>
          <input
            value={bandPhoneNumber}
            onChange={(e) => {
              setBandPhoneNumber(e.target.value);
            }}
          />
        </Input>
      </div>

      {/* <label htmlFor="genre">Genre</label>

            <div className="form-group">
              <input type="text"
              name="genre"
                className="form-control"
                placeholder="Your Genre"
                value={genre}
                // onChange={handleGenreChange}
              />
            </div> */}
      <p>{feedback}</p>
      {modalState?
      <SimpleModal modalState={modalState}/>:<></>
    }
      <Button color="green" onClick={submitHandler}>Submit</Button>
    </form>
  );
};

export default BandDetailForm;
