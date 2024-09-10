// import { useRouter } from 'next/router';
// import { useState } from 'react';
// import { useAuth } from '../../utils/context/authContext';
// import { createCompound } from '../../api/compounds';

// const initialState = {
//   includeElements: '',
// };

// export default function CompoundForm() {
//   const [input, setInput] = useState(initialState);

//   const router = useRouter();
//   const { user } = useAuth();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setInput((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const payload = {
//       ...input,
//       uid: user.uid,
//     };

//     createCompound(payload).then(() => router.push('/compounds'));
//   };
// }
