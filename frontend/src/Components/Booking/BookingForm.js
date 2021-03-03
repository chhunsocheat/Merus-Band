import React, { useEffect, useRef } from "react";
import axios from "axios";
import {useHistory} from "react-router-dom"
import { useState } from "react";
import Datetime from "react-datetime";
import { useSelector } from "react-redux";
import { Input, Label, Button, Popup, Icon } from "semantic-ui-react";
import { Form, TextArea } from "semantic-ui-react";
import {useParams} from "react-router-dom"
import moment from "moment";
const BookingForm = () => {
  const {username} = useParams()
  const history = useHistory();
  const [offerPrice, setOfferPrice] = useState(0);
  const [requestMessage, setRequestMessage] = useState("");
  const [location,setLocation] = useState("")
  const focus = useRef();
  const [date, setDate] = useState("");
  const [feedback, setFeedback] = useState(null);

  const user = useSelector((state) => {
    return state.user;
  });
  const band = useSelector((state) => {
    return state.band;
  });
  /**
   * Function to load data from the band
   */
  async function loadBand() {
    const bandData = await axios.get(
      `http://localhost:3001/users/${band.username}`
    );

    return bandData;
  }
  /**
   * Function to submit the booking information 
   * and verify if the user has enter all the required field.
   * @param {Event} e 
   */
  async function submitBooking(e){
    e.preventDefault();
    const bandData = await axios.post(
      "http://localhost:3001/requests/clientrequest",
      {
        username: user.username,
        bandname:username,
        offerPrice,
        requestMessage,
        location,
        date
      }
    );
    if (bandData.status === 201) {
      setFeedback("Please Fill in the Required Fields");
    } else {
      history.push(`/userrequests/${user.username}`);
    }
    //(bandData);
  }
  useEffect(() => {
    loadBand().then((res) => {
      const bandData = res.data.description;
      setOfferPrice(bandData.bandPrice);
    });
  }, []);
  return (
    <div className="bookingFormContainer">
      <Form action="">
        <h1>Band Booking Form</h1>
        <label htmlFor="date">Date For The Event</label>
        <Datetime
          onChange={(e) => {
            //(e);
            const date=moment(e._d).format("dddd, MMMM Do YYYY, h:mm:ss a")
            //();
            setDate(date);
          }}
        />
        <label style={{ margin: "10px" }} htmlFor="username">
          Band Base Price in AUD
        </label>
        <Popup
          content="This is the band base price. You can offer more or less. If it's 0 the band hasn't set their price yet."
          trigger={<Icon circular name="info" />}
        />
        <div className="form-group">
          <Input label="AUD" type="value" name="price" placeholder="Your Price">
            <Label basic>$</Label>
            <input
              value={offerPrice}
              onChange={(e) => {
                setOfferPrice(e.target.value);
              }}
            />
            <Label>.00</Label>
          </Input>
        </div>
        <div className="form-group">
          <Input label="Location" type="value" name="location" placeholder="Event Location">
            <Label basic>Sydney</Label>
            <input
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
          </Input>
        </div>
        <TextArea
          ref={focus}
          onChange={(e, d) => {
            //(e);
            setRequestMessage(d.value);
          }}
          placeholder="Any message you want to send to the band, you can write it here"
        />
        {/*          
        <button
          onClick={(e) => {
            e.preventDefault();
            //(moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a"));
          }}
        >
          Check1
        </button> */}
        <p>{feedback}</p>
        <Button onClick={submitBooking} basic color="green" content="Request Now" />
      </Form>
    </div>
  );
};

export default BookingForm;
