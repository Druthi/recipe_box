import React, { Component } from 'react';
import IngridientsList from './components/IngridientsList';
import { Well, Form, FormGroup, FormControl, Button, Accordion, Modal } from 'react-bootstrap';
import uuidv4 from 'uuid/v4';
import { pickBy } from 'lodash';
import firebase from './firebase.js';



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
      editId: 0,
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
    const recipeRef = firebase.database().ref('recipes');
    const recipe = {
      recipeId: recipeId,
      name: this.state.inputValue.name,
      ingridients: this.state.inputValue.ingridients
    }
    console.log(recipe);
    recipeRef.push(recipe);
    
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

  componentDidMount() {
    const itemsRef = firebase.database().ref('recipes');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = {};
      for (let item in items) {
        newState[items[item].recipeId] = {
          recipeId: items[item].recipeId,
          name: items[item].name,
          ingridients: items[item].ingridients,
          fireId: item
        }
      }
      
      
      this.setState({ ... this.state,
        recipes: newState
      });
      console.log(newState);
    });
    
    
  }

  deleteRecipe = (id, fId) => {
    const { recipes } = this.state;
    const newObj = pickBy(
      recipes,
      ({ recipeId }) => recipeId !== id
    );
    this.setState({ recipes: newObj });
    const itemRef = firebase.database().ref(`/recipes/${fId}`);
    itemRef.remove();
    //console.log(Object.entries(newObj));

  }

  editRecipe = (id, fId) => {
    const { recipes, inputValue } = this.state;
    const recipe = pickBy(
      recipes,
      ({ recipeId }) => recipeId === id
    );

    this.setState({
      editModal: true, editId:{rId: id, fId:fId},
      inputValue: {
        name: recipe[id].name,
        ingridients: recipe[id].ingridients
      }
    });
    //console.log(this.state.editModal, inputValue);
  }

  finalEdit = (rId, fId) => {
    const { inputValue, recipes } = this.state;      
    
    this.setState({
      ...this.state,
      recipes: {
        ...recipes,
        [rId]: {
          recipeId: rId,
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
  //  let ref = firebaseDb.ref('recipes');
  //  return ref
  //    .child(fId)
  //    .update(data)
  //    .then(() => ref.once('value'))
  //    .then(snapshot => snapshot.val())
  //    .catch(error => ({
  //      errorCode: error.code,
  //      errorMessage: error.message
  //    }));
  }

  close = () => {
    this.setState({ showModal: false, editModal: false });
  }

  open = () => {
    this.setState({ showModal: true, editModal: true });
  }

  //handleSubmit = (e) => {
  //  e.preventDefault();
  //  const recipeRef = firebase.database().ref('recipes');
  //  const recipe = {
  //    name: this.state.inputValue.name,
  //    ingridients: this.state.inputValue.ingridients
  //  }
  //  recipeRef.push(recipe);
  //  
  //}
  



  render() {
    const { inputValue, recipes, editId } = this.state;
    return (

      <div className="App">
        <section>
          <Modal show={this.state.editModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Recipe</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form >
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
              <Button onClick={() => this.finalEdit(editId.rId, editId.fId)} bsStyle="primary">Edit Recipe</Button>
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
            {Object.entries(recipes).map(([id, { name, ingridients, fireId}], index) => (
              <IngridientsList
                key={id}
                name={name}
                ingridients={ingridients}
                index={index}
                delete={this.deleteRecipe}
                edit={this.editRecipe}
                id={id}
                fireId={fireId}
              />
            ))}
          </Well>
        </div>
      </div>
    );
  }
}

export default App;