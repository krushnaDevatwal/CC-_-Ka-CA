import AddUser from "./Components/Adduser";
import AddTeacher from "./Components/Teacher";


const App = () => {
  return (
    <>
      <div className="App">
        <AddUser />
        <div style={{ marginTop: '100px' }}>
          <AddTeacher />
        </div>
      </div>
    </>
  );
};

export default App;
