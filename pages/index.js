import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Alert, Button, Spinner } from 'react-bootstrap';
// eslint-disable-next-line import/no-extraneous-dependencies
import { X } from 'lucide-react';
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

  const totalElementCoount = useMemo(() => Object.values(selectElements).reduce((sum, el) => sum + el.count, 0), [selectElements]);

  return (
    <div className="container mx-auto px-4">
      <div className="text-center my-4">
        <Button onClick={toggleCompoundMode} className="mb-4">
          {isCompoundMode ? 'Exit Compound Mode' : 'Compound Mode'}
        </Button>

        {isCompoundMode && (
          <div className="mt-1">
            <Button onClick={handleSubmit} disabled={totalElementCoount < 2 || isloading} className="mb-2">
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
          </div>
        )}
      </div>

      {errorMessage && (
        <Alert variant="danger" onClose={() => setErrorMessage(null)} dismissible className="mb-4">
          {errorMessage}
        </Alert>
      )}

      <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
        {isCompoundMode && (
        <div style={{ marginBottom: '1rem' }}>
          <h2 style={{
            fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', textAlign: 'center',
          }}
          >Selected Elements
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', margin: '0 -0.25rem' }}>
            {Object.entries(selectElements).map(([id, el]) => (
              <div key={id} style={{ width: 'calc(20% - 0.5rem)', margin: '0 0.25rem 0.5rem' }}>
                <div style={{
                  padding: '0.25rem',
                  borderRadius: '0.25rem',
                  border: '1px solid #e5e7eb',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.75rem',
                }}
                >
                  <span style={{ fontWeight: 'bold' }}>{el.symbol}</span>
                  <span>(x{el.count})</span>
                  <button
                    type="button"
                    onClick={() => removeElement(id)}
                    style={{
                      padding: '0.125rem',
                      color: '#6b7280',
                      cursor: 'pointer',
                      border: 'none',
                      background: 'none',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    aria-label="Remove element"
                  >
                    <X size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        )}
      </div>

      <PeriodicTable
        onElementClick={handleElementClick}
        selectElements={multiSelect}
        isCompoundMode={isCompoundMode}
      />
    </div>
  );
}

export default Home;
