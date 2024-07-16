/* eslint-disable react/prop-types */
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import React from "react";

const radios = [
  { name: "?", value: "?", variant: "outline-info" },
  { name: "X", value: "0", variant: "outline-danger" },
  { name: "-", value: "1", variant: "outline-secondary" },
  { name: "V", value: "2", variant: "outline-success" },
];

var nb = 0;

class MyToggleButton extends React.Component {
  constructor(props) {
    super(props);
    this.row = props.row;
    this.col = props.col;
    this.objectID = props.objectID;
    this.stateTable = props.stateTable;
    this.setStateTable = props.setStateTable;

    //console.log("colRow", this.col, this.row);
    console.log("stateTable", this.stateTable);
    //    console.log('props',props)

    // this.state = {
    //   list: this.stateTable,
    // }
    //console.log("props.stateTable2: ", this.stateTable)
  }

  onUpdateItem = (e) => this.onUpdateTable(e);
  render() {
    return (
      <>
        <ButtonGroup
          style={{ width: "75%", margin: "auto" }}
          col={0}
          id={this.row}
          key={this.row}
          name={`group-${this.row}`}
        >
          {radios.map((radio, idx) => (
            <ToggleButton
              key={`${this.col}-${this.row}-${idx}`}
              id={`radio-${this.col}-${this.row}-${idx}`}
              row={this.row}
              col={this.col}
              type="radio"
              variant={radio.variant}
              name={`${this.col}-${this.row}`}
              value={radio.value}
              checked={this.stateTable[this.col][this.row].value == radio.value}
              onChange={(e) => {
                this.setStateTable(e);
              }}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </>
    );
  }
}

export default MyToggleButton;
