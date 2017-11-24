import React, { Component } from 'react';
//import AddRecipe from './components/AddRecipe';
import IngridientsList from './components/IngridientsList';
import { Form, FormGroup, FormControl, Button, Message, Segment, Accordion, Modal } from 'react-bootstrap';
//import { Input } from 'semantic-ui-react';
import uuidv4 from 'uuid/v4';

//const Ingridient= ({id, name, ingridients}) => {
//  const ingridientList= ingridients.split(",");
//  return(
//    <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
//          <Icon name='dropdown' />
//          What is a dog?
//    </Accordion.Title>
//    <Accordion.Content active={activeIndex === 0}>
//          <p>
//            A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a
//            {' '}welcome guest in many households across the world.
//          </p>
//    </Accordion.Content>
//  );
//};

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      showModal: false,
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
      console.log(e)
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
    console.log(Object.entries(recipes));
    //console.log(recipes);
  }

  close = () => {
    this.setState({ showModal: false });
  }

  open = () => {
    this.setState({ showModal: true });
  }

 //
//
  //onClick= () => {
  //  this.dialog.showAlert('Hello Dialog!')
  //}
//
  //componentWillMount = () =>{
  //  Modal.setAppElement('body');
  //}
//
//
  //toggleModal = () => {
  //  this.setState({...this.state,
  //    isActive: !this.state.isActive
  //  });
  //}
//
 
  render() {
    const { inputValue, recipes } = this.state;
    return (
      
      <div className="App">
        <section>
          <Button bsStyle="primary" onClick={this.open}> Show Modal </Button>
          <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>Add Recipe</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <p>Recipe</p>
                  <FormGroup>
                    <FormControl type="text" placeholder='Recipe Name' onChange={this.onRecipeChange} value={inputValue.name}/>
                  </FormGroup>
                <p>Ingridients</p>
                  <FormGroup>
                    <FormControl type="text" placeholder='Enter ingridients separated by commas' onChange={this.onIngridientsChange} value={inputValue.ingridients} size="large"/>       
                  </FormGroup>                  
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.createRecipe} bsStyle="primary">Add Recipe</Button>
              <Button onClick={this.close}>Close</Button>
            </Modal.Footer>
          </Modal>          
        </section>
        <div>
        {Object.entries(recipes).map(([id, { name, ingridients }], index) => (
          <IngridientsList
            key={id}
            name={name}
            ingridients={ingridients}  
            index={index}          
          />
        ))}
        </div>
      </div>
    );
  }
}

export default App;