import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import { ArrowClockwise, ExclamationTriangle } from 'react-bootstrap-icons';

const AlertError = ({
  error,
  onRetry = null,
  onClose = null,
  className = '',
  variant = 'danger',
}) => {

  if (!error) return null;

  const getErrorMessage = (error) => {
    if (typeof error === 'string') return error;

    if (error.code === 'ERR_NETWORK') {
      return 'Проблемы с подключением к интернету. Проверьте Ваше соединение.';
    }
    if (error.code === 'ECONNABORTED') {
      return 'Запрос превысил время ожидания. Пожалуйста, попробуйте еще раз.';
    }

    if (error.responseStatus) {
      switch (error.responseStatus) {
        case 404: return 'Запрашиваемые данные не найдены.';
        case 500: return 'Внутрення ошибка сервера. Пожалуйста, попробуйте позже';
        default: return `Ошибка сервера: ${error.responseStatus}`;
      }
    }

    return 'Произошла непредвиденная ошибка. Пожалуйста, попробуйте еще раз.';
  };

  return (
    <Alert
      variant={variant}
      className={className}
      dismissible={!!onClose}
      onClose={onClose}
    >
      <div className="d-flex align-items-center">
        <ExclamationTriangle size={20} className="me-2" />
        <div className="flex-grow-1">
          <Alert.Heading className="h6 mb-1">
            Ошибка загрузки
          </Alert.Heading>
          <p className="mb-0">{getErrorMessage(error)}</p>
        </div>
        {onRetry && (
          <Button
            variant="outline-danger"
            size="sm"
            onClick={onRetry}
            className="ms-3"
          >
            <ArrowClockwise size={14} className="me-1" />
            Повторить
          </Button>
        )}
      </div>
    </Alert>
  );
};

export default AlertError;
