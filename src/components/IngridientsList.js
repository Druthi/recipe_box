import React, { Component } from 'react';
import { Button, Segment, Accordion, Icon } from 'semantic-ui-react';
import App from '../App';


//const Ingridient = ({id, name, ingridients}) => {
//    return (
//      <Segment> 
//        <label> 
//          {ingridients}
//        </label>
//      </Segment>
//    );
//  };

class IngridientsList extends Component {
    constructor(props) {
        super(props);
        this.state={
            activeIndex: 0
        }
    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index
    
        this.setState({ activeIndex: newIndex })
    }

    showList = (list) => {
        for(var i=0;i<list; i++){
            return(
                
                    <li>{list[i]}</li>

                
            );
        }
    }    
      
   
    render() {
        //const obj = Object.assign(this.props.ingrid);
        //console.log(obj);
        const { activeIndex } = this.state;
        const ingridientList= this.props.ingridients.split(",");
        return (
            <div className="IngridientsList">
                <Accordion fluid styled>
                <Accordion.Title active={activeIndex === this.props.index} index={this.props.index} onClick={this.handleClick}>
                      <Icon name='dropdown' />
                      {this.props.name}
                </Accordion.Title>
                <Accordion.Content active={activeIndex === this.props.index}>
                    
                    <p>{ingridientList}</p>
                                         
                </Accordion.Content>
              </Accordion>
            </div>
    );
    }
}

export default IngridientsList;
