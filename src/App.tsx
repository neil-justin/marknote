import { Route, Routes } from 'react-router';
import Register from '@routes/Register';
import { useState } from 'react';
import { User } from 'firebase/auth';
import VerificationReminder from './app/routes/VerificationReminder';
import Login from '@routes/Login';
import Drawer from '@/components/Drawer';
import Notes from '@routes/Notes';
import Archive from '@routes/Archive';
import Trash from '@routes/Trash';

function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <Routes>
      <Route path='auth'>
        <Route
          path='register'
          element={<Register updateUser={setUser} />}
        />
        <Route
          path='verification-reminder'
          element={<VerificationReminder user={user} />}
        />
        <Route
          path='login'
          element={<Login updateUser={setUser} />}
        />
      </Route>
      <Route element={<Drawer user={user} />}>
        <Route
          path='notes/:id?'
          element={<Notes />}
        />
        <Route
          path='archive/:id?'
          element={<Archive />}
        />
        <Route
          path='trash/:id?'
          element={<Trash />}
        />
      </Route>
    </Routes>
  );
}

export default App;
