import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {
  setGames,
  setCurrentPage,
} from '../slices/gamesSlice';
import '../App.css';
import { Pagination, Row, Col } from 'react-bootstrap';
import FilterField from '../components/FilterField/FilterField';
import SortDropdown from '../components/SortDropdown/SortDropdown';
import GamesField from '../components/GamesField/GamesField';

const HomePage = () => {
  const dispatch = useDispatch();
  const {
    currentPage,
    itemsPerPage,
    totalGames,
  } = useSelector((state) => state.games);

  const totalOfPagesButton = Math.ceil(totalGames / itemsPerPage);
  function consecutiveNumbers(n) {
    const arr = [];
    for (let i = 1; i <= n; i++) {
      arr.push(i);
    }
    return arr;
  };

  useEffect(() => {
    const getGamesData = async () => {
      try {
        const response = await axios.get('/freetogame-api/api/games');
        dispatch(setGames(response.data));
      } catch (error) {
        console.log(error);
        if (error.code === 'ERR_NETWORK') {
          throw new Error('Запрос не сработал?');
        }
        if (error.response.status >= 500) {
          throw new Error('Запрос не сработал? Время ожидания истекло?');
        }
      }
    };

    getGamesData();
  }, [dispatch]);

  const handleSetCurrentPage = (numberOfPage) => {
    dispatch(setCurrentPage(numberOfPage));
  };

  return (
    <div className="container mt-4">
      <Row>
        <Col lg={3} md={4} className="mb-4">
          <FilterField />
        </Col>
        <Col lg={9} md={8}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h2 mb-0">Free-to-Play Games</h1>
            <SortDropdown />
          </div>
          <GamesField />
          <div className="d-flex justify-content-center mt-5">
            <Pagination>
              {consecutiveNumbers(totalOfPagesButton).map((num) => (
                <Pagination.Item
                  key={num}
                  active={num === currentPage}
                  onClick={() => handleSetCurrentPage(num)}
                >
                  {num}
                </Pagination.Item>
              ))}
            </Pagination>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
