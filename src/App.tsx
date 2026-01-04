import "./App.css";
import { Button } from "@/components/ui/Button/Button";
import { StatusBadge, PriorityBadge } from "@/components/ui/Badge";
import type { TodoStatus, TodoPriority } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input/Input";
import { Checkbox } from "./components/ui/Checkbox/Checkbox";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "./components/ui/Card/Card.types";
import { Select } from "./components/ui/Select/Select";

// Definisikan interface untuk Todo
interface Todo {
  title: string;
  status: TodoStatus;
  priority: TodoPriority;
}

// Pindahkan TodoItem component ke luar App component
function TodoItem({ todo }: { todo: Todo }) {
  return (
    <div className="flex items-center gap-2 p-4 bg-white rounded-lg shadow">
      <h3 className="font-medium">{todo.title}</h3>

      {/* Status Badge */}
      <StatusBadge status={todo.status} size="sm" />

      {/* Priority Badge */}
      <PriorityBadge priority={todo.priority} size="sm" />
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <Button variant="primary" size="md">
          Click Me
        </Button>

        <TodoItem
          todo={{
            title: "Finish React Project",
            status: "in-progress",
            priority: "high",
          }}
        />

        {/* Contoh multiple todos */}
        <TodoItem
          todo={{
            title: "Review pull requests",
            status: "not-started",
            priority: "medium",
          }}
        />

        <TodoItem
          todo={{
            title: "Deploy to production",
            status: "done",
            priority: "high",
          }}
        />

        <Input label="Email" type="Email" />

        <Checkbox label="Accept Terms and Conditions" />

        <Card>
          <CardHeader
            title="Card Title"
            subtitle="Card subtitle or description"
          />
          <CardBody>
            <p>This is the main content of the card.</p>
          </CardBody>
          <CardFooter>
            <Button variant="primary">Action</Button>
          </CardFooter>
        </Card>

        <Select
          label="Priority"
          options={["High", "Medium", "Low"]}
          placeholder="Select priority"
        />
      </div>
    </div>
  );
}

export default App;
