import React from "react";
import { Button, Card, Image } from "semantic-ui-react";

const CardExampleGroups = () => (
  <Card>
  <Card.Content>
    <Image
      floated='right'
      size='mini'
      src='https://robohash.org/${band.username}'
    />
    <Card.Header>Steve Sanders</Card.Header>
    <Card.Meta>Friends of Elliot</Card.Meta>
    <Card.Description>
      Steve wants to add you to the group <strong>best friends</strong>
    </Card.Description>
  </Card.Content>
  <Card.Content>
    <div className='ui two buttons'>
      <Button basic color='green'>
        Approve
      </Button>
      <Button basic color='red'>
        Decline
      </Button>
    </div>
  </Card.Content>
</Card>
);

export default CardExampleGroups;
