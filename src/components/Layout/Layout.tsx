import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Layout() {
  return ( 
    <div className="app">
      <Header/>
      <main className="app__content container">
        <Outlet/>
      </main>
      <Footer/>
    </div>
   );
}

export default Layout;