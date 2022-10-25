// Initialisation du composant CategoryNominee
// Ce composant affiche les noms des candidats pour une catégorie donnée
// Il est appelé par le composant Ballot.js

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";

const CategoryNominee = (props) => {
  const [nomineeSelected, setNomineeSelected] = useState([]);

  const LikedNominee = (elm, category) => {
    if (nomineeSelected.length === 0 || nomineeSelected.id !== elm.id) {
      setNomineeSelected({
        category: category,
        id: elm.id,
        title: elm.title,
      });
    } else if (nomineeSelected.id === elm.id) {
      setNomineeSelected([]);
    }
  };

  useEffect(() => {
    const SendToParent = () => {
      if (nomineeSelected.length !== 0) {
        props.parentCallback(nomineeSelected);
      }
    };
    SendToParent();
  }, [nomineeSelected]);

  if (props.nominees.length > 0) {
    const nominees = props.nominees.find((ok) => ok.title === props.category);

    // MAP ALL NOMINEES
    const mapAllNominees = nominees.items.map((elm, index) => {
      return (
        <div className="categoryNominee" key={index}>
          {nomineeSelected.id === elm.id ? (
            <div key={index} className="categoryNomineeSelected">
              <img src={elm.photoUrL} alt="nominee" className="img" />
              <p className="title">{elm.title}</p>
              <FontAwesomeIcon
                key={index}
                icon={faCheck}
                type="button"
                className="ButtonSelected"
                onClick={() => {
                  LikedNominee(elm, props.category);
                  // handleClick();
                }}
              />
            </div>
          ) : (
            <div key={index}>
              <img src={elm.photoUrL} alt="nominee" className="img" />
              <p className="title">{elm.title}</p>
              <FontAwesomeIcon
                key={index}
                icon={faPlus}
                type="button"
                onClick={() => {
                  // handleClick();
                  LikedNominee(elm, props.category);
                }}
                className="Button"
              />
            </div>
          )}
        </div>
      );
    });

    return (
      <div className="page">
        <h1 className="TitleCategory">Category : {props.category}</h1>
        <div className="Awards">{mapAllNominees}</div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default CategoryNominee;
