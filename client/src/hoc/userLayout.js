import React from "react";
import MyButton from "../services/button";

import "./userLayout.css";

const UserLayout = props => {
  const publicLinks = [
    {
      title: "User Information",
      linkTo: "/user/dashboard"
    }
  ];

  const adminLinks = [
    {
      title: "Add product",
      linkTo: "/admin/add_product"
    },
    {
      title: "Manage categories",
      linkTo: "/admin/manage_categories"
    },
    {
      title: "Articles",
      linkTo: "/admin/articles"
    }
  ];

  const generateLinks = links =>
    links.map((link, index) => (
      <div className="block-link" key={index}>
        <MyButton
          className="menu-link"
          linkTo={link.linkTo}
          text={link.title}
        />
      </div>
    ));

  return (
    <div className="main-content">
      <div className="user-menu">
        <div className="menu-block">
          <h2>My account</h2>
          {generateLinks(publicLinks)}
        </div>
        {props.userData.isAdmin ? (
          <div className="menu-block">
            <h2>Admin</h2>
            {generateLinks(adminLinks)}
          </div>
        ) : null}
      </div>
      <div className="content">{props.children}</div>
    </div>
  );
};

export default UserLayout;
