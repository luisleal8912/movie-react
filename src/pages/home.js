import React from "react";
import { Row, Col } from "antd";
import useFetch from "../hooks/useFetch";
import SliderMovies from "../components/SliderMovies";
import { URL_API, API_KEY } from "../utils/constanst";
import MovieList from "../components/MovieList";
import Footer from "../components/Footer";

export default function Home() {
  const newMovies = useFetch(
    `${URL_API}movie/now_playing?api_key=${API_KEY}&language=es-ES&page=1`
  );
  const popularMovies = useFetch(
    `${URL_API}movie/popular?api_key=${API_KEY}&language=es-ES&page=1`
  );
  const topRateMovies = useFetch(
    `${URL_API}movie/top_rated?api_key=${API_KEY}&language=es-ES&page=1`
  );

  return (
    <>
      <SliderMovies movies={newMovies} />
      <Row>
        <Col span={12}>
          <MovieList movies={popularMovies} title="Movies popular" />
        </Col>
        <Col span={12}>
          <MovieList movies={topRateMovies} title="Top rater" />
        </Col>
      </Row>
      <Footer />
    </>
  );
}
