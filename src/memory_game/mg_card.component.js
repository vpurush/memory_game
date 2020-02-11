import React from 'react';
import './mg_card.css';

class MGCard extends React.Component {
    constructor(props){
        super(props);

        this.revealCard = this.revealCard.bind(this);
        this.onLoadCardImage = this.onLoadCardImage.bind(this);
    }

    revealCard(){
        this.props.revealCard(this.props.card.id);
    }

    onLoadCardImage(){
        // console.log("load", this.props.card.id);
        this.props.onLoadCardImage(this.props.card.id);
    }
    
    render(){
        return (
            <span className="mg_card" onClick={this.revealCard}>
                <img src={this.props.card.img} 
                    className={this.props.card.isFaceUp ? "": "hidden"} 
                    onLoad={this.onLoadCardImage}
                    />
            </span>
        );
    }
}

export default MGCard;
