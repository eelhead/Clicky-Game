import swal from 'sweetalert';
import React, { Component } from "react";
import ShapeCard from "./components/ShapeCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Shapes from "./Shapes.json";
import "./App.css";

class App extends Component {
  state = {
    Shapes: Shapes,
    userScore: 0,
    topScore: 0
  };

  render() {
    return (
      <Wrapper>
        <Title> Your score is {this.state.userScore}</Title>
        {this.state.Shapes.map(Shape => (
          <ShapeCard
            id={Shape.id}
            key={Shape.id}
            name={Shape.name}
            image={Shape.image}
            clickShape={this.clickShape}
            shuffle={() => {this.shuffle(this.state.Shapes)}}
          />
        ))}
      </Wrapper>
    );
  }

  // win/lose logic for clicking on shapes
  clickShape = id => {
    this.state.Shapes.forEach((Shape) => {
      if (Shape.id === id){
        if (Shape.status) {
          swal("Whooops! You clicked a shape twice!", "Your Score: "+[this.state.userScore]+" High Score: "+[this.state.topScore], "error", {
            button: "Reset Game",
          });
          this.setState({userScore: 0});
          this.state.Shapes.forEach((Shape) => {
            Shape.status = 0;
          });
        } else {
          this.setState((newState) => ({
            userScore: newState.userScore + 1
          }), () => {
            if (this.state.userScore === 8) {
              swal("Congratulations! You Win! Weeeeeeeeeee!", "Your Score: "+[this.state.userScore]+" High Score: "+[this.state.topScore], "success", {
                button: "Play Again",
              });
              this.setState({userScore: 0});
              this.state.Shapes.forEach((Shape) => {
                Shape.status = 0;
              });
            }
            else {
              this.shuffle(this.state.Shapes);
              Shape.status = 1;
            }
          }    
        );
      }
      if (this.state.userScore >= this.state.topScore) {
            this.setState({topScore: this.state.userScore +1});
      }
      }
    });
  }

  // ES6 randomized shuffle algorithm to rearrange shape cards
  shuffle = array => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    this.setState({Shapes:Shapes});
  }
}

export default App;