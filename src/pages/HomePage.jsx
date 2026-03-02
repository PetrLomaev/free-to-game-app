import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setGames, setCurrentPage, setLoading, setError, clearError } from '../slices/gamesSlice';
import '../App.css';
import { Pagination, Container, Row, Col } from 'react-bootstrap';
import FilterField from '../components/FilterField/FilterField';
import SortDropdown from '../components/SortDropdown/SortDropdown';
import GamesField from '../components/GamesField/GamesField';
import AlertError from '../components/AlertError/AlertError';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

const HomePage = () => {
  const dispatch = useDispatch();
  const { currentPage, itemsPerPage, totalGames, loading, error } = useSelector(
    (state) => state.games
  );

  const totalOfPagesButton = Math.ceil(totalGames / itemsPerPage);

  const consecutiveNumbers = (n) => {
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
        responseStatus: err.response ? err.response.status : null,
      };
      dispatch(setError(serializableError));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getGamesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <Container fluid className="px-3 px-md-4 px-lg-5">
      <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
        <h1 className="h3 mb-0">Free-to-Play Games</h1>
        <div style={{ minWidth: '200px' }}>
          <SortDropdown />
        </div>
      </div>
      <Row className="mt-3">
        <Col lg={3} md={4} className="pe-lg-4">
          <div className="position-sticky" style={{ top: '20px' }}>
            <FilterField />
          </div>
        </Col>
        <Col lg={9} md={8} className="ps-lg-4">
          <div className="status-container mb-4">
            {error && <AlertError error={error} onRetry={handleRetry} onClose={handleCloseError} />}
            {loading && !error && <LoadingSpinner message="Загрузка списка игр..." />}
          </div>
          <div className={loading || error ? 'content-secondary' : ''}>
            <GamesField />
            {!loading && totalOfPagesButton > 1 && (
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
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
