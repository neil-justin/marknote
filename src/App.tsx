import { Route, Routes } from 'react-router';
import Register from '@routes/Register';
import { useState } from 'react';
import { User } from 'firebase/auth';
import VerificationReminder from './app/routes/VerificationReminder';
import Login from '@routes/Login';
import Drawer from '@/components/Drawer';
import Notes from '@routes/Notes';

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
          element={<Notes user={user as User} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
