import React, { useState, useEffect } from "react";
import { Input, Row, Col } from "antd";
import { withRouter } from "react-router-dom";
import QueryString from "query-string";
import MovieCatalog from "../../components/MovieCatalog";
import Footer from "../../components/Footer";
import { API_KEY, URL_API } from "../../utils/constanst";

import "./search.scss";
function Search(props) {
  const { location, history } = props;
  const [movieList, setMovieList] = useState([]);
  const [seacrhValue, setSeacrhValue] = useState("");

  useEffect(() => {
    (async () => {
      const search = QueryString.parseUrl(location.search);
      const { s } = search.query;
      const response = await fetch(
        `${URL_API}search/movie?api_key=${API_KEY}&language=es-ES&query=${s}&page=1`
      );
      const movies = await response.json();
      setMovieList(movies);
      setSeacrhValue(s);
    })();
  }, [location.search]);

  const onChangeSearch = (e) => {
    const urlParams = QueryString.parse(location.search);
    urlParams.s = e.target.value;
    history.push(`?${QueryString.stringify(urlParams)}`);
    setSeacrhValue(e.target.value);
  };
  return (
    <Row>
      <Col span={12} offset={6} className="search">
        <h1>seacrh to movie</h1>
        <Input value={seacrhValue} onChange={onChangeSearch}></Input>
      </Col>
      {movieList.results && (
        <Row>
          <Col span={24}>
            <Row>
              <MovieCatalog movies={movieList} />
            </Row>
          </Col>
        </Row>
      )}
      ;
      <Col span={24}>
        <Footer />
      </Col>
    </Row>
  );
}

export default withRouter(Search);
