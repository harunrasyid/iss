import { Map } from "./components/Map";

function App() {
  return (
    <div
      style={{
        display: "flex",
        overflow: "hidden",
        height: "100vh",
        maxWidth: "100vw",
        width: "100vw",
        backgroundColor: "black",
      }}
    >
      <Map />
    </div>
  );
}

export default App;
