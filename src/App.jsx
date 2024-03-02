import Footer from "./components/Footer";
import Header from "./components/Header";
import Quiz from "./components/Quiz";

function App() {
  return (
    <div className="flex flex-col justify-start min-h-screen">
      <main>
        <Header />
        <Quiz />
      </main>
      <Footer />
    </div>
  );
}

export default App;
