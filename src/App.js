import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//pages
import Error404 from "./pages/error404";
import Home from "./pages/home";
import Movie from "./pages/movie";
import NewMovie from "./pages/new-movies";
import Popular from "./pages/popular";
import Search from "./pages/search";
import MenuTop from "./components/Menu";

export default function App() {
  const { Header, Content } = Layout;
  return (
    <Layout>
      <Router>
        <Header style={{ zIndex: 1 }}>
          <MenuTop></MenuTop>
        </Header>
        <Content>
          <Switch>
            <Route path="/" exact={true}>
              <Home />
            </Route>
            <Route path="/new-movies" exact={true}>
              <NewMovie />
            </Route>
            <Route path="/popular" exact={true}>
              <Popular />
            </Route>
            <Route path="/search" exact={true}>
              <Search />
            </Route>
            <Route path="/movie/:id" exact={true}>
              <Movie />
            </Route>
            <Route path="*" exact={true}>
              <Error404 />
            </Route>
          </Switch>
        </Content>
      </Router>
    </Layout>
  );
}
