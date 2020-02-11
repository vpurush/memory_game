import React from 'react';
import MemoryGameService from './memory_game.service';
import MGPallet from './mg_pallet.component';
import './memory_game.css';

class MemoryGame extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            cards: [],
            hasWon: false
        };

        this.updateCards = this.updateCards.bind(this);
        this.startNewGame = this.startNewGame.bind(this);
        this.gameOver = this.gameOver.bind(this);
    }

    /**
     * 
     * @param {Array} arr Array to be shuffled 
     * @return {Array} Shuffled array
     */
    shuffleArray(arr){
        const newArr = [];
        while(arr.length > 0){
            const idxOfItemToBeRemoved = Math.floor(Math.random() * (arr.length - 1));
            const removedItem = arr.splice(idxOfItemToBeRemoved, 1);
            newArr.push(removedItem[0]);
        }
        return newArr;
    }

    /**
     * 
     * @param {number} noOfCards Number of cards
     * @param {Array} images List of images
     */
    generateCards(noOfCards, images){
        let cards = [];

        // Check if there are enough images to create the cards
        if(noOfCards > images * 2){
            throw new Error("Not enough images");
        }

        let id = 0;
        // Iterate until we have enough cards
        while(cards.length < noOfCards){
            const img = images.pop();

            // Add the same image twice into the array
            id += 1;
            cards.push({
                id,
                isFaceUp: false,
                img
            });
            id += 1;
            cards.push({
                id,
                isFaceUp: false,
                img
            });
        }

        cards = cards.slice(0, noOfCards);

        // Shuffle the array to not have same images next to each other
        // cards = this.shuffleArray(cards);
        console.log(cards);

        return cards;
    }

    /**
     * Starts a new game
     */
    startNewGame(){
        this.setState({
            loadingImages: true
        });
        MemoryGameService.GetImages(8).then((images) => {
            this.setState({
                cards: this.generateCards(15, images),
                hasWon: false
            });
        });
    }

    componentDidMount(){
        this.startNewGame();
    }

    updateCards(cards){
        this.setState({
            cards
        });
    }

    gameOver(){
        this.setState({
            hasWon: true
        });
    }
    
    render(){
        return (
            <div className="memory_game">
                {this.state.hasWon ? 
                    <div className="game_overlay">
                        <button className="restart_btn" onClick={this.startNewGame}>Restart Game</button>
                    </div> 
                : null}
                <MGPallet updateCards={this.updateCards} cards={this.state.cards} gameOver={this.gameOver}></MGPallet>
            </div>
        );
    }
}

export default MemoryGame;
