import { useState } from 'react';
import { Layout } from './components/Layout';
import { GameMenu } from './components/GameMenu';
import { TicTacToe } from './games/TicTacToe';
import { Calculator } from './tools/Calculator';
import { Snake } from './games/Snake';
import { Memory } from './games/Memory';

export type AppView = 'menu' | 'tictactoe' | 'calculator' | 'snake' | 'memory';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('menu');

  const renderContent = () => {
    switch (currentView) {
      case 'tictactoe':
        return <TicTacToe onBack={() => setCurrentView('menu')} />;
      case 'calculator':
        return <Calculator onBack={() => setCurrentView('menu')} />;
      case 'snake':
        return <Snake onBack={() => setCurrentView('menu')} />;
      case 'memory':
        return <Memory onBack={() => setCurrentView('menu')} />;
      default:
        return <GameMenu onSelectGame={setCurrentView} />;
    }
  };

  return <Layout>{renderContent()}</Layout>;
}

export default App;