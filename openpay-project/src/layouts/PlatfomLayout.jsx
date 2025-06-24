import logo from "../styles/image/logo.png";
import Navbar from "../components/Navbar";
// import useStudentStore from "../store/studentStore"; // Para futuro uso

export default function PlatformLayout({ children }) {
  // const { students } = useStudentStore(); // Solo para referencia

  return (
    <main className="container-fluid p-0">
      <Navbar logo={logo} />

      <div className="backgroundMain minHeight100vh pt-5">
        <section className="d-flex justify-content-center align-items-center mt-5">
          <div className="bg-white rounded py-4 px-3 mt-4">
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}