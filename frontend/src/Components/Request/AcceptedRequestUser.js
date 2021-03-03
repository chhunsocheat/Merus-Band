import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

import faker from "faker"
import "./request.css";
const AcceptedRequestUser = ({ reqInfo }) => {
  const band = useSelector((state) => {
    return state.band;
  });
  useEffect(() => {
    //(reqInfo);
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
        <Card.Header><a style={{ textDecoration: "none", color: "black" }} href={`/user/${reqInfo.requestedToUsername}`}>{reqInfo.requestedToUsername}</a></Card.Header>
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
          <Button color="green">The Band has accepted your offer</Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default React.memo(AcceptedRequestUser);
