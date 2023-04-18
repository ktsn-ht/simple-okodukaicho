import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { RecoilRoot } from 'recoil';
import { Router } from './router/router';
import theme from './theme/theme';

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <ChakraProvider theme={theme}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </ChakraProvider>
      </RecoilRoot>
    </div>
  );
}

export default App;
