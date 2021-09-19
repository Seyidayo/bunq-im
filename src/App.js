import { DataProvider } from 'app/context';
import Routes from 'app/routes';

function App() {
  return (
    <DataProvider>
      <Routes />
    </DataProvider>
  );
}

export default App;
