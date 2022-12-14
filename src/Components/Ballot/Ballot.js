import React, { useState, useEffect } from "react";

import CategoryNominee from "./CategoryNominee";
import api from "../../Api/Api";

const Ballot = () => {
  const [allBallotData, setAllBallotData] = useState([]);
  const [allNomineeSelected, setAllNomineeSelected] = useState([]);

  useEffect(async () => {
    const body = await api.getBallotData();
    setAllBallotData(body.items);
  }, []);

  const handleCallback = (childData) => {
    setAllNomineeSelected([...allNomineeSelected, childData]);
  };

  console.log("allnominee dans le papa", allNomineeSelected);

  const mapAllCategories = allBallotData.map((category, index) => {
    return (
      <CategoryNominee
        key={index}
        category={category.title}
        nominees={allBallotData}
        parentCallback={handleCallback}
      />
    );
  });

  return (
    <div className="page">
      <h1 className="BigTitle">AWARDS 2021</h1>
      <div className="Categories">{mapAllCategories}</div>
      <input
        type="button"
        className="ButtonSubmit"
        value="SUBMIT BALLOT BUTTON"
      />
    </div>
  );
};

export default Ballot;
