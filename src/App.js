import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import Modal from 'react-modal';

import AddRecipe from './components/AddRecipe';
//import IngridientsList from './components/IngridientsList';



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isActive: false
    }
  }

  componentWillMount = () =>{
    Modal.setAppElement('body');
  }


  toggleModal = () => {
    this.setState({...this.state,
      isActive: !this.state.isActive
    });
  }

 
  render() {
    return (
      <div className="App">
        <section>
          <Button onClick={this.toggleModal}> Add Recipe </Button>
          <Modal isOpen={this.state.isActive} onRequestClose={this.toggleModal}>
            <AddRecipe closeModal={this.toggleModal}/>
          </Modal>
        </section>
        
      </div>
    );
  }
}

export default App;
