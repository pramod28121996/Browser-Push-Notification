import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [permission, setPermission] = useState("");

  useEffect(() => {
    setPermission(Notification.permission);       
    return () => {};
  }, []);

  const handleBtnClick = () => {
    try {
      if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          setPermission(permission);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handlePopupBtnClick = async () => {
    try {
      //   var options = {
      //     body: "This is the body of the Notification",
      //     icon: "https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      //     dir: "ltr"
      //   };
      //  new Notification("Notification Demo", options);      
      if ("Notification" in window) {
          const registration = await navigator.serviceWorker.getRegistration();
          registration.showNotification("New notification", {
            body: "This is a test notification",
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <button className="btn-notification" onClick={handleBtnClick}>
            Click For Notification Permission
          </button>
          <br />
          Current permission is : {permission}
          <br />
          {permission === "granted" && (
            <button className="btn-notification" onClick={handlePopupBtnClick}>
              Click To Popup Site Notification
            </button>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
