import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from '@/features/auth';
import { ListsProvider } from '@/features/list';  // ✅ Import
import { TodosProvider } from '@/features/todos/context/TodosProvider';
import { router } from '@/routes';

function App() {
  return (
    <AuthProvider>
      <ListsProvider>  {/* ✅ Add ListsProvider */}
        <TodosProvider>
          <RouterProvider router={router} />
        </TodosProvider>
      </ListsProvider>
    </AuthProvider>
  );
}

export default App;
