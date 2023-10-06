import React from "react";
import { petData } from "./Data";

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
