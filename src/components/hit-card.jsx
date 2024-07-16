/* eslint-disable react/prop-types */
// import Button from 'react-bootstrap/Button';
import React from "react";
import Card from "react-bootstrap/Card";
import MyToggleButton from "./my-toggle-button";
import Badge from "react-bootstrap/Badge";

class HitCard extends React.Component {
  constructor(props) {
    super(props);
    this.hit = props.hit;
    this.stateTable = props.stateTable;
    this.setStateTable = props.setStateTable;
    this.matrixCol = props.matrixCol;
    this.matrixRow = props.matrixRow;
  }

  render() {
    var state = this.stateTable[this.matrixCol][this.matrixRow];

    state.objectID = this.hit.objectID;
    state.imageLink = this.hit.img;
    state.title = this.hit.title;

    return (
      <Card key={`card-${this.matrixCol}-${this.hit.objectID}`}>
        <Card.Img variant="top" src={this.hit.img} />
        <Card.Body>
          <MyToggleButton
            col={this.matrixCol}
            row={this.matrixRow}
            key={this.hit.objectID}
            stateTable={this.stateTable}
            setStateTable={this.setStateTable}
          ></MyToggleButton>
          <Card.Title className="overflow">{this.hit.title}</Card.Title>
          <Card.Text>
            {this.hit.brandName} |{" "}
            {this.hit.productMarketplace ? "MktPlc" : "Darty"}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="alert alert-primary">
          <span>{this.hit.objectID}</span>
          <Badge className="floatBadgeRight" bg="primary">
            {this.matrixRow}
          </Badge>
          <Badge className="floatBadgeLeft" bg="success">
            {this.matrixCol}
          </Badge>
        </Card.Footer>
      </Card>
    );
  }
}

export default HitCard;
