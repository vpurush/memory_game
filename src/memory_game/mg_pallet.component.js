import React from 'react';
import MGCard from './mg_card.component';
import './mg_pallet.css';

class MemoryGame extends React.PureComponent {
    constructor(props){
        super(props);

        this.revealCard = this.revealCard.bind(this);
    }

    /**
     * 
     * @param {Card that is revealed} card 
     */
    revealCard(card){
        let updatedCards = [...this.props.cards];
        const cardItem = updatedCards.find(c => c.id == card.id);
        cardItem.isFaceUp = !cardItem.isFaceUp;
        this.props.updateCards(updatedCards);
    }

    render(){
        return (
            <div className="mg_pallet">
                {this.props.cards.map(c => {
                    return <MGCard revealCard={this.revealCard} card={c} key={c.id}></MGCard>;
                })}
            </div>
        );
    }
}

export default MemoryGame;
