import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { ItemDetail } from './pages/ItemDetail';
import { CreateListing } from './pages/CreateListing';
import { Profile } from './pages/Profile';

function App() {
  const [currentRoute, setCurrentRoute] = useState('home');
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);
  const [showCreateWizard, setShowCreateWizard] = useState(false);

  const handleListingClick = (id: string) => {
    setSelectedListingId(id);
    setCurrentRoute('detail');
    window.scrollTo(0, 0);
  };

  const handleNavigate = (route: string) => {
    if (route === 'create') {
        setShowCreateWizard(true);
    } else {
        setCurrentRoute(route);
        setSelectedListingId(null);
        window.scrollTo(0, 0);
    }
  };

  const renderContent = () => {
    if (showCreateWizard) {
        return <CreateListing onCancel={() => setShowCreateWizard(false)} onComplete={() => setShowCreateWizard(false)} />;
    }

    if (currentRoute === 'detail' && selectedListingId) {
       return <ItemDetail listingId={selectedListingId} onBack={() => setCurrentRoute('home')} />;
    }

    switch (currentRoute) {
      case 'home':
        return <Home onListingClick={handleListingClick} />;
      case 'profile':
        return <Profile />;
      case 'messages':
        return (
            <div className="flex flex-col items-center justify-center min-h-[80vh] text-gray-400 p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                     <span className="text-2xl">💬</span>
                </div>
                <h2 className="text-xl font-bold text-gray-700 mb-2">Inbox Empty</h2>
                <p>Start a conversation by requesting to rent an item!</p>
            </div>
        );
      default:
        return <Home onListingClick={handleListingClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-white md:bg-gray-50 font-sans text-gray-900 selection:bg-primary-100 selection:text-primary-900">
      <div className="max-w-md mx-auto md:max-w-none md:mx-0 bg-white min-h-screen shadow-xl md:shadow-none">
          {!showCreateWizard && currentRoute !== 'detail' && (
              <Navbar currentRoute={currentRoute} onNavigate={handleNavigate} />
          )}
          
          <main className="animate-fade-in">
            {renderContent()}
          </main>
      </div>
    </div>
  );
}

export default App;