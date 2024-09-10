import { useRouter } from 'next/router';
import CompoundDetail from '../../components/CompoundDetails';

export default function CompoundView() {
  const router = useRouter();
  const { id } = router.query;

  return <CompoundDetail compoundId={id} />;
}
