import { useState } from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  //Configure,
  useConfigure,
  Stats,
} from "react-instantsearch";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, OverlayTrigger, Tooltip, Badge } from "react-bootstrap";

import "bootstrap-icons/font/bootstrap-icons.css";

import "./App.css";
import "./components/hit-card";
import HitCard from "./components/hit-card";
import appConfig from "./AppConfig";

const searchClients = [];
const indexNames = [];
const indexTitles = [];

for (const conf of appConfig.indices) {
  //console.log("conf", conf);
  searchClients.push(algoliasearch(conf.appId, conf.apiKey));
  indexNames.push(conf.indexName);
  indexTitles.push(conf.indexTitle);
}

const ButtonTooltip = ({ id, children, title }) => (
  <OverlayTrigger
    placement="bottom"
    overlay={
      <Tooltip style={{ marginTop: "1rem" }} id={id}>
        {title}
      </Tooltip>
    }
  >
    <a>{children}</a>
  </OverlayTrigger>
);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const nbHits = appConfig.nbHits;
const emptyState = [...Array(nbHits).keys()].map((idx) => {
  return { id: idx.toString(), value: "?" };
});

function CustomConfigure(props) {
  // eslint-disable-next-line no-unused-vars
  const { refine } = useConfigure(props);
  return null;
}

function App() {
  const _table = [];
  for (let i = 0; i < appConfig.indices.length; i++) {
    _table.push(emptyState);
  }
  const [stateTable, setStateTable] = useState(_table);
  const [query, setQuery] = useState("");

  function processLabellingHeader() {
    //console.log("Labelling", stateTable);
    const sep = "|";
    let csv =
      "#" +
      sep +
      "query" +
      sep +
      "objectID" +
      sep +
      "title" +
      sep +
      "Labelling value" +
      sep +
      "imageLink" +
      sep +
      "#row (hits)" +
      sep +
      "nbHits" +
      sep +
      "processingTimeMS" +
      sep +
      "model x index tested" +
      "\n";
    navigator.clipboard.writeText(csv);
  }

  function processLabelling() {
    //console.log("Labelling", stateTable);
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
          (idxRow + 1) +
          sep +
          row.nbHits +
          sep +
          row.processingTimeMS +
          sep +
          indexTitles[idxCol] +
          "\n";
      });
    });
    navigator.clipboard.writeText(csv);
  }

  function resetTable() {
    _table.length = 0;
    for (let i = 0; i < appConfig.indices.length; i++) {
      _table.push(emptyState);
    }
    setStateTable(_table);
  }

  function onUpdateTableItem(e) {
    setStateTable((state) => {
      const newState = state.map((col, idx) => {
        const _col = idx;
        return col.map((row) => {
          if (row.id == this.row && _col == this.col) {
            return (row = { ...row, value: e.target.value });
          } else {
            return row;
          }
        });
      });

      return newState;
    });
  }

  var _query = "";
  const queryHook = (_q, search) => {
    _query = _q;
  };
  const runQuery = (event) => {
    if (_query === query) return;
    resetTable();
    sleep(100);
    setQuery(_query);
  };
  return (
    <>
      <InstantSearch searchClient={searchClients[0]} indexName={indexNames[0]}>
        <Container
          fluid="md"
          className="sticky-top"
          style={{ backgroundColor: "white" }}
        >
          <Row>
            <Col md="12">
              <h1>Labelling App</h1>
            </Col>
            <Col md="11">
              <SearchBox
                queryHook={queryHook}
                // searchAsYouType={false}
                onSubmit={(event) => {
                  runQuery(event);
                }}
              />
            </Col>
            <Col md="1" style={{ padding: "0" }}>
              <ButtonTooltip title="Copy labelling results into clipboard ( CSV format with separator | )">
                <Button
                  variant="warning"
                  style={{ marginRight: "0.25rem" }}
                  onClick={(e) => {
                    processLabelling();
                  }}
                >
                  <i className="bi bi-table"></i>
                </Button>
              </ButtonTooltip>
              <ButtonTooltip title="Copy CSV header into clipboard">
                <Button
                  variant="info"
                  onClick={(e) => {
                    processLabellingHeader();
                  }}
                >
                  <i className="bi bi-card-heading"></i>
                </Button>
              </ButtonTooltip>
            </Col>
          </Row>
          <Row
            style={{
              textAlign: "left",
              paddingTop: "0.25rem",
              paddingBottom: "0.5rem",
              fontSize: "small",
            }}
          >
            {query ? (
              <span>
                <i>
                  Results for: <span>{query}</span>
                </i>
              </span>
            ) : (
              <span>
                <i>Results for Empty Search</i>
              </span>
            )}
          </Row>
          <Row>
            {_table.map((item, idx) => (
              <Col
                key={`col-table-${idx}-2`}
                style={{
                  width: "20%",
                  padding: "0.25rem",
                }}
                className="border"
              >
                <Badge className="float-start" bg="success">
                  {idx + 1}
                </Badge>
                <div style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
                  <h5>{searchClients[idx].appId}</h5>
                  <span>{indexTitles[idx]}</span>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </InstantSearch>
      <Container>
        <Row>
          {_table.map((item, idx) => (
            <Col
              key={`col-table-${idx}`}
              style={{
                width: "20%",
                padding: "0.25rem",
              }}
              className="border"
            >
              <InstantSearch
                key={`is-${idx}`}
                searchClient={searchClients[idx]}
                indexName={indexNames[idx]}
              >
                <CustomConfigure
                  query={query}
                  enableRules={false}
                  analytics={false}
                  filters=""
                  getRankingInfo={true}
                  hitsPerPage={nbHits}
                  key={`cfg-table-${idx}`}
                />
                <Stats
                  className="statsAlgolia"
                  style={{
                    marginTop: "0.25rem",
                    marginBottom: "0.25rem",
                    fontSize: "small",
                  }}
                  translations={{
                    rootElementText({ nbHits, processingTimeMS }) {
                      stateTable[idx].map((row) => {
                        row.processingTimeMS = processingTimeMS;
                        row.nbHits = nbHits;
                        return row;
                      });

                      return `(${nbHits.toLocaleString()} results found in ${processingTimeMS.toLocaleString()}ms)`;
                    },
                  }}
                />
                <Hits
                  key={`hits-table-${idx}`}
                  style={{ marginLeft: "-1px" }}
                  hitComponent={({ hit }) => {
                    let img = "";
                    if (hit.pictures && hit.pictures.length > 0) {
                      hit.img =
                        "https://image.darty.com/server?type=image&source=" +
                        hit.pictures[0].algoliaPict;
                    }
                    hit._title = eval(appConfig.indices[idx].rowTitle);
                    hit._tag1 = appConfig.indices[idx].rowTag1
                      ? eval(appConfig.indices[idx].rowTag1)
                      : null;
                    hit._tag2 = appConfig.indices[idx].rowTag2
                      ? eval(appConfig.indices[idx].rowTag2)
                      : null;
                    //hit._description = hit.pointsForts;

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
