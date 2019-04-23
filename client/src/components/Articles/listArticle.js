import React from "react";
import "./listArticle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faTrash from "@fortawesome/fontawesome-free-solid/faTrash";
import { connect } from "react-redux";
import { removeArticle } from "../../action/product_actions";

const ListArticle = props => {
  const {
    images,
    tastes,
    packingAndPrice,
    name,
    category,
    brand,
    update,
    previousData
  } = props;
  return (
    <div className="list-article" onClick={() => update()}>
      <div
        className="list-article-section list-article-image"
        style={{
          background: `url(${images[0].url}) center no-repeat`,
          backgroundSize: "20%"
        }}
      />
      <div className="list-article-section list-article-name">{name}</div>
      <div className="list-article-section list-item-brand">{brand.name}</div>
      <div className="list-article-section list-item-category">
        {category.name}
      </div>
      <div className="list-article-section">
        {packingAndPrice.map(item => (
          <span key={item._id} style={{ width: "100%", textAlign: "center" }}>
            {item.name} - {item.price}$
          </span>
        ))}
      </div>
      <div className="list-article-section">
        {tastes.map(item => (
          <span key={item._id} style={{ width: "100%", textAlign: "center" }}>
            {item.name}
          </span>
        ))}
      </div>
      <div className="article-action-section list-article-section">
        <FontAwesomeIcon
          className="action-icon"
          icon={faTrash}
          onClick={e => {
            e.stopPropagation();
            props.removeArticle(props._id, previousData);
          }}
        />
      </div>
    </div>
  );
};

export default connect(
  null,
  { removeArticle }
)(ListArticle);
