import React from 'react';
import { useSelector } from 'react-redux';
import './GamesField.css';
import { Row, Col } from 'react-bootstrap';

import GameCard from '../GameCard/GameCard';

const GamesField = () => {
  const {
    games,
    currentPage,
    itemsPerPage,
  } = useSelector((state) => state.games);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGames = games.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Row className="g-4">
      {currentGames.map((game) => (
        <Col key={game.id} xl={3} lg={4} md={6} sm={6} xs={12}>
          <GameCard game={game} />
        </Col>
      ))}
    </Row>
  );
};

export default GamesField;
