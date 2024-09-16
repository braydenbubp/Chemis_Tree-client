/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { getAllElements } from '../api/elements';
import ElementCard from './ElementCard';

export default function PeriodicTable({ onElementClick, selectElements, isCompoundMode }) {
  const [elements, setElements] = useState([]);

  const getTheElements = () => {
    getAllElements().then(setElements);
  };

  useEffect(() => {
    getTheElements();
  }, []);

  return (
    <div id="periodic-container">
      <div id="table">
        {elements.map((element) => (
          <ElementCard
            key={element.id}
            elementObj={element}
            onUpdate={getTheElements}
            onClick={() => onElementClick(element)}
            selectElements={selectElements}
            isCompoundMode={isCompoundMode}
            style={{
              gridColumn: element.group,
              gridRow: element.period,
            }}
          />
        ))}
      </div>
    </div>
  );
}
