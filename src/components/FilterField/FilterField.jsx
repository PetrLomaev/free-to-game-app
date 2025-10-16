import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetFilters, toggleGenreFilter, togglePlatformFilter } from '../../slices/gamesSlice';
import { Accordion, Badge, Button, Card, Col, Form, Row } from 'react-bootstrap';
import { X } from 'react-bootstrap-icons';

const FilterField = () => {
  const dispatch = useDispatch();

  const {
    activeFilters,
    availablePlatforms,
    availableGenres
  } = useSelector((state) => state.games);

  const handlePlatformFilter = (filterOption) => {
    dispatch(togglePlatformFilter(filterOption));
  };

  const handleGenreFilter = (filterOption) => {
    dispatch(toggleGenreFilter(filterOption));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  const isAnyFilterActive = activeFilters.platforms.length > 0 || activeFilters.genres.length > 0;

  return (
    <Card className="mb-4">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Фильтры</h5>
        {isAnyFilterActive && (
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => handleResetFilters()}>
            <X className="me-1" />
            Сбросить
          </Button>
        )}
      </Card.Header>
      <Card.Body>
        <Accordion alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              PLATFORMS
              {activeFilters.platforms.length > 0 && (
                <Badge bg="primary" className="ms-2">
                  {activeFilters.platforms.length}
                </Badge>
              )}
            </Accordion.Header>
            <Accordion.Body>
              <Form>
                <Row>
                  {availablePlatforms.map((platform) => (
                    <Col key={platform} xs={6} md={12}>
                      <Form.Check // prettier-ignore
                        type="checkbox"
                        id={platform}
                        label={platform}
                        checked={activeFilters.platforms.includes(platform)}
                        onChange={() => handlePlatformFilter(platform)}
                        className="mb-2"
                      />
                    </Col>
                  ))}
                </Row>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              GENRES
              {activeFilters.genres.length > 0 && (
                <Badge bg="primary" className="ms-2">
                  {activeFilters.genres.length}
                </Badge>
              )}
            </Accordion.Header>
            <Accordion.Body>
              <Form>
                <Row>
                  {availableGenres.map((genre) => (
                    <Col key={genre} xs={6} md={12}>
                      <Form.Check // prettier-ignore
                        type="checkbox"
                        id={genre}
                        label={genre}
                        checked={activeFilters.genres.includes(genre)}
                        onChange={() => handleGenreFilter(genre)}
                        className="mb-2"
                      />
                    </Col>
                  ))}
                </Row>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Card.Body>
    </Card>
  );
};

export default FilterField;
