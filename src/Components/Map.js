import React from "react";
import { Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import GoogleMapReact from "google-map-react";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import PetsIcon from "@mui/icons-material/Pets";
import { petData } from "./Data";

export default class Map extends React.Component {
  constructor(props) {
    super();
    this.state = {
      latitude: -23.46614,
      longitude: -46.53532,
      petshops: [],
      selectedPetId: null,
      markerClicked: false,
      searchText: "",
      distance: 40,
    };
  }

  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          petshops: petData,
        });
      },
      (error) => {
        console.log("Error Getting Location: " + error.message);
      }
    );
  };

  header = () => {
    const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
      const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
      };
      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(lat2 - lat1); // deg2rad below
      var dLon = deg2rad(lon2 - lon1);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
          Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c; // Distance in km
      return d; // distance returned
    };

    const handleSearch = () => {
      let filteredPetShops = petData.filter(
        (p) =>
          p.name.toLowerCase().includes(this.state.searchText.toLowerCase()) &&
          getDistanceFromLatLonInKm(
            this.state.latitude,
            this.state.longitude,
            p.latitude,
            p.longitude
          ) < this.state.distance
      );
      this.setState({
        petshops: filteredPetShops,
      });
    };

    const resetAll = () => {
      this.setState({
        petshops: petData,
        distance: 40,
        searchText: "",
      });
    };

    return (
      <div className="header" style={{ marginBottom: 10 }}>
        <Typography variant="h4" style={{ textAlign: "center" }}>
          PET STORE FINDER
        </Typography>
        <TextField
          className="header-input"
          label="Search for a Pet Store..."
          variant="outlined"
          style={{ width: "100%" }}
          onChange={(event) => {
            this.setState({ searchText: event.target.value });
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>Distance:</Typography>
          <Slider
            style={{ width: "75%" }}
            value={this.state.distance}
            valueLabelDisplay="auto"
            step={5}
            marks
            min={0}
            max={50}
            onChange={(event, value) => this.setState({ distance: value })}
          />
        </div>
        <div>
          <Button
            variant="outlined"
            onClick={resetAll}
            style={{ width: "50%" }}
          >
            <RestartAltIcon />
            Reset
          </Button>
          <Button
            variant="contained"
            onClick={handleSearch}
            style={{ width: "50%" }}
          >
            <SearchIcon />
            Search
          </Button>
        </div>
      </div>
    );
  };

  map = () => {
    const clickedOutside = (x, y, lat, lng, event) => {
      if (this.state.markerClicked === true) {
        this.setState({
          selectedPetId: null,
          markerClicked: false,
        });
      } else {
        console.log("Clicked on map");
      }
    };

    const handlePetClick = (pet) => {
      window.location.replace("/pet/" + pet.id);
    };

    return (
      <div className="map" style={{ height: "80vh" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_KEY }}
          defaultCenter={{
            lat: -23.46614,
            lng: -46.53532,
          }}
          defaultZoom={13}
          center={{ lat: this.state.latitude, lng: this.state.longitude }}
          onClick={clickedOutside}
        >
          {this.state.petshops.map((petshop) => {
            return (
              <PetsIcon
                color={"secondary"}
                lat={petshop.latitude}
                lng={petshop.longitude}
                onClick={() => {
                  this.setState({
                    selectedPetId: petshop.id,
                    markerClicked: true,
                  });
                }}
              />
            );
          })}
          {this.state.petshops.map((petshop) => {
            if (this.state.selectedPetId === petshop.id) {
              return (
                <div
                  lat={petshop.latitude}
                  lng={petshop.longitude}
                  onClick={() => {
                    handlePetClick(petshop);
                  }}
                  style={{
                    backgroundColor: "White",
                    padding: 10,
                    borderRadius: 20,
                    width: 100,
                  }}
                >
                  <Typography style={{ textAlign: "center" }}>
                    {petshop.name}
                  </Typography>
                </div>
              );
            } else {
              return null;
            }
          })}
          <MyLocationIcon
            color={"primary"}
            lat={this.state.latitude}
            lng={this.state.longitude}
          />
        </GoogleMapReact>
      </div>
    );
  };

  render() {
    return (
      <div style={{ backgroundColor: "#F3F3F4" }}>
        {this.header()}
        {this.map()}
      </div>
    );
  }
}
