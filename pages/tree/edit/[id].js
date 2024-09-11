import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleTree } from '../../../api/trees';
import TreeForm from '../../../components/forms/TreeForm';

export default function EditTree() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getSingleTree(id).then(setEditItem);
    }
  }, [id]);

  return (<TreeForm treeObj={editItem} setEditTree={setEditItem} />);
}
