/* eslint-disable react/prop-types */
import { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

let initialLabels = [];

function createLabels(row) {
  if (row >= initialLabels.length) {
    initialLabels.push({
      row,
      value: '-1'
    });
  }
  return initialLabels;
}

const radios = [
  // { name: '?', value: '-1', variant: 'outline-info' },
  { name: 'X', value: '0', variant: 'outline-danger' },
  { name: '-', value: '1', variant: 'outline-secondary' },
  { name: 'V', value: '2', variant: 'outline-success' },
];

var nbItems = 0;

function MyToggleButton({row, col}) {
  // let [labels, setLabelsValue] = useState(['-1']);
  // console.log("labels", labels)
  // const [labels, setLabels] = useState(createLabels(row));
  const [label, setLabel] = useState('0');

  //const _row = row;
  //console.log("label0", row, nbItems, label)


  //console.log("label1", row, nbItems, label)

  return (
    <>
      <ButtonGroup>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={`${row}_${idx}`}
            id={`radio-${row}-${idx}`}
            type="radio"
            variant={radio.variant}
            name="radio"
            value={radio.value}
            checked={label == radio.value}
//             onChange={(e) => {
//               setLabel(e.currentTarget.value)
//               console.log("e", e)
// // //              console.log("e.target.checked", e.target.checked)
// //               e.target.checked = (e.currentTarget.value == e.target.value)
// //               console.log("e.currentTarget.value", e.currentTarget.value)
// //               console.log("e.target.checked", e.target.checked)
// //               // console.log("labels", labels)
// //               // labels[row].value = e.currentTarget.value; 
// //               // setLabels(labels)
// //               // setLabels(e.currentTarget.value)
//                     }}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </>
  );
}

export default MyToggleButton;