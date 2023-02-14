import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import axios from "axios";

const Card = ({ track, userid,show,onHomeRouteChange}) => {
  const [isFav, setFav] = useState("false");

  const onFavBtnClick = async () => {
    // console.log(this.props.user.userid);
    const song = {
      id: track.data.id,
      name: track.data.name,
      artistname: track.data.artists.items[0].profile.name,
      imgurl: track.data.albumOfTrack.coverArt.sources[1].url,
      uri: track.data.uri,
      userid: userid,
    };

    await axios
      .post(`http://localhost:3001/addToFav`, song)
      .then((res) => {
        console.log(res);
        setFav(true);
      })
      .catch((error) => {
        // Error
        if (error.response) {
          // this.setState({msg : error.response.data})
          // console.log(this.state);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the
          // browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
    // console.log(error.config);
  };

  const onRemoveBtnClick = async () => {
    // console.log(this.props.user.userid);
    
    const song = {
      id: show === "all" ? track.data.id : track.id,
      userid: userid,
  }
    await axios
      .delete(`http://localhost:3001/removeFromFav`, {        
        data: song,
      })
      .then((res) => {
        console.log(res);        
        show === "favourites" ? onHomeRouteChange('favourites') :  setFav(false);
      })
      .catch((error) => {
        // Error
        if (error.response) {
          // this.setState({msg : error.response.data})
          console.log(error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the
          // browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
    // console.log(error.config);
  };

  const checkFav = async () => {
    const song = {
      id: track.data.id,
      userid: userid,
    };

    await axios
      .post(`http://localhost:3001/checkFav`, song)
      .then(async (res) => {
        await setFav(res.data);
        console.log(isFav);
      })
      .catch((error) => {
        // Error
        if (error.response) {
          console.log(this.state);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the
          // browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  };

  useEffect(() => {
    if (show === "all") {
      checkFav();
    }    
  }, [isFav]);
    return (
    show === "favourites" 
    ?
    <div className="d-flex p-4 border flex-row w-100">
    <img
      src={track.imgurl}
      alt={track.name}
    />
    <div className="px-4 text-start">
      <h4 className="font-weight-bold">{track.name}</h4>
      <p>{track.artistname}</p>
      <a href={track.uri}> play</a>
    </div>    
      <Button variant="info" onClick={onRemoveBtnClick} className="ml-auto">
        Remove from Favourites
      </Button>    
  </div>
    :
    <div className="d-flex p-4 border flex-row w-100">
      <img
        src={track.data.albumOfTrack.coverArt.sources[1].url}
        alt={track.data.name}
      />
      <div className="px-4 text-start">
        <h4 className="font-weight-bold">{track.data.name}</h4>
        <p>{track.data.artists.items[0].profile.name}</p>
        <a href={track.data.uri}> play</a>
      </div>
      {isFav ? (
        <Button variant="info" onClick={onRemoveBtnClick} className="ml-auto">
          Remove from Favourites
        </Button>        
      ) : (
        <Button variant="info" onClick={onFavBtnClick} className="ml-auto">
          Add to Favourites
        </Button>
      )}
    </div>
  );
};

export default Card;
