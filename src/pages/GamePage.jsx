import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setGame, setLoading, setError, clearError } from '../slices/gamePageSlice';
import dateFormatter from '../utils/dateFormatter';
import '../App.css';
import api from '../utils/api';
import { Row, Col, Card, Button, Carousel, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'react-bootstrap-icons';
import AlertError from '../components/AlertError/AlertError';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

const GamePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentGame, loading, error } = useSelector((state) => state.gamePage);

  const getCurrentGameData = async () => {
    dispatch(setLoading(true));
    const CACHE_DURATION = 5 * 60 * 1000;
    const cached = localStorage.getItem(`game-${id}`);
    const cacheTime = localStorage.getItem(`game-${id}-time`);

    if (cached && cacheTime && Date.now() - cacheTime < CACHE_DURATION) {
      dispatch(setGame(cached));
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`/freetogame-api/api/game?id=${id}`, {
        timeout: 15000,
      });
      dispatch(setGame(response.data));
      localStorage.setItem(`game-${id}`, JSON.stringify(response.data));
      localStorage.setItem(`game-${id}-time`, Date.now().toString());
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
    getCurrentGameData();
  }, [dispatch, id]);

  const handleBack = () => {
    navigate('/');
  };

  const handleRetry = () => {
    getCurrentGameData();
  };

  const handleCloseError = () => {
    dispatch(clearError());
  };

  if (loading) {
    return (
      <Container className="mt-4">
        <LoadingSpinner message="Загрузка информации об игре" centered />
      </Container>
    );
  }

  if (error && !currentGame) {
    return (
      <Container className="mt-4">
        <AlertError
          error={error}
          onRetry={handleRetry}
          onClose={handleCloseError}
        />
        <div className="text-center mt-3">
          <Button variant="outline-secondary" onClick={handleBack}>
            <ArrowLeft className="me-2" />
            Назад к списку игр
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <div className="container mt-4">
      <Button
        variant="outline-secondary"
        onClick={handleBack}
        className="mb-4"
      >
        <ArrowLeft className="me-2" />
        Назад к списку игр
      </Button>
      <AlertError
        error={error}
        onRetry={handleRetry}
        onClose={handleCloseError}
        className="mb-4"
      />
      {currentGame && (
        <Row>
          <Col lg={6}>
            <h1>{currentGame.title}</h1>
            <p className="lead">{currentGame.description}</p>

            <Card className="mb-4">
              <Card.Body>
                <h5>Информация об игре</h5>
                <Row>
                  <Col md={6}>
                    <p>Дата релиза: {dateFormatter(currentGame.release_date)}</p>
                    <p>Издатель: {currentGame.publisher}</p>
                    <p>Разработчик: {currentGame.developer}</p>
                  </Col>
                  <Col md={6}>
                    <p>Жанр: {currentGame.genre}</p>
                    <p>Платформа: {currentGame.platform}</p>
                    <p>Статус: {currentGame.status}</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Card className="mb-4">
              <Card.Body>
                <h5>Минимальные системные требования: </h5>
                <Row>
                  <Col md={6}>
                    <p>Операционная система: {currentGame.minimum_system_requirements.os || 'Не указано'}</p>
                    <p>Процессор: {currentGame.minimum_system_requirements.processor || 'Не указано'}</p>
                    <p>Оперативная память: {currentGame.minimum_system_requirements.memory || 'Не указано'}</p>
                  </Col>
                  <Col md={6}>
                    <p>Видеокарта: {currentGame.minimum_system_requirements.graphics || 'Не указано'}</p>
                    <p>Свободное место на диске: {currentGame.minimum_system_requirements.storage || 'Не указано'}</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6}>
            <Card className="mb-4">
              <Card.Img
                variant="top"
                src={currentGame.thumbnail}
                alt={currentGame.title}
                onError={(e) => {
                  e.target.src = '/images/placeholder-image.jpg';
                  e.target.alt = 'Изображение не загружено';
                }}
              />
            </Card>
            <Card>
              <Card.Body>
                <h5>Скриншоты</h5>
                <Carousel
                  slide={false}
                  data-bs-theme="dark"
                  interval={null}
                >
                  {currentGame.screenshots.map((screenshot, index) => (
                    <Carousel.Item key={screenshot.id}>
                      <img
                        src={screenshot.image}
                        alt={`Скриншот ${index + 1}, игра ${currentGame.title}`}
                        className="d-block w-100"
                        onError={(e) => {
                          e.target.src = '/images/placeholder-image.jpg';
                          e.target.alt = 'Скриншот не загружен';
                        }}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )};

    </div>
  );
};

export default GamePage;
