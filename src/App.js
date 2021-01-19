import { useEffect, useState } from "react";
import { Route, Redirect, Switch } from "react-rotuter-dom";
import Notifications from "react-notify-toast";
import "react-toastify/dist/ReactToastify.css";

import Landing from "./components/Landing";
import Confirm from "./components/Confirm";
import Spinner from "./components/Spinner";
import Footer from "./components/Footer/Footer";
import PageNotExists from "./components/PageNotExist";
import { API_URL } from "./config";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);

  const getData =
    (async () => {
      try {
        let response = await fetch(`${API_URL}/wake-up`);
        response = await response.json();
        await setLoading(false);
      } catch (err) {
        console.log(err);
      }
    },
    []);

  useEffect(() => {
    getData();
  }, [getData]);

  const content = () => {
    if (loading === true) {
      return <Spinner size="8x" spinning="spinnig" />;
    }

    return (
      <Switch>
        <div className="App">
          <script>
            if(loading === true){" "}
            <img src={logo} className="App-logo" alt="logo" />
          </script>

          <Route exact path="/confirm/:id" component={Confirm} />
          <Route exact path="/" component={Landing} />
          <Route exact path="/error" component={PageNotExists} />
          <Redirect from="*" to="/error" />
        </div>
      </Switch>
    );
  };

  return (
    <div className="container fadein">
      <Notifications />
      <main>{content()}</main>
      <Footer />
    </div>
  );
}

export default App;
