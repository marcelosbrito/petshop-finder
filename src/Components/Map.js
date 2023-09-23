import React from "react";
import { Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import GoogleMapReact from "google-map-react";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import PetsIcon from "@mui/icons-material/Pets";

export default class Map extends React.Component {
  constructor(props) {
    super();
    this.state = {
      latitude: -23.46614,
      longitude: -46.53532,
      petshops: [],
      selectedPetId: null,
      markerClicked: false,
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
    return (
      <div>
        <Typography variant="h4" style={{ textAlign: "center" }}>
          PET STORE FINDER
        </Typography>
        <TextField
          label="Search for a Pet Store..."
          variant="outlined"
          style={{ width: "100%" }}
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
          <Slider style={{ width: "75%" }} />
        </div>
        <div>
          <Button variant="outlined" style={{ width: "50%" }}>
            <RestartAltIcon />
            Reset
          </Button>
          <Button variant="contained" style={{ width: "50%" }}>
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

    return (
      <div style={{ backgroundColor: "cyan", height: "80vh" }}>
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
                  style={{ backgroundColor: "White", width: 100 }}
                >
                  <Typography>{petshop.name}</Typography>
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

const petData = [
  {
    id: "1",
    name: "My Life Pet Clinic",
    latitude: -23.449398559296387,
    longitude: -46.53919433578667,
  },
  {
    id: "2",
    name: "Pet Shop Pink Dog",
    latitude: -23.445224533703712,
    longitude: -46.54664986976165,
  },
  {
    id: "3",
    name: "Pet Shop Smax",
    latitude: -23.438271368446387,
    longitude: -46.5557591750829,
  },
  {
    id: "4",
    name: "Darling Pet shop",
    latitude: -23.452314773911944,
    longitude: -46.510170711865904,
  },
  {
    id: "5",
    name: "Pet Shop Feed The Consulate",
    latitude: -23.46687944828309,
    longitude: -46.589202111359164,
  },
  {
    id: "6",
    name: "Studio Pet Store Spa Club",
    latitude: -23.463061295703046,
    longitude: -46.60027391042241,
  },
];
