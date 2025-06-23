import logo from "../styles/image/logo.png";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";

export default function PlatformLayout({ children }) {
  const location = useLocation();
  const students = location.state?.student || [];

  return (
    <main className="container-fluid p-0">
      <section className="d-flex flex-column justify-content-center align-items-center">
        <Navbar students={students} logo={logo} />

        <div className="container-fluid backgroundMain minHeight100vh pt-5">
          <section className="d-flex justify-content-center align-items-center mt-5">
            <div className="d-flex flex-column justify-content-center align-items-center bg-white rounded py-4 px-3 mt-4">
              {children}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}