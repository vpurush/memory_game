import React from 'react';
import MGCard from './mg_card.component';
import './mg_pallet.css';

class MemoryGame extends React.PureComponent {
    constructor(props){
        super(props);

        this.state = {}

        this.revealCard = this.revealCard.bind(this);
        this.onLoadCardImage = this.onLoadCardImage.bind(this);
    }

    static getDerivedStateFromProps(props){
        const noOfLoadedImages = props.cards.filter(c => c.hasImageLoaded).length;
        if(noOfLoadedImages == props.cards.length){
            return {
                hasAllImagesLoaded: true
            };
        } else {
            return {
                hasAllImagesLoaded: false
            };
        }
    }

    /**
     * 
     * @param {Array} cards 
     * Invokes parent's method when all pairs have been discovered
     */
    checkGameStatus(cards){
        const noOfFaceUpCards = cards.filter(c => c.isFaceUp).length;
        if (noOfFaceUpCards == (cards.length - 1)) {
            this.props.gameOver();
        }
    }


    /**
     * 
     * @param {Number} cardId
     */
    revealCard(cardId){
        let updatedCards = [...this.props.cards];
        const currentCard = updatedCards.find(c => c.id == cardId);
        if (!currentCard.matchFound) {
            const previouslyRevealedCard = updatedCards.find(c => {
                return c.isFaceUp && !c.matchFound;
            })
            currentCard.isFaceUp = !currentCard.isFaceUp;

            if (previouslyRevealedCard && 
                previouslyRevealedCard.img === currentCard.img &&
                previouslyRevealedCard.id !== currentCard.id){
                previouslyRevealedCard.matchFound = true;
                currentCard.matchFound = true;
                setTimeout(() => {
                    this.checkGameStatus(updatedCards);
                }, 500);
            } else {
                if (previouslyRevealedCard) {
                    setTimeout(() => {
                        updatedCards = [...this.props.cards];
                        previouslyRevealedCard.isFaceUp = false;
                        currentCard.isFaceUp = false;
                        this.props.updateCards(updatedCards);
                    }, 300);
                }
            }
            this.props.updateCards(updatedCards);
        }
    }

    /**
     * Convenience method to lay the elements out in an acceptable form
     */
    getPalletRows(cards){
        const palletRows = [];
        const len = cards.length;
        const rowLen = len / 3;

        for(let i=0; i<3; i++){
            palletRows.push(cards.slice(i*rowLen, i*rowLen + rowLen));
        }
        return palletRows;
    }

    /**
     * 
     * @param {Number} cardId 
     * This is invoked by the child component when its image is loaded
     */
    onLoadCardImage(cardId){
        let updatedCards = [...this.props.cards];
        const currentCard = updatedCards.find(c => c.id == cardId);
        currentCard.hasImageLoaded = true;
        this.props.updateCards(updatedCards);
    }

    render(){
        return (
            <div className="mg_pallet">
                {this.state.hasAllImagesLoaded ? null : 
                    <div className="mg_pallet_loading">
                        <span>Images are being loaded. Please wait.</span>
                    </div>
                }
                {this.getPalletRows(this.props.cards).map((palletRow, i) => {
                    return (
                        <div key={i} className="mg_pallet_row">
                            {palletRow.map(c => {
                                return <MGCard 
                                            onLoadCardImage={this.onLoadCardImage}
                                            revealCard={this.revealCard} 
                                            card={c} 
                                            key={c.id}>
                                        </MGCard>;
                            })}
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default MemoryGame;
