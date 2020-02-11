import React from 'react';
import './mg_card.css';

class MGCard extends React.Component {
    constructor(props){
        super(props);

        this.revealCard = this.revealCard.bind(this);
    }

    revealCard(){
        this.props.revealCard(this.props.card);
    }
    
    render(){
        return (
            <span className="mg_card" onClick={this.revealCard}>
                {this.props.card.isFaceUp ? <img src={this.props.card.img} /> : null}
            </span>
        );
    }
}

export default MGCard;
