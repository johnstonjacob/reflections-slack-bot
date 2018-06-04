import React from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import PropTypes from 'prop-types';

export default function Dropdown(props) {
  return (
    <UncontrolledDropdown>
      <DropdownToggle caret>Students</DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>Students</DropdownItem>
        {props.students.map(item => (
          <DropdownItem key={item[0]}>
            {item[0]} - {item[1]}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}

Dropdown.propTypes = {
  // students: PropTypes.array.isRequired,
  students: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
};
