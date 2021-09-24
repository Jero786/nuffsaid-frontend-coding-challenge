import React from 'react';

import HomePage from "./pages/home";
import {MessageProvider} from "./contexts/message";

const App: React.FC<{}> = () => {
  return (
    <MessageProvider>
      <HomePage/>
    </MessageProvider>
  );
}

App.displayName = 'App';

export default App;
