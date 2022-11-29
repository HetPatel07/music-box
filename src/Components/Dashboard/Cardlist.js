import React from "react";
import Card from "./Card";

const CardList = ({tracks,userid,show,onHomeRouteChange}) => {
  const cardComponents = tracks.map((track,i) => 
        <Card key={i} track={track}  userid={userid} show={show} onHomeRouteChange = {onHomeRouteChange}/>
    ); 
  return ( 
    <div className="card-list container d-flex flex-column align-items-start m-auto w-50 mt-5">
        {cardComponents}
    </div>
  );
};

export default CardList;
