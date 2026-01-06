/**
 * Main App Component
 * Root component that sets up the vulnerability context provider
 */

import { VulnerabilityProvider } from './context/VulnerabilityContext';
import Dashboard from './components/Dashboard/Dashboard';
import './App.css';

function App() {
  return (
    <VulnerabilityProvider>
      <Dashboard />
    </VulnerabilityProvider>
  );
}

export default App;
