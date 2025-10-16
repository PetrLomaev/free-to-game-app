import React from 'react';
import dateFormatter from '../../utils/dateFormatter';
import './GameCard.css';
import { Card } from 'react-bootstrap';
import { Calendar, Person, Tag } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const GameCard = ({ game }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    
    navigate(`/game/${game.id}`);
  };

  return (
    <Card className="game-card h-100 shadow-sm">
      <div className="game-card-image-container">
        <Card.Img
          variant="top"
          src={game.thumbnail}
          alt={game.title}
          className="game-card-image"
          onClick={handleCardClick}
        />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="game-tittle h6 mb-3">
          {game.title}
        </Card.Title>

        <div className="game-details mt-auto">
          <div className="game-detail-item mb-2">
            <Calendar size={14} className="me-2 text-muted" />
            <small className="text-muted">
              {dateFormatter(game.release_date)}
            </small>
          </div>

          <div className="game-detail-item mb-2">
            <Person size={14} className="me-2 text-muted" />
            <small className="text-muted">
              {game.publisher}
            </small>
          </div>

          <div className="game-detail-item">
            <Tag size={14} className="me-2 text-muted" />
            <small className="text-muted">
              {game.genre}
            </small>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default GameCard;
