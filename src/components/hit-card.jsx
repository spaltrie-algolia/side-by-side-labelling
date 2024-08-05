/* eslint-disable react/prop-types */
// import Button from 'react-bootstrap/Button';
import React from "react";
import Card from "react-bootstrap/Card";
import MyToggleButton from "./my-toggle-button";
import Badge from "react-bootstrap/Badge";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function RankingInfo({ ri }) {
  return (
    <div>
      <React.Fragment>
        <span>
          userScore &emsp;
          <Badge className="float-end bg-secondary">{ri.userScore}</Badge>
        </span>
        <br />
      </React.Fragment>

      {ri.keywordScore !== undefined && (
        <React.Fragment>
          <span>
            keywordScore &emsp;
            <Badge className="float-end bg-danger">
              {Number(ri.keywordScore).toFixed(2)}
            </Badge>
          </span>
          <br />
        </React.Fragment>
      )}
      {ri.semanticScore !== undefined && (
        <React.Fragment>
          <span>
            semanticScore &emsp;
            <Badge className="float-end bg-primary">
              {Number(ri.semanticScore).toFixed(2)}
            </Badge>
          </span>
          <br />
        </React.Fragment>
      )}
      {ri.neuralScore !== undefined && (
        <React.Fragment>
          <span>
            neuralScore &emsp;
            <Badge className="float-end bg-primary">
              {Number(ri.neuralScore).toFixed(2)}
            </Badge>
          </span>
          <br />
        </React.Fragment>
      )}
      {/* {ri.mergeInfo !== undefined && (
        <React.Fragment>
          <span>mergeInfo: {JSON.stringify(ri.mergeInfo)}</span><br />
        </React.Fragment>
      )} */}
    </div>
  );
}

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

    const ri = this.hit._rankingInfo;
    const popover = (
      <Popover>
        <Popover.Body>
          <RankingInfo ri={ri} />
        </Popover.Body>
      </Popover>
    );
    console.log("ri:", this.hit._rankingInfo);
    let badgeBg = "";
    let badgeLabel = "";
    if (ri["keywordScore"] !== undefined) {
      badgeBg = "danger";
      badgeLabel = "Keyword";
    }
    if (ri["neuralScore"] !== undefined || ri["semanticScore"] !== undefined) {
      badgeBg = "primary";
      badgeLabel = "Neural";
    }
    if (
      ri["keywordScore"] !== undefined &&
      (ri["neuralScore"] !== undefined || ri["semanticScore"] !== undefined)
    ) {
      badgeBg = "warning";
      badgeLabel = "Key+Neural";
    }

    const Link = ({ id, children, title }) => (
      <OverlayTrigger
        placement="right"
        overlay={<Tooltip id={id}>{title}</Tooltip>}
      >
        <a>{children}</a>
      </OverlayTrigger>
    );
    return (
      <Card key={`card-${this.matrixCol}-${this.hit.objectID}`}>
        <Card.Header>
          <Badge className="badge-header-ranking" bg={badgeBg}>
            {badgeLabel}
          </Badge>
          <OverlayTrigger trigger="hover" placement="bottom" overlay={popover}>
            <Badge className="bg-secondary badge-header-info">Info</Badge>
          </OverlayTrigger>
          <Card.Img variant="top" src={this.hit.img} />
        </Card.Header>
        <Card.Body>
          <MyToggleButton
            col={this.matrixCol}
            row={this.matrixRow}
            key={this.hit.objectID}
            stateTable={this.stateTable}
            setStateTable={this.setStateTable}
          ></MyToggleButton>
          <Card.Title className="overflow">
            <Link title={this.hit.title}>{this.hit.title}</Link>
          </Card.Title>
          <Card.Text>
            {this.hit.brandName} |{" "}
            {this.hit.productMarketplace ? "MktPlc" : "Darty"}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="alert alert-primary">
          <span>{this.hit.objectID}</span>
          <Badge className="floatBadgeRight" bg="primary">
            #{this.matrixRow + 1}
          </Badge>
          <Badge className="floatBadgeLeft" bg="success">
            {this.matrixCol + 1}
          </Badge>
        </Card.Footer>
      </Card>
    );
  }
}

export default HitCard;
