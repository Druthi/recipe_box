import React, { Component } from 'react';
import { Input, Button, Message } from 'semantic-ui-react';
import uuidv4 from 'uuid/v4';


class AddRecipe extends Component {

  constructor(props){
    super(props);
    this.state = {
      recipes: {},
      inputValue: {
          name:"",
          ingridients:""
      }
    }
  }

  onRecipeChange= (e) => {
      //console.log(e.target.value);
      this.setState({...this.state, 
        inputValue:{ ...this.state.inputValue,
            name:e.target.value
        }
    });
  }

  onIngridientsChange= (e) => {
    //console.log(e.target.value);
    this.setState({...this.state, 
      inputValue:{ ...this.state.inputValue,
          ingridients:e.target.value
      }
    });
  }

  createRecipe= (e) => {
      //console.log(e)
    e.preventDefault();
    const { inputValue, recipes } = this.state;
    const recipeId = uuidv4();
      this.setState({...this.state,
        recipes: {
            ...recipes,
            [recipeId]: { 
                recipeId: recipeId,
                name:inputValue.name,
                ingridients:inputValue.ingridients
            }            
        },
        inputValue:{
            name:"",
            ingridients:""
        }
    });
    console.log(recipes);
  }

  onClick= () => {
    this.dialog.showAlert('Hello Dialog!')
  }

  render() {
      const { inputValue, recipes } = this.state;
    return (
      <div className="AddRecipe">
        <form onSubmit={this.createRecipe}>
          <p>Recipe</p>
           <Input placeholder='Recipe Name' onChange={this.onRecipeChange} value={inputValue.name}/>
          <p>Ingridients</p>
          <Input placeholder='Enter ingridients separated by commas' onChange={this.onIngridientsChange} value={inputValue.ingridients} size="large"/>
       
            <Button primary>Add Recipe</Button>
        </form>
        <Button basic onClick={this.props.closeModal}>Close</Button>
               
        
      </div>
    );
  }
}

export default AddRecipe;