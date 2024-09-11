import TreeForm from '../../components/forms/TreeForm';
import { useAuth } from '../../utils/context/authContext';

export default function NewTree() {
  const { user } = useAuth();

  return (
    <div>
      <TreeForm user={user} />
    </div>
  );
}
