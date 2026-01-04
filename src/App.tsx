import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from '@/features/auth';
import { TodosProvider } from '@/features/todos/context/TodosProvider';
import { router } from '@/routes';

function App() {
  return (
    <AuthProvider>
      <TodosProvider>
        <RouterProvider router={router} />
      </TodosProvider>
    </AuthProvider>
  );
}

export default App;
