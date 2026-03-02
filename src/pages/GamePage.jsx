import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setGame, setLoading, setError, clearError } from '../slices/gamePageSlice';
import dateFormatter from '../utils/dateFormatter';
import '../App.css';
import { Row, Col, Card, Button, Carousel, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'react-bootstrap-icons';
import AlertError from '../components/AlertError/AlertError';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

const loadingSpinnerGameInformationText = 'Загрузка информации об игре...';
const buttonBackToGamesListText = 'Назад к списку игр';
const headerGameInformationText = 'Информация об игре';
const releaseDateText = 'Дата релиза: ';
const publisherText = 'Издатель: ';
const developerText = 'Разработчик: ';
const genreText = 'Жанр: ';
const platformText = 'Платформа: ';
const statusText = 'Статус: ';
const headerMinSystReqText = 'Минимальные системные требования: ';
const notSpecifiedText = 'Не указано';
const operatingSystemText = 'Операционная система: ';
const processorText = 'Процессор: ';
const ramText = 'Оперативная память: ';
const videoCardText = 'Видеокарта: ';
const freeDiskSpaceText = 'Свободное место на диске: ';
const imageNotLoadedText = 'Изображение не загружено';
const screenshotNotLoadedText = 'Скриншот не загружено';

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

    if (cached && cacheTime && Date.now() - parseInt(cacheTime) < CACHE_DURATION) {
      dispatch(setGame(cached));
      dispatch(setLoading(false));
      return;
    }

    try {
      const response = await axios.get(`/freetogame-api/api/game?id=${id}`, {
        timeout: 10000,
      });
      dispatch(setGame(response.data));
      localStorage.setItem(`game-${id}`, JSON.stringify(response.data));
      localStorage.setItem(`game-${id}-time`, Date.now().toString());
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
    getCurrentGameData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <LoadingSpinner message={loadingSpinnerGameInformationText} centered />
      </Container>
    );
  }

  if (error && !currentGame) {
    return (
      <Container className="mt-4">
        <AlertError error={error} onRetry={handleRetry} onClose={handleCloseError} />
        <div className="text-center mt-3">
          <Button variant="outline-secondary" onClick={handleBack}>
            <ArrowLeft className="me-2" />
            {buttonBackToGamesListText}
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <div className="container mt-4">
      <Button variant="outline-secondary" onClick={handleBack} className="mb-4">
        <ArrowLeft className="me-2" />
        {buttonBackToGamesListText}
      </Button>
      <AlertError error={error} onRetry={handleRetry} onClose={handleCloseError} className="mb-4" />
      {currentGame && (
        <Row>
          <Col lg={6}>
            <h1>{currentGame.title}</h1>
            <p className="lead">{currentGame.description}</p>
            <Card className="mb-4">
              <Card.Body>
                <h5>{headerGameInformationText}</h5>
                <Row>
                  <Col md={6}>
                    <p>
                      {releaseDateText} {dateFormatter(currentGame.release_date)}
                    </p>
                    <p>
                      {publisherText} {currentGame.publisher}
                    </p>
                    <p>
                      {developerText} {currentGame.developer}
                    </p>
                  </Col>
                  <Col md={6}>
                    <p>
                      {genreText} {currentGame.genre}
                    </p>
                    <p>
                      {platformText} {currentGame.platform}
                    </p>
                    <p>
                      {statusText} {currentGame.status}
                    </p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Card className="mb-4">
              <Card.Body>
                <h5>{headerMinSystReqText}</h5>
                <Row>
                  <Col md={6}>
                    <p>
                      {operatingSystemText}{' '}
                      {currentGame.minimum_system_requirements.os || notSpecifiedText}
                    </p>
                    <p>
                      {processorText}{' '}
                      {currentGame.minimum_system_requirements.processor || notSpecifiedText}
                    </p>
                    <p>
                      {ramText} {currentGame.minimum_system_requirements.memory || notSpecifiedText}
                    </p>
                  </Col>
                  <Col md={6}>
                    <p>
                      {videoCardText}{' '}
                      {currentGame.minimum_system_requirements.graphics || notSpecifiedText}
                    </p>
                    <p>
                      {freeDiskSpaceText}{' '}
                      {currentGame.minimum_system_requirements.storage || notSpecifiedText}
                    </p>
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
                  e.target.alt = imageNotLoadedText;
                }}
              />
            </Card>
            <Card>
              <Card.Body>
                <h5>Скриншоты</h5>
                <Carousel slide={false} data-bs-theme="dark" interval={null}>
                  {currentGame.screenshots.map((screenshot, index) => (
                    <Carousel.Item key={screenshot.id}>
                      <img
                        src={screenshot.image}
                        alt={`Screenshot ${index + 1}, game ${currentGame.title}`}
                        className="d-block w-100"
                        onError={(e) => {
                          e.target.src = '/images/placeholder-image.jpg';
                          e.target.alt = screenshotNotLoadedText;
                        }}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
      ;
    </div>
  );
};

export default GamePage;
