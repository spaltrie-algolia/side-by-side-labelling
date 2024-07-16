import { useState } from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits, Configure } from "react-instantsearch";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./App.css";
import "./components/hit-card";
import HitCard from "./components/hit-card";

const searchClients = [];
searchClients.push(
  algoliasearch("Z0YPI1PLPQ", "ced123667f21fd51c09a3b81a4ae4b30")
);
searchClients.push(
  algoliasearch("640GUGFBUQ", "59660e134b3e949a726edb8ca7586456")
);
searchClients.push(
  algoliasearch("640GUGFBUQ", "59660e134b3e949a726edb8ca7586456")
);
searchClients.push(
  algoliasearch("7IT45BYDCK", "eea86e78cd97458cc170f5b92f9b3c86")
);
searchClients.push(
  algoliasearch("7IT45BYDCK", "eea86e78cd97458cc170f5b92f9b3c86")
);

const indexNames = [];
indexNames.push("alg_neuralsearch_test_darty_prod_es6");
indexNames.push("darty_prod_es6");
indexNames.push("darty_prod_es6_minilm");
indexNames.push("darty_prod_es6_old");
indexNames.push("darty_prod_es6_conf_v2");

const colSubTitles = [];
colSubTitles.push("USE - Prod Darty");
colSubTitles.push("USE - New Config");
colSubTitles.push("MiniLM - New Config");
colSubTitles.push("GTE Tiny - New Config");
colSubTitles.push("GTE Tiny - Config Alt Weights");
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function App() {
  const _table = [];
  for (let i = 0; i < 5; i++) {
    _table.push([
      { id: "0", value: "?" },
      { id: "1", value: "?" },
      { id: "2", value: "?" },
      { id: "3", value: "?" },
      { id: "4", value: "?" },
      { id: "5", value: "?" },
      { id: "6", value: "?" },
      { id: "7", value: "?" },
      { id: "8", value: "?" },
      { id: "9", value: "?" },
    ]);
  }
  const [stateTable, setStateTable] = useState(_table);
  const [query, setQuery] = useState("");

  function processLabelling() {
    console.log("Labelling", stateTable);
    var csv = "";
    var ind = 0;
    const sep = "|";
    stateTable.map((col, idxCol) => {
      col.map((row, idxRow) => {
        csv +=
          ind++ +
          sep +
          query +
          sep +
          row.objectID +
          sep +
          row.title +
          sep +
          row.value +
          sep +
          row.imageLink +
          sep +
          idxRow +
          sep +
          colSubTitles[idxCol] +
          "\n";
      });
    });
    navigator.clipboard.writeText(csv);
  }

  function resetTable() {
    _table.length = 0;
    for (let i = 0; i < 5; i++) {
      _table.push([
        { id: "0", value: "?" },
        { id: "1", value: "?" },
        { id: "2", value: "?" },
        { id: "3", value: "?" },
        { id: "4", value: "?" },
        { id: "5", value: "?" },
        { id: "6", value: "?" },
        { id: "7", value: "?" },
        { id: "8", value: "?" },
        { id: "9", value: "?" },
      ]);
    }
    setStateTable(_table);
  }
  //resetTable();

  function onUpdateTableItem(e) {
    //console.log("onUpdateTableItem");
    //e.stopPropagation();

    setStateTable((state) => {
      const newState = state.map((col, idx) => {
        const _col = idx;
        return col.map((row) => {
          if (row.id == this.row && _col == this.col) {
            //console.log("item.id2", item.id, e.target.value)
            return (row = { ...row, value: e.target.value });
          } else {
            return row;
          }
        });
      });

      //state[this.row] = newState;
      //console.log('state after:', newState);
      return newState;
    });
  }

  // function Hit(params) {
  //   const { hit } = params;
  //   //console.log(JSON.stringify(params));
  //   let img = "";
  //   if (hit.pictures && hit.pictures.length > 0) {
  //     hit.img =
  //       "https://image.darty.com/server?type=image&source=" +
  //       hit.pictures[0].algoliaPict;
  //   }
  //   hit.title = hit.searchText;
  //   hit.description = hit.pointsForts;

  //   return (
  //     <article>
  //       <HitCard
  //         hit={hit}
  //         stateTable={stateTable}
  //         setStateTable={onUpdateTableItem}
  //         col={0}
  //         row={hit.__position - 1}
  //       ></HitCard>
  //     </article>
  //   );
  // }
  var _query = "";
  const queryHook = (_q, search) => {
    _query = _q;
    // if (_query === query) return;
    // resetTable();
    // sleep(500);
    // setQuery(_query);
    // // searchClients.map((sc, idx) => {
    // //   const index = sc.initIndex(indexNames[idx]);
    // //   index.search(query);
    // // });
    // //search(query);
  };
  const runQuery = () => {
    if (_query === query) return;
    resetTable();
    sleep(500);
    setQuery(_query);
  };
  return (
    <>
      <InstantSearch searchClient={searchClients[0]} indexName={indexNames[0]}>
        <Container fluid="md">
          <Row>
            <h1>Labelling App</h1>
            <Col md="11">
              <SearchBox
                queryHook={queryHook}
                // searchAsYouType={false}
                onSubmit={(event) => {
                  runQuery();
                }}
              />
            </Col>
            <Col md="1">
              <Button
                variant="warning"
                onClick={(e) => {
                  processLabelling();
                }}
              >
                <i className="bi bi-clipboard"></i>
              </Button>
            </Col>
          </Row>
          <Row style={{ textAlign: "left", paddingTop: "0.25rem" }}>
            {query ? (
              <h5>
                Results for: <span>{query}</span>
              </h5>
            ) : (
              <h5>Results for Empty Search</h5>
            )}
          </Row>
        </Container>
        <br />
      </InstantSearch>
      <Container>
        <Row>
          {_table.map((item, idx) => (
            <Col
              key={`col-table-${idx}`}
              style={{
                width: "20%",
                paddingLeft: "0.25rem",
              }}
            >
              <div
                style={{
                  marginBottom: "0.4rem",
                }}
              >
                <h5>{searchClients[idx].appId}</h5>
                <span>{colSubTitles[idx]}</span>
              </div>

              <InstantSearch
                key={`is-${idx}`}
                searchClient={searchClients[idx]}
                indexName={indexNames[idx]}
              >
                <Configure
                  query={query}
                  enableRules={false}
                  analytics={false}
                  filters=""
                  hitsPerPage={10}
                  key={`cfg-table-${idx}`}
                />

                <Hits
                  key={`hits-table-${idx}`}
                  hitComponent={({ hit }) => {
                    let img = "";
                    if (hit.pictures && hit.pictures.length > 0) {
                      hit.img =
                        "https://image.darty.com/server?type=image&source=" +
                        hit.pictures[0].algoliaPict;
                    }
                    hit.title = hit.searchText;
                    hit.description = hit.pointsForts;

                    return (
                      <article>
                        <HitCard
                          hit={hit}
                          stateTable={stateTable}
                          setStateTable={onUpdateTableItem}
                          matrixCol={idx}
                          matrixRow={hit.__position - 1}
                        ></HitCard>
                      </article>
                    );
                  }}
                />
              </InstantSearch>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default App;
