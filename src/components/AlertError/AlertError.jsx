import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import { ArrowClockwise, ExclamationTriangle } from 'react-bootstrap-icons';

const problemWithEnternetText = 'Проблемы с подключением к интернету. Проверьте Ваше соединение.';
const requestTimedOutText = 'Запрос превысил время ожидания. Пожалуйста, попробуйте еще раз.';
const requestedDataNotFoundText = 'Запрашиваемые данные не найдены.';
const internalServerErrorText = 'Внутрення ошибка сервера. Пожалуйста, попробуйте позже';
const serverErrorText = 'Ошибка сервера';
const unexpectedErrorOccurredText =
  'Произошла непредвиденная ошибка. Пожалуйста, попробуйте еще раз.';

const buttonRepeatText = 'Повторить';

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
      return problemWithEnternetText;
    }
    if (error.code === 'ECONNABORTED') {
      return requestTimedOutText;
    }

    if (error.responseStatus) {
      switch (error.responseStatus) {
        case 404:
          return requestedDataNotFoundText;
        case 500:
          return internalServerErrorText;
        default:
          return `${serverErrorText}: ${error.responseStatus}`;
      }
    }

    return unexpectedErrorOccurredText;
  };

  return (
    <Alert
      variant={variant}
      className={`mb-0 p-3 ${className}`}
      dismissible={!!onClose}
      onClose={onClose}
    >
      <div className="d-flex flex-wrap align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <ExclamationTriangle size={14} className="me-2 flex-shrink-0" />
          <span className="small">{getErrorMessage(error)}</span>
        </div>

        {onRetry && (
          <Button
            variant="outline-danger"
            size="sm"
            onClick={onRetry}
            className="ms-2 mt-2 flex-shrink-0 w-50"
          >
            <ArrowClockwise size={12} className="me-1" />
            {buttonRepeatText}
          </Button>
        )}
      </div>
    </Alert>
  );
};

export default AlertError;
