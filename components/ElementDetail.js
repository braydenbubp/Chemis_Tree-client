/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { getSingleElement } from '../api/elements';

export default function ElementDetail({ elementId }) {
  const [element, setElement] = useState(null);

  const getOneElement = () => {
    getSingleElement(elementId).then((data) => {
      setElement(data);
    });
  };

  useEffect(() => {
    if (elementId) {
      getOneElement();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>{element?.name}</h1>
      <h1>{element?.symbol}</h1>
      <h2>Atomic mass: {element?.mass}</h2>
      <h2>{element?.group}</h2>
      <a href={element?.link}>For more details on {element?.name}, go here!</a>
    </div>
  );
}
