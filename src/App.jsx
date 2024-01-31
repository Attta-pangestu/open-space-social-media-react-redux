import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// pages
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
// component
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
// action
import { asyncPreloadProcess } from "./states/isPreload/action";
import { unsetAuthUserActionCreator } from "./states/auth/action";

function App() {
  const {authUser=null, isPreload=true} = useSelector((states) => states );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]) ; 

  const signOut = () => {
    dispatch(unsetAuthUserActionCreator());
  };



  if(isPreload){
    return null;
  }

  if(authUser === null) {
    return (
      <>
        <Loading/>
        <main>
          <Routes>
            <Route path="/*" element={<AuthPage page="login" />} />
            <Route path="/register" element={<AuthPage page="register" />} />
          </Routes>
        </main>
      </>
    )
  }
  
  return(
    <>
        <Loading/>
      <div className="app-container">
        <header>
          <Navigation signOutHandler={signOut} authUser={authUser}/>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/detail-talk/:id" element={<DetailPage />} />
          </Routes>
        </main>
      </div>
    </>
    
  );

}

export default App
