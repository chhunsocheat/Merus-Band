import React, { useState } from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios"
import faker from "faker"
import "./request.css";
const PendingRequestBand = ({ reqInfo }) => {
  const [acceptState, setAcceptState] = useState("Approve")
  const [declineState, setDeclineState] = useState("Decline")
  const [acceptStatus, setAcceptStatus] = useState(false)
  const [declineStatus, setDeclineStatus] = useState(false)

  const band = useSelector((state) => {
    return state.band;
  });
  async function accepteRequest() {
    const res = await axios.post(
      `http://localhost:3001/requests/acceptrequest`, {
      id: reqInfo._id
    }
    );
    setAcceptState("You Have Accepted")
  }
  async function deleteRequest() {
    const res = await axios.post(
      `http://localhost:3001/requests/declinerequest`, {
      id: reqInfo._id
    }
    );
    setDeclineState("Request Deleted")
  }
  useEffect(() => {
    //(reqInfo);
    //(faker.lorem.sentence());
  }, [reqInfo]);

  return (
    <Card>
      <Card.Content>
        <Image
          className="reqPro"
          floated="right"
          size="mini"
          src="https://robohash.org/${band.username}"
        />
        <Card.Header><a href={`/user/${reqInfo.requestedByUsername}`}>{reqInfo.requestedByUsername}</a></Card.Header>
        <Card.Meta>To: {reqInfo.requestedToUsername}</Card.Meta>

      </Card.Content>

      <Card.Content>
        <Card.Description className="reqDes">
          <div>
            <i class="fas fa-calendar"></i>
            <strong>{reqInfo.date}</strong>
          </div>
          <div>
            <i class="fas fa-dollar-sign"></i>
            <strong>AUD {reqInfo.offerPrice}</strong>
          </div>
          <div>
            <i class="fas fa-map-marker-alt"></i>
            <strong>{reqInfo.location}</strong>
          </div>
        </Card.Description>
        <Card.Description>
          <Card.Header>Client Message</Card.Header>
          <Card.Meta>{reqInfo.requestMessage}</Card.Meta>
        </Card.Description>
      </Card.Content>
      <Card.Content>
        <div className="ui two buttons">
          {acceptStatus === false ?
            <Button onClick={() => {
              accepteRequest()
              setAcceptStatus(e => !e)
              setDeclineStatus(e=>!e)

            }} color="green">{acceptState}</Button>
            :
            <Button disabled color="green">{acceptState}</Button>
          }
          {declineStatus === false ?
            <Button onClick={() => {
              deleteRequest()
              setDeclineStatus(e=>!e)
            }} color="red">{declineState}</Button>
            :
            <Button disabled color="red">{declineState}</Button>


          }
          {/* <Button onClick={deleteRequest} color="red">{declineState}</Button> */}
        </div>
      </Card.Content>
    </Card>
  );
};

export default React.memo(PendingRequestBand);
