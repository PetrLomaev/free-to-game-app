import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {
  setGames,
  setCurrentPage,
  setLoading,
  setError,
  clearError,
} from '../slices/gamesSlice';
import '../App.css';
import api from '../utils/api';
import { Pagination, Row, Col } from 'react-bootstrap';
import FilterField from '../components/FilterField/FilterField';
import SortDropdown from '../components/SortDropdown/SortDropdown';
import GamesField from '../components/GamesField/GamesField';
import AlertError from '../components/AlertError/AlertError';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

const HomePage = () => {
  const dispatch = useDispatch();
  const {
    currentPage,
    itemsPerPage,
    totalGames,
    loading,
    error,
  } = useSelector((state) => state.games);

  const totalOfPagesButton = Math.ceil(totalGames / itemsPerPage);

  function consecutiveNumbers(n) {
    const arr = [];
    for (let i = 1; i <= n; i++) {
      arr.push(i);
    }
    return arr;
  };

  const getGamesData = async () => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get('/freetogame-api/api/games', {
        timeout: 15000,
      });
      dispatch(setGames(response.data));
    } catch (err) {
      console.error('Error requesting games: ', err);
      const serializableError = {
        message: err.message,
        code: err.code,
        responseStatus: err.response ? err.response.status: null,
      };
      dispatch(setError(serializableError));
    } finally {
      dispatch(setLoading(false));
    }
  };


  useEffect(() => {
    getGamesData();
  }, [dispatch]);

  const handleSetCurrentPage = (numberOfPage) => {
    dispatch(setCurrentPage(numberOfPage));
  };

  const handleRetry = () => {
    getGamesData();
  };

  const handleCloseError = () => {
    dispatch(clearError());
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
          <AlertError
            error={error}
            onRetry={handleRetry}
            onClose={handleCloseError}
            className="mb-4"
          />
          {loading ? (
            <LoadingSpinner message="Загрузка списка игр..." />
          ) : (
            <>
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
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
