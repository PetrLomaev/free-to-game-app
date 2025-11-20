import React from "react";
import { Spinner, Placeholder } from "react-bootstrap";

const LoadingSpinner = ({
  message = 'Загрузка...',
  size = 'lg',
  centered = true,
}) => {
  return (
    <div className={`d-flex flex-column align-items-${centered ? 'center' : 'start'} justify-content-center p-4`}>
      <Spinner
        animation="border"
        role="status"
        size={size}
        className={centered ? '' : 'mb-2'}
      >
        <span className="visually-hidden">Загрузка...</span>
      </Spinner>
      {message && (
        <Placeholder as="p" className={`mt-2 text-muted ${centered ? 'text-center' : ''}`}>
          {message}
        </Placeholder>
      )}
    </div>
  );
};

export default LoadingSpinner;