import React, { useState } from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios"
import faker from "faker"
import "./request.css";
const PendingRequestUser = ({ reqInfo }) => {
  const [declineState, setDeclineState] = useState("Delete Request")
  const [deleteStatus, setDeleteStatus] = useState(false)
  const band = useSelector((state) => {
    return state.band;
  });
  async function deleteRequest() {
    const res = await axios.post(
      `http://localhost:3001/requests/declinerequest`, {
      id: reqInfo._id
    }
    );
    setDeclineState("Request Deleted")
  }



  useEffect(() => {
    //(reqInfo._id);
    //(faker.lorem.sentence());
  }, [reqInfo]);

  return (
    <Card>
      <Card.Content>
        <a style={{ textDecoration: "none", color: "black" }} href={`/user/${reqInfo.requestedToUsername}`}>
          <Image
            className="reqPro"
            floated="right"
            size="mini"
            src={`https://robohash.org/${reqInfo.requestedToUsername}`}
          />
        </a>
        <Card.Header>
          <a style={{ textDecoration: "none", color: "black" }} href={`/user/${reqInfo.requestedToUsername}`}>
            To: {reqInfo.requestedToUsername}
          </a>
        </Card.Header>
        <Card.Meta>From: {reqInfo.requestedByUsername}</Card.Meta>

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
          <Button disabled color="green">Pending</Button>
          {deleteStatus===false ?
            <Button onClick={() => {
              deleteRequest()
              setDeleteStatus(e=>!e)
            }} color="red">{declineState}</Button>
            :
            <Button disabled color="red">{declineState}</Button>

          }
        </div>
      </Card.Content>
    </Card>
  );
};

export default React.memo(PendingRequestUser);
