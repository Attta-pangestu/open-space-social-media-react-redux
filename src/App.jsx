import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// pages
import AuthPage from "./pages/AuthPage";

// action
import { asyncPreloadProcess } from "./states/isPreload/action";


function App() {
  const {authUser=null, isPreload=true} = useSelector((states) => states );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]) ; 



  if(isPreload){
    return null;
  }

  if(authUser === null) {
    return (
      <>
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
      <main>
        <section>HAI Kamu udh login</section>
      </main>
    </>
    
  );

}

export default App
