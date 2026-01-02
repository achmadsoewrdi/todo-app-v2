import { useEffect } from 'react';
import { testSupabaseConnection } from '@/utils/testConnection';
import './App.css';

function App() {
  useEffect(() => {
    testSupabaseConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Todo App
        </h1>
        <p className="text-gray-600">
          Check console for Supabase connection status
        </p>
      </div>
    </div>
  );
}

export default App;
