import { useRouter } from 'next/router';
import TreeDetail from '../../components/TreeDetails';

export default function TreeView() {
  const router = useRouter();
  const { id } = router.query;

  return <TreeDetail treeId={id} />;
}
