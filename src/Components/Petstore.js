import React from "react";

export default class Petstore extends React.Component {
  constructor(props) {
    super();
    this.state = {
      petName: "",
    };
  }

  componentDidMount = () => {
    let petId = window.location.href.split("/").pop(); // get pet store Id
    let selectedPet = petData.filter((p) => p.id === petId)[0]; // get pet store data
    this.setState({ petName: selectedPet.name });
  };

  render() {
    return (
      <div>
        <h1>PetStore: {this.state.petName}</h1>
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
