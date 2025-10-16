import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setGame, setLoading } from '../slices/gamePageSlice';
import dateFormatter from '../utils/dateFormatter';
import '../App.css';
import { Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const GamePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentGame, loading } = useSelector((state) => state.gamePage);

  useEffect(() => {
    const getCurrentGameData = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get(`/freetogame-api/api/game?id=${id}`);
        dispatch(setGame(response.data));
      } catch (error) {
        console.log(error);
        if (error.code === 'ERR_NETWORK') {
          throw new Error('Запрос не сработал?');
        }
        if (error.response.status >= 500) {
          throw new Error('Запрос не сработал? Время ожидания истекло?');
        }
      } finally {
        dispatch(setLoading(false));
      }
    };

    getCurrentGameData();
  }, [dispatch, id]);

  const handleBack = () => {
    navigate('/');
  };

  if (loading) {
    return (<div>Loading...</div>);
    
  }


  return (
    <div className="container mt-4">
      <h1>{currentGame.title}</h1>
      <h5>Информация об игре</h5>
      <p>Дата релиза: {dateFormatter(currentGame.release_date)}</p>
      <p>Издатель: {currentGame.publisher}</p>
      <p>Разработчик: {currentGame.developer}</p>
      <p>Жанр: {currentGame.genre}</p>
      <h5>Минимальные системные требования: </h5>
      <p>Операционная система: {currentGame.minimum_system_requirements.os}</p>
      <p>Процессор: {currentGame.minimum_system_requirements.processor}</p>
      <p>Оперативная память: {currentGame.minimum_system_requirements.memory}</p>
      <p>Видеокарта: {currentGame.minimum_system_requirements.graphics}</p>
      <p>Свободное место на диске: {currentGame.minimum_system_requirements.storage}</p>
      <p>Картинка???: </p>
      <p>Карусель скриншотов???: </p>
      <button onClick={handleBack}>Назад к списку игр</button>
    </div>
  );
};

export default GamePage;
