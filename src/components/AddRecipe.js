import React, { Component } from 'react';
import { Input, Button } from 'semantic-ui-react';

class AddRecipe extends Component {

  constructor(props){
    super(props);
    this.state = {
      recipes: {
        name:"",
        ingridients:""
      }
    }
  }
  render() {
    return (
      <div className="AddRecipe">
        <form>
          <p>Recipe</p>
          <Input placeholder='Recipe Name' value={this.state.name}/>
          <p>Ingridients</p>
          <Input placeholder='Enter ingridients separated by commas' value={this.state.ingridients} size="large"/>
        </form>
        <Button primary>Add Recipe</Button>
        <Button basic>Close</Button>
        
        
      </div>
    );
  }
}

export default AddRecipe;