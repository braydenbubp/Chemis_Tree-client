/* eslint-disable react/prop-types */
// import { useState } from 'react';
// import { useAuth } from '../utils/context/authContext';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

export default function TempElement({
  elementObj, onClick, isCompoundMode, selectElements,
}) {
  const handleClick = (e) => {
    if (isCompoundMode) {
      e.preventDefault();
      onClick(elementObj);
    }
  };

  const elementCount = selectElements[elementObj.id]?.count || 0;

  return (
    <>
      {/* <div>
        <h2>{elementObj.symbol}</h2>
        <h5>{elementObj.group}</h5>
      </div> */}
      <>
        <Link href={`/element/${elementObj.id}`} passHref>
          <Button id="view-btn" onClick={handleClick} className={`element ${elementObj.group} ${elementObj.symbol} ${elementCount > 0 ? 'selected' : ''}`}>
            <span className="element-symbol">{elementObj.symbol}</span>
            <span className="element-name">{elementObj.name}</span>
            {isCompoundMode && elementCount > 0 && (
              <span className="element-count">{elementCount}</span>
            )}
          </Button>
        </Link>
      </>
    </>
  );
}

TempElement.propTypes = {
  elementObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    mass: PropTypes.number,
    symbol: PropTypes.string,
    group: PropTypes.string,
  }).isRequired,
};
