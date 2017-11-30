import React, { Component } from 'react';
import { ListGroupItem, ListGroup, Well, Button, Panel, Accordion } from 'react-bootstrap';
import App from '../App';


class IngridientsList extends Component {
    constructor(props) {
        super(props);
        
    }

    delete = () => {

    }

    render() {
        //const obj = Object.assign(this.props.ingrid);
        //console.log(obj);
        const ingridientList= this.props.ingridients.split(",");

        return (
            <div className="IngridientsList">                
                    <Accordion >
                        <Panel bsStyle="success" header={this.props.name} eventKey={this.props.index} index={this.props.index} onClick={this.handleClick}>
                            Ingridients
                            <ListGroup>
                                {ingridientList.map((list) => {
                                    return <ListGroupItem>{list}</ListGroupItem> })}
                            </ListGroup>
                            <Button bsStyle="danger" onClick={() => this.props.delete(this.props.id, this.props.fireId)}>Delete</Button>
                            <Button onClick={() => this.props.edit(this.props.id, this.props.fireId)} >Edit</Button>
                        </Panel>                        
                    </Accordion>
            </div>
    );
    }
}

export default IngridientsList;
