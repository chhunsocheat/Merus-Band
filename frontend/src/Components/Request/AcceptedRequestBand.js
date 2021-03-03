import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import "./request.css";
const PendingRequestBand = ({ reqInfo }) => {
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
          <Button color="green">You have accepted the offer</Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default React.memo(PendingRequestBand);
