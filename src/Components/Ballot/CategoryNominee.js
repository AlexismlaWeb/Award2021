// Initialisation du composant CategoryNominee
// Ce composant affiche les noms des candidats pour une catégorie donnée
// Il est appelé par le composant Ballot.js

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";

const CategoryNominee = (props) => {
  const [nominee, setNominee] = useState(props.nominees);
  const [nomineeSelected, setNomineeSelected] = useState([]);

  useEffect(async () => {
    // const SetSelectNominee = () => {
    //   for (let i = 0; i < nominee.length; i++) {
    //     // console.log(nominee[i]);
    //     for (let j = 0; j < nominee[i].items.length; j++) {
    //       nominee[i].items[j].like = false;
    //     }
    //   }
    // };
    // SetSelectNominee();
  }, []);

  const LikedNominee = (elm, category) => {
    if (nomineeSelected.length === 0) {
      setNomineeSelected({
        ...nomineeSelected,
        category: category,
        id: elm.id,
      });
    } else if (nomineeSelected.id === elm.id) {
      setNomineeSelected([]);
    }
    console.log("nomineeSelected", nomineeSelected.length);
  };

  if (props.nominees.length > 0) {
    const nominees = props.nominees.find((ok) => ok.title === props.category);

    // MAP ALL NOMINEES
    const mapAllNominees = nominees.items.map((elm, index) => {
      return (
        <div key={index} className="categoryNominee">
          <img src={elm.photoUrL} alt="nominee" className="img" />
          <p className="title">{elm.title}</p>
          {nomineeSelected.id === elm.id ? (
            <FontAwesomeIcon
              key={index}
              icon={faCheck}
              type="button"
              className="Button"
              onClick={() => {
                LikedNominee(elm, props.category);
              }}
            />
          ) : (
            <FontAwesomeIcon
              key={index}
              icon={faPlus}
              type="button"
              onClick={() => {
                LikedNominee(elm, props.category);
              }}
              className="Button"
            />
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
