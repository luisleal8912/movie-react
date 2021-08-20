import React, { useState } from "react";
import { Col, Row, Button } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import moment from "moment";
import useFetch from "../../hooks/useFetch";
import { API_KEY, URL_API } from "../../utils/constanst";
import Loading from "../../components/Loading";
import ModalVideo from "../../components/ModalVideo";

import "./movie.scss";

export default function Movie(props) {
  const { id } = useParams();

  const movieDetail = useFetch(
    `${URL_API}movie/${id}?api_key=${API_KEY}&language=es-ES&page=1`
  );

  if (movieDetail.loading || !movieDetail.result) {
    return <Loading />;
  }

  return <RenderMovie movie={movieDetail.result} />;
}

function RenderMovie(props) {
  const {
    movie: { title, backdrop_path, poster_path },
  } = props;

  const img = `https://image.tmdb.org/t/p/original${backdrop_path}`;

  return (
    <div className="movie" style={{ backgroundImage: `url('${img}')` }}>
      <div className="movie__dark" />
      <Row>
        <Col span={8} offset={3} className="movie__poster">
          <PosterMovie image={poster_path}></PosterMovie>
        </Col>
        <Col span={10} className="movie__info">
          <MovieDetail movie={props.movie} />
        </Col>
      </Row>
    </div>
  );
}

function PosterMovie(props) {
  const { image } = props;
  const img = `https://image.tmdb.org/t/p/original${image}`;

  return <div style={{ backgroundImage: `url('${img}')` }} />;
}

function MovieDetail(props) {
  const {
    movie: { id, title, release_date, overview, genres },
  } = props;

  const videoMovie = useFetch(
    `${URL_API}movie/${id}/videos?api_key=${API_KEY}&language=es-ES`
  );

  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const openModal = () => setIsVisibleModal(true);
  const closeModal = () => setIsVisibleModal(false);

  const renderVideo = () => {
    if (videoMovie.result && videoMovie.result.results.length > 0) {
      console.log(videoMovie.result.results);
      return (
        <>
          <Button icon={<PlayCircleOutlined />} onClick={openModal}>
            View trailer
          </Button>
          <ModalVideo
            videoKey={videoMovie.result.results[0].key}
            videoPlatform={videoMovie.result.results[0].site}
            isOpen={isVisibleModal}
            close={closeModal}
          />
        </>
      );
    }
  };

  return (
    <>
      <div className="movie__info-header">
        <h1>
          {title}
          <span>{moment(release_date, "YYYY-MM-DD").format("YYYY")}</span>
        </h1>
        {renderVideo()}
      </div>
      <div className="movie__info-content">
        <h3>General</h3>
        <p>{overview}</p>
        <h3>Genders</h3>
        <ul>
          {genres.map((gender) => (
            <li key={gender.id}>{gender.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
