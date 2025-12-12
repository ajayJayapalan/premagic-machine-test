import React, { useEffect } from 'react';
import "./App.css"
import { useDispatch, useSelector } from 'react-redux';
import { seedViewers } from './store/seed';
import ActiveViewer from './components/app-components/ActiveViewer';
import RecentViews from './components/app-components/RecentViews';
import Filters from './components/app-components/Filters';
import TextOverlay from './components/app-components/TextOverlay';


const Viewer = () => {
  return (
    <div className="flex-1 p-6 flex flex-col overflow-y-auto">
      <ActiveViewer />
      <RecentViews />
    </div>
  );
};

const Editor = () => {
  return (
    <div className="w-96 bg-zinc-900 border-l border-zinc-800 flex flex-col">
      <Filters />
      <TextOverlay />
    </div>
  );
};

// Main App Component
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    seedViewers(dispatch);
  }, []);

  return (
    <div className="h-screen w-full bg-zinc-950 flex overflow-hidden">
      <Viewer />
      <Editor />
    </div>
  );
};



export default App;