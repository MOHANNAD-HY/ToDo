import "./App.css";
import Header from "./components/Header";
import NewTask from "./components/NewTask";
import TasksList from "./components/TasksList";
import TaskContextProvider from "./store/TaskContext";

function App() {
  return (
    <>
      <TaskContextProvider>
        <Header />
        <NewTask />
        <TasksList />
      </TaskContextProvider>
    </>
  );
}

export default App;
