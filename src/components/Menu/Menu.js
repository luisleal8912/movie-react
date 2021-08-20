import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assest/img/logo.svg";

import "./Menu.scss";
import { styles } from "ansi-colors";

export default function MenuTop() {
  return (
    <div className="menu">
      <div className="menu__logo">
        <Logo></Logo>
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        style={{ lineHeight: "64px" }}
      >
        <Menu.Item key="1">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/new-movies">New movies</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/popular">Popular</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/search">Seacrh movies</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
}
