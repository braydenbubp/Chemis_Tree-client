/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { getAllElements } from '../api/elements';
import TempElement from './TempElement';

export default function PeriodicTable({ onElementClick, selectElements, isCompoundMode }) {
  const [elements, setElements] = useState([]);

  const getTheElements = () => {
    getAllElements().then(setElements);
  };

  useEffect(() => {
    getTheElements();
  }, []);

  const isElementSelected = (element) => selectElements.some((el) => el.id === element.id);

  return (
    <div id="container">
      <div id="table">
        {elements.map((element) => (
          <TempElement
            key={element.id}
            elementObj={element}
            onUpdate={getTheElements}
            onClick={() => onElementClick(element)}
            isSelected={isElementSelected(element)}
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
