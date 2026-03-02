import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveSortOption } from '../../slices/gamesSlice';
import { Dropdown, Button, ButtonGroup } from 'react-bootstrap';

const dateOldFirstText = 'По дате релиза (по возрастанию)';
const dateNewFirstText = 'По дате релиза (по убыванию)';
const withoutSortText = 'Без сортировки';

const SortDropdown = () => {
  const dispatch = useDispatch();
  const { activeSortOption } = useSelector((state) => state.games);

  const handleSort = (opt) => {
    dispatch(setActiveSortOption(opt));
  };

  const getSortButtonText = () => {
    switch (activeSortOption) {
      case 'date_old_first':
        return dateOldFirstText;
      case 'date_new_first':
        return dateNewFirstText;
      default:
        return withoutSortText;
    }
  };

  return (
    <Dropdown as={ButtonGroup}>
      <Button variant="outline-secondary" className="text-nowrap" style={{ minWidth: '140px' }}>
        {getSortButtonText()}
      </Button>
      <Dropdown.Toggle split variant="outline-secondary" />
      <Dropdown.Menu>
        <Dropdown.Item eventKey="1" onClick={() => handleSort('not_sorted')}>
          {withoutSortText}
        </Dropdown.Item>
        <Dropdown.Item eventKey="2" onClick={() => handleSort('date_old_first')}>
          {dateOldFirstText}
        </Dropdown.Item>
        <Dropdown.Item eventKey="3" onClick={() => handleSort('date_new_first')}>
          {dateNewFirstText}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SortDropdown;
