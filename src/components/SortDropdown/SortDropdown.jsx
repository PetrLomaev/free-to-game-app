import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveSortOption } from '../../slices/gamesSlice';
import { Dropdown, Button, ButtonGroup } from 'react-bootstrap';

const SortDropdown = () => {
  const dispatch = useDispatch();
  const { activeSortOption } = useSelector((state) => state.games);

  const handleSort = (opt) => {
    dispatch(setActiveSortOption(opt));
  };

  const getSortButtonText = () => {
    switch (activeSortOption) {
      case 'date_old_first': return 'По дате (по возрастанию)';
      case 'date_new_first': return 'По дате (по убыванию)';
      default: return 'Без сортировки';
    }
  };

  return (
    <Dropdown as={ButtonGroup} className="d-flex">
      <Button
        variant='outline-secondary'
        className="text-nowrap"
      >
        {getSortButtonText()}
      </Button>
      <Dropdown.Toggle
        split
        variant="outline-secondary"
      />
      <Dropdown.Menu>
        <Dropdown.Item
          eventKey="1"
          onClick={() => handleSort('not_sorted')}
        >
          Без сортировки
        </Dropdown.Item>
        <Dropdown.Item
          eventKey="2"
          onClick={() => handleSort('date_old_first')}
        >
          По дате релиза (по возрастанию)
        </Dropdown.Item>
        <Dropdown.Item
          eventKey="3"
          onClick={() => handleSort('date_new_first')}
        >
          По дате релиза (по убыванию)
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SortDropdown;
