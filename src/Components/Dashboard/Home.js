import React from "react";
import Nav from "./Navigation";
import axios from "axios";
import CardList from "./Cardlist";
import SearchBar from "./SearchBar";

const options = {
  method: "GET",
  url: "https://spotify23.p.rapidapi.com/search/",
  params: {
    q: "all",
    type: "tracks",
    offset: "0",
    limit: "10",
    numberOfTopResults: "5",
  },
  headers: {
    "X-RapidAPI-Key": "c126791fe5msh21dc806bd4c3d1bp1e850djsnf2922f043d47",
    "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
  },
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchField: "",
      tracks: [],
      mag: "",
      homeRoute: "",
      favSongs: [],      
    };    
  }

  onHomeRouteChange = async (route) => {  
    if(route === "favourites"){
      await this.getAllFavs();
      console.log(this.state.favSongs);
    }
    await this.setState({
      homeRoute: route,
    });
  };
  getAllFavs = async () => {
    const song = {      
      userid: this.props.user.userid,
    };
    console.log(song.userid);
    const favSongs =  await axios
      .get(`http://localhost:3001/getAllFav`, {        
        params: song,
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
      await this.setState({ favSongs : favSongs.data}, () => {
        console.log(this.state.favSongs);
      }) 
  }
  async componentDidMount() {
    const { data } = await axios.request(options).catch(function(error) {
      return [];
    });
    if (data === undefined || data === null) {
      this.setState((prevState) => {
        return { tracks: prevState.tracks };
      });
    } else {
      this.setState({
        tracks: data.tracks.items,
      });
    }
    // console.log(data);
  }
  onSearchChange = async (e) => {
    this.setState({
      searchField: e.target.value.split(" ").join("+"),
    });       
  };
  onSearchClick = async (e) => { 
    this.loadData();
   }
  loadData = async () => {
    console.log(this.state.searchField);
    if (this.state.searchField === "") {
      this.setState({
        tracks: [],
      });
    } else {
      const options = {
        method: "GET",
        url: "https://spotify23.p.rapidapi.com/search/",
        params: {
          q: this.state.searchField,
          type: "tracks",
          offset: "0",
          limit: "10",
          numberOfTopResults: "5",
        },
        headers: {
          "X-RapidAPI-Key":
            "c126791fe5msh21dc806bd4c3d1bp1e850djsnf2922f043d47",
          "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
        },
      };
      const { data } = await axios.request(options).catch(function(error) {
        return [];
      });
      console.log(data);
      if (data === undefined || data === null) {
        this.setState((prevState) => {
          return { tracks: prevState.tracks };
        });
      } else {
        this.setState({
          tracks: data.tracks.items,
        });
      }   
    }
  };

  render() {
    return (
      <div>
        <Nav
          email={this.props.user.email}
          onRouteChange={this.props.onRouteChange}
          onHomeRouteChange={this.onHomeRouteChange}
        />
        {this.state.homeRoute === "favourites" ? (
          <div>                                    
              <CardList
                tracks={this.state.favSongs}
                userid={this.props.user.userid}
                show = "favourites"
                onHomeRouteChange = {this.onHomeRouteChange}
              />            
          </div>
        ) : (
          <div>
            <SearchBar onSearchChange={this.onSearchChange}  onSearchClick={this.onSearchClick}/>
            <h4 className="mt-4">{this.state.msg}</h4>
            {this.state.tracks.length === 0 ? (
              <h1>Loading...</h1>
            ) : (
              <CardList
                tracks={this.state.tracks}
                userid={this.props.user.userid}
                show = "all"
                onHomeRouteChange = {this.onHomeRouteChange}
              />
            )}
          </div>
        )}        
      </div>
    );
  }
}

export default Home;
