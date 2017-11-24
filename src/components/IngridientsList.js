import React, { Component } from 'react';
import { Button, Panel, Accordion } from 'react-bootstrap';
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
        
    }

    //handleClick = (e, titleProps) => {
    //    const { index } = titleProps
    //    const { activeIndex } = this.state
    //    const newIndex = activeIndex === index ? -1 : index
    //
    //    this.setState({ activeIndex: newIndex })
    //}

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
        const ingridientList= this.props.ingridients.split(",");
        console.log(ingridientList);
        return (
            <div className="IngridientsList">
                <Accordion >
                <Panel header={this.props.name} eventKey={this.props.index} index={this.props.index} onClick={this.handleClick}>
                    <ul>
                        {ingridientList.map((list) => {
                            return <li>{list}</li> })}
                    </ul>
                </Panel>
              </Accordion>
            </div>
    );
    }
}

export default IngridientsList;
