import React, { useState, useEffect } from "react";
import axios from "axios";
import "./banddetailform.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "semantic-ui-react";

const BandPerformanceForm = () => {
  const history = useHistory();
  const band = useSelector((state) => {
    return state.band;
  });
  //All the state of this component
  const [bandVdoUrl, setBandVdoUrl] = useState("");
  const [bandVdoTitle, setBandVdoTitle] = useState("");
  const [bandVdoDescription, setBandVdoDescription] = useState("");
  const [feedback, setFeedback] = useState(null);
 /**
  * function to load band data
  */
  async function loadBand() {
    const bandData = await axios.get(
      `http://localhost:3001/users/${band.username}`
    );
    return bandData;
  }
  /**
   * Function to Submit the information regarding the performance.
   * @param {Event} e 
   */
  const submitHandler = async (e) => {
    e.preventDefault();
    const bandData = await axios.post(
      "http://localhost:3001/moredetail/addvdourl",
      {
        username: band.username,
        vdoUrl: bandVdoUrl,
        vdoTitle:bandVdoTitle,
        vdoDescription: bandVdoDescription,
      }
    );
    if (bandData.status === 201) {
      setFeedback("Please Fill in the Required Fields");
    } else {
      history.push(`/band/${band.username}`);
    }
    //(bandData);
  };
  useEffect(() => {
    loadBand().then((res) => {});
  }, []);
  return (
    <form className="form-container" action="">
      <h1>{band.username}'s Performance on Youtube</h1>
      <label htmlFor="title">Youtube Url</label>
      <div className="form-group">
        <input
          type="title"
          name="bandTitle"
          className="form-control"
          placeholder="Video Url"
          value={bandVdoUrl}
          onChange={(e) => {
            setBandVdoUrl(e.target.value);
          }}
        />
      </div>
      <label htmlFor="title">Title of the Performance</label>
      <div className="form-group">
        <input
          maxlength="30"
          type="text"
          className="form-control"
          placeholder="Video Title"
          value={bandVdoTitle}
          onChange={(e) => {
            setBandVdoTitle(e.target.value);
          }}
        />
      </div>
      <label htmlFor="description">Description of the Performance</label>
      <div className="form-group">
        <input
          maxlength="30"
          type="text"
          className="form-control"
          placeholder="Video Description"
          value={bandVdoDescription}
          onChange={(e) => {
            setBandVdoDescription(e.target.value);
          }}
        />
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
      <Button color="green" onClick={submitHandler}>
        Submit
      </Button>
    </form>
  );
};

export default BandPerformanceForm;
