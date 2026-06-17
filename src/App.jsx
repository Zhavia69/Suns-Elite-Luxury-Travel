import React from "react";
import Routes from './Routes';
import { AuthProvider } from './contexts/AuthContext';
import MobileBookingBar from './components/ui/MobileBookingBar';


function App() {
  return (
    <AuthProvider>
      <Routes />
      <MobileBookingBar />
    </AuthProvider>
  );
}

export default App;