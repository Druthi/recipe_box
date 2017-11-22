import React, { Component } from 'react';
import Modal from 'react-modal';
//import AddRecipe from './components/AddRecipe';
import { Input, Button, Message, Segment, Accordion, Icon } from 'semantic-ui-react';
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
      isActive: false,
      recipes: {},
      inputValue: {
          name:"",
          ingridients:""
      },
      activeIndex: 0
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
    console.log(Object.entries(recipes));
    //console.log(recipes);
  }

 

  onClick= () => {
    this.dialog.showAlert('Hello Dialog!')
  }

  componentWillMount = () =>{
    Modal.setAppElement('body');
  }


  toggleModal = () => {
    this.setState({...this.state,
      isActive: !this.state.isActive
    });
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  displayContent= () => {
    const { activeIndex, recipes } = this.state;
    Object.entries(recipes).map(([id, { name, ingridients }], index) => {
      const ingridientList= ingridients.split(",");  
      return (          
        <Accordion>
          <Accordion.Title active={activeIndex === index} index={index} onClick={this.handleClick}>
                <Icon name='dropdown' />
                {name}
          </Accordion.Title>
          <Accordion.Content active={activeIndex === index}>
                {ingridientList.map((ingrid) => {
                <p>
                  {ingrid}
                </p>
                })}
          </Accordion.Content>
        </Accordion>
    )});
  }

 
  render() {
    const { inputValue, recipes } = this.state;
    return (
      
      <div className="App">
        <section>
          <Button onClick={this.toggleModal}> Show Modal </Button>
          <Modal isOpen={this.state.isActive} onRequestClose={this.toggleModal}>
          <form onSubmit={this.createRecipe}>
          <p>Recipe</p>
           <Input placeholder='Recipe Name' onChange={this.onRecipeChange} value={inputValue.name}/>
          <p>Ingridients</p>
          <Input placeholder='Enter ingridients separated by commas' onChange={this.onIngridientsChange} value={inputValue.ingridients} size="large"/>       
            <Button primary>Add Recipe</Button>
          </form>
          <Button basic onClick={this.toggleModal}>Close</Button>
          </Modal>     
          
        </section>
        <div>
        {this.displayContent} 
        </div>
      </div>
    );
  }
}

export default App;