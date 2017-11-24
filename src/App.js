import React, { Component } from 'react';
import IngridientsList from './components/IngridientsList';
import { Well, Form, FormGroup, FormControl, Button, Accordion, Modal } from 'react-bootstrap';
import uuidv4 from 'uuid/v4';
import { pickBy } from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      editModal: false,
      recipes: {},
      inputValue: {
        name: "",
        ingridients: ""
      },
      editId: 0
    }

  }

  onRecipeChange = (e) => {
    this.setState({
      ...this.state,
      inputValue: {
        ...this.state.inputValue,
        name: e.target.value
      }
    });
  }

  onIngridientsChange = (e) => {
    //console.log(e.target.value);
    this.setState({
      ...this.state,
      inputValue: {
        ...this.state.inputValue,
        ingridients: e.target.value
      }
    });
  }


  createRecipe = (e) => {
    console.log(e)
    e.preventDefault();
    const { inputValue, recipes } = this.state;
    const recipeId = uuidv4();
    this.setState({
      ...this.state,
      recipes: {
        ...recipes,
        [recipeId]: {
          recipeId: recipeId,
          name: inputValue.name,
          ingridients: inputValue.ingridients
        }
      },
      inputValue: {
        name: "",
        ingridients: ""
      }

    });
    console.log(Object.entries(recipes));
    //console.log(recipes);
  }

  deleteRecipe = (id) => {
    const { recipes } = this.state;
    const newObj = pickBy(
      recipes,
      ({ recipeId }) => recipeId !== id
    );
    this.setState({ recipes: newObj });
    //console.log(Object.entries(newObj));

  }

  editRecipe = (id) => {
    const { recipes, inputValue } = this.state;
    const recipe = pickBy(
      recipes,
      ({ recipeId }) => recipeId === id
    );

    this.setState({
      editModal: true, editId: id,
      inputValue: {
        name: recipe[id].name,
        ingridients: recipe[id].ingridients
      }
    });
    console.log(this.state.editModal, inputValue);
  }

  finalEdit = (id) => {
    const { inputValue, recipes } = this.state;
    this.setState({
      ...this.state,
      recipes: {
        ...recipes,
        [id]: {
          recipeId: id,
          name: inputValue.name,
          ingridients: inputValue.ingridients
        }
      },
      editModal: false,
      inputValue: {
        name: "",
        ingridients: ""
      }
    });
    console.log(Object.entries(recipes));


  }

  close = () => {
    this.setState({ showModal: false, editModal: false });
  }

  open = () => {
    this.setState({ showModal: true, editModal: true });
  }



  render() {
    const { inputValue, recipes } = this.state;
    return (

      <div className="App">
        <section>
          <Modal show={this.state.editModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Recipe</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <p>Recipe</p>
                <FormGroup >
                  <FormControl type="text" placeholder='Recipe Name' onChange={this.onRecipeChange} value={inputValue.name} />
                </FormGroup>
                <p>Ingridients</p>
                <FormGroup >
                  <FormControl type="text" placeholder='Enter ingridients separated by commas' onChange={this.onIngridientsChange} value={inputValue.ingridients} size="large" />
                </FormGroup>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => this.finalEdit(this.state.editId)} bsStyle="primary">Edit Recipe</Button>
              <Button onClick={this.close}>Close</Button>
            </Modal.Footer>
          </Modal>
          <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>Add Recipe</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <p>Recipe</p>
                <FormGroup>
                  <FormControl type="text" placeholder='Recipe Name' onChange={this.onRecipeChange} value={inputValue.name} />
                </FormGroup>
                <p>Ingridients</p>
                <FormGroup>
                  <FormControl type="text" placeholder='Enter ingridients separated by commas' onChange={this.onIngridientsChange} value={inputValue.ingridients} size="large" />
                </FormGroup>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.createRecipe} bsStyle="primary">Add Recipe</Button>
              <Button onClick={this.close}>Close</Button>
            </Modal.Footer>
          </Modal>
          <Button bsStyle="primary" onClick={this.open}> Add Recipe </Button>
        </section>
        <div>
          <Well>
            {Object.entries(recipes).map(([id, { name, ingridients }], index) => (
              <IngridientsList
                key={id}
                name={name}
                ingridients={ingridients}
                index={index}
                delete={this.deleteRecipe}
                edit={this.editRecipe}
                id={id}
              />
            ))}
          </Well>
        </div>
      </div>
    );
  }
}

export default App;