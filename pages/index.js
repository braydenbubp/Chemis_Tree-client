import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import PeriodicTable from '../components/PeriodicTable';
import { createCompound } from '../api/compounds';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const [isCompoundMode, setIsCompoundMode] = useState(false);
  const [singleElement, setSingleElement] = useState(null);
  const [selectElements, setSelectElements] = useState([]);

  const router = useRouter();
  const { user } = useAuth();

  const handleElementClick = (element) => {
    if (isCompoundMode) {
      setSelectElements((prev) => {
        if (prev.find((el) => el.id === element.id)) {
          return prev.filter((el) => el.id !== element.id);
        }
        return [...prev, element];
      });
    } else {
      setSingleElement(element);
    }
  };

  const toggleCompoundMode = () => {
    setIsCompoundMode(!isCompoundMode);
    setSelectElements([]);
    setSingleElement(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      includeElements: selectElements.map((el) => el.symbol),
      user: user.uid,
    };

    createCompound(payload).then(() => router.push('/compounds'));
  };

  const multiSelect = useMemo(() => {
    if (isCompoundMode) {
      return selectElements;
    } if (singleElement) {
      return [singleElement];
    }
    return [];
  }, [isCompoundMode, selectElements, singleElement]);

  return (
    <>
      <Button onClick={toggleCompoundMode}>
        {isCompoundMode ? 'Exit Compound Mode' : 'Compound Mode'}
      </Button>
      <>
        {isCompoundMode && (
        <Button onClick={handleSubmit} disabled={selectElements.length < 2}>
          Create Compound
        </Button>
        )}

      </>
      <PeriodicTable
        onElementClick={handleElementClick}
        selectElements={multiSelect}
        isCompoundMode={isCompoundMode}
      />
      <>
        {isCompoundMode && (
          <>
            <h2>Selected Elements</h2>
            <ul>
              {selectElements.map((el) => (
                <li key={el.id}>{el.symbol}</li>
              ))}
            </ul>
          </>
        )}
      </>
    </>
  );
}

export default Home;
