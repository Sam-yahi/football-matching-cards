import { useState, useEffect } from 'react';
import 'E:/web dev/projects/quiz/my-react-app/public/Game.css';
import ReStart from './restart';

// Import images
import barcelona from '../assets/images/Barcelona.svg';
import realMadrid from '../assets/images/Real_Madrid_logos-world_(3).svg';
import Milan from '../assets/images/Milan_(3).svg';
import Arsenal from '../assets/images/Arsenal.svg';
import Chelsea from '../assets/images/Chelsea.svg';
import Liverpool from '../assets/images/Liverpool_logos-world_(5).svg';
import ManchesterCity from '../assets/images/Manchester_City_logos-world_(8).svg';
import ManchesterUnited from '../assets/images/Manchester_United_logos-world_(3).svg';

function Game() {
    const [gameStarted, setGameStarted] = useState("Welcome to the game");
    const [cards, setCards] = useState([]);
    const [score, setScore] = useState(0);
    const [flippedCards, setFlippedCards] = useState([]);  // Stores flipped cards
    const [matchedCards, setMatchedCards] = useState([]);  // Stores matched cards
    const [showRestart, setShowRestart] = useState(false); // Show restart modal

    const images = [
        barcelona, realMadrid, Milan, Arsenal,
        Liverpool, ManchesterCity, Chelsea, ManchesterUnited
    ];

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const initializeGame = () => {
        const imagesWithIndex = images.map((image, index) => ({ image, id: index }));
        const shuffledImages = shuffleArray([...imagesWithIndex, ...imagesWithIndex]); // Duplicate images
        setCards(shuffleArray(shuffledImages));
        setScore(0);
        setFlippedCards([]);
        setMatchedCards([]);
        setGameStarted("Welcome to the game");
    };

    useEffect(() => {
        initializeGame();
    }, []);

    const handleClick = (id, index) => {
        const newFlippedCards = [...flippedCards, { id, index }];
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) {
            checkMatch(newFlippedCards[0], newFlippedCards[1]);
        }
    };

    const checkMatch = (firstCard, secondCard) => {
        if (firstCard.id === secondCard.id) {
            setGameStarted("Matched!");
            setMatchedCards((prev) => [...prev, firstCard.index, secondCard.index]);  // Store matched indexes
            setScore((prevScore) => {
                const newScore = prevScore + 1;
                if (newScore === 8) {
                    setShowRestart(true); // Show restart modal when all cards are matched
                }
                return newScore;
            });
        } else {
            setGameStarted("Oops! Not Matched");
            setTimeout(() => {
                setFlippedCards([]);  // Hide unmatched cards after delay
            }, 1000);
        }
        setTimeout(() => setFlippedCards([]), 1000); // Always reset flipped cards
    };

    const handleRestartConfirm = () => {
        setShowRestart(false);
        initializeGame();
    };

    const handleRestartCancel = () => {
        setShowRestart(false);
    };

    return (
        <div>
            <h1 >{gameStarted}</h1>
            <div className="grid-container">
                {cards.map((card, index) => (
                    <div key={index} className="grid-item" onClick={() => handleClick(card.id, index)}>
                        <img
                            style={{
                                visibility:
                                    flippedCards.some((c) => c.index === index) ||
                                    matchedCards.includes(index)
                                        ? "visible"
                                        : "hidden"
                            }}
                            src={card.image}
                            alt={`img-${index}`}
                        />
                    </div>
                ))}
            </div>
            <h2>Score: {score}</h2>
            {showRestart && <ReStart onConfirm={handleRestartConfirm} onCancel={handleRestartCancel} />}
        </div>
    );
}

export default Game;