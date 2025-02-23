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
          element={<Login />}
        />
      </Route>
      <Route element={<Drawer />}>
        <Route
          path='notes'
          element={<Notes />}
        />
      </Route>
    </Routes>
  );
}

export default App;
