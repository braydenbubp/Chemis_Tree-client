import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Alert, Button, Spinner } from 'react-bootstrap';
import PeriodicTable from '../components/PeriodicTable';
import { createCompound } from '../api/compounds';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const [isCompoundMode, setIsCompoundMode] = useState(false);
  const [singleElement, setSingleElement] = useState(null);
  const [selectElements, setSelectElements] = useState({});
  const [isloading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const router = useRouter();
  const { user } = useAuth();

  const handleElementClick = (element) => {
    if (isCompoundMode) {
      setSelectElements((prev) => {
        const newSelected = { ...prev };
        if (newSelected[element.id]) {
          newSelected[element.id] = {
            ...newSelected[element.id],
            count: newSelected[element.id].count + 1,
          };
        } else {
          newSelected[element.id] = { ...element, count: 1 };
        }
        return newSelected;
      });
    } else {
      setSingleElement(element);
    }
  };

  const removeElement = (elementId) => {
    setSelectElements((prev) => {
      const newSelected = { ...prev };
      if (newSelected[elementId] && newSelected[elementId].count > 1) {
        newSelected[elementId] = {
          ...newSelected[elementId],
          count: newSelected[elementId].count - 1,
        };
      } else {
        delete newSelected[elementId];
      }
      return newSelected;
    });
  };

  const toggleCompoundMode = () => {
    setIsCompoundMode(!isCompoundMode);
    setSelectElements({});
    setSingleElement(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    const payload = {
      includeElements: Object.values(selectElements).flatMap((el) => Array(el.count).fill(el.symbol)),
      user: user.uid,
    };

    createCompound(payload).then(() => router.push('/compounds')).catch((error) => {
      console.warn(error.message);
      if (error.message && error.message.includes('Unexpected token')) {
        setErrorMessage('This compound does not exist, try making another!');
      } else if (error.response) {
        if (error.response.status === 500) {
          setErrorMessage('This compound does not exist, try making another!');
        } else {
          setErrorMessage(`An error occured: ${error.response.data.message || 'Please try again.'}`);
        }
      } else if (error.request) {
        setErrorMessage('No response received from the server. Please check your connection and try again.');
      } else {
        setErrorMessage('An error occured while creating your compound, please try again');
      }
    }).finally(() => setIsLoading(false));
  };

  const multiSelect = useMemo(() => {
    if (isCompoundMode) {
      return selectElements;
    } if (singleElement) {
      return { [singleElement]: { ...singleElement, count: 1 } };
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
        <Button onClick={handleSubmit} disabled={Object.keys(selectElements).length < 2 || isloading}>
          {isloading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span className="visually-hidden">Loading...</span>
            </>
          ) : (
            'Create Compound'
          )}
        </Button>
        )}
      </>
      {errorMessage && (
        <Alert variant="danger" onClose={() => setErrorMessage(null)} dismissable>
          {errorMessage}
        </Alert>
      )}
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
              {Object.entries(selectElements).map(([id, el]) => (
                <li key={id}>{el.symbol} (x{el.count})
                  <Button onClick={() => removeElement(parseInt(id, 10))}>Remove</Button>
                </li>
              ))}
            </ul>
          </>
        )}
      </>
    </>
  );
}

export default Home;
