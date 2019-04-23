import React from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faEye from "@fortawesome/fontawesome-free-solid/faEye";
import faShoppingCart from "@fortawesome/fontawesome-free-solid/faShoppingCart";
import { withRouter } from "react-router-dom";
import MyButton from "../../services/button";
import { openBuyDialog } from "../../action/dialogs_actions";

const ProductCard = props => {
  return (
    <div
      className="card"
      onClick={() => props.history.push(`/article_detail/${props.article._id}`)}
    >
      <div
        className="card-image-container"
        style={{
          background: `url(${
            props.article.images[0]
              ? props.article.images[0].url
              : "https://www.losriosriverrunners.com/uploads/thumb_image_not_available.png"
          }) center no-repeat`,
          backgroundSize: "auto"
        }}
      />
      <div className="card-title">{props.article.name}</div>
      <div className="card-price" style={{ color: "#3f68f0" }}>
        {props.article.packingAndPrice[0].price}$
      </div>
      <div className="card-button-container">
        <MyButton
          text="View"
          linkTo={`/article_detail/${props.article._id}`}
          className="product-btn card-link"
          icon={<FontAwesomeIcon className="icon-card" icon={faEye} />}
        />
        <MyButton
          type="button"
          text="Buy"
          className="product-btn button-add"
          icon={<FontAwesomeIcon className="icon-card" icon={faShoppingCart} />}
          runAction={() => {
            props.openBuyDialog(props.article);
          }}
        />
      </div>
    </div>
  );
};

export default connect(
  null,
  { openBuyDialog }
)(withRouter(ProductCard));
