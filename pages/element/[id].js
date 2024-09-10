import { useRouter } from 'next/router';
import ElementDetail from '../../components/ElementDetail';

export default function ElementView() {
  const router = useRouter();
  const { id } = router.query;

  return <ElementDetail elementId={id} />;
}
