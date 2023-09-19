import React from "react";
import { Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import GoogleMapReact from "google-map-react";

const header = () => {
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

const map = () => {
  return (
    <div style={{ backgroundColor: "cyan", height: "80vh" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_KEY }}
        defaultCenter={{
          lat: 42.3265,
          lng: -122.8756,
        }}
        defaultZoom={13}
      ></GoogleMapReact>
    </div>
  );
};

const Map = () => {
  return (
    <div style={{ backgroundColor: "#F3F3F4" }}>
      {header()}
      {map()}
    </div>
  );
};

export default Map;
