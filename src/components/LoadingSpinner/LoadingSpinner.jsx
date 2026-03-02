import React from 'react';
import { Spinner } from 'react-bootstrap';

const spanLoadingText = 'Загрузка...';

const LoadingSpinner = ({ message = spanLoadingText }) => {
  return (
    <div className="d-flex align-items-center justify-content-center w-100">
      <Spinner animation="border" role="status" size="md" className="me-3">
        <span className="visually-hidden">{spanLoadingText}</span>
      </Spinner>
      {message && <span className="text-muted small">{message}</span>}
    </div>
  );
};

export default LoadingSpinner;
