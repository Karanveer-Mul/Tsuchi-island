import { notify } from "react-notify-toast";
import Spinner from "./Spinner.js";
import { API_URL } from "../config";
import { useState } from "react";

export function Landing() {
  const [sendingEmail, setSendingEmail] = useState(false);

  onSubmit = (event) => {
    event.preventDefault();
    setSendingEmail(true);

    fetch(`${API_URL}/email`, {
      method: "POST",
      headers: {
        accept: "application/JSON",
        "content-type": "application/JSON",
      },
      body: JSON.stringify({ email: this.email.value }),
    })
      .then((res) => res.json())
      .then((data) => {
        setSendingEmail(false);
        notify.show(data.msg);
        form.reset();
      });
  };

  return (
    <form onSubmit={onSubmit} ref={(form) => (form = form)}>
      <div>
        <input
          type="email"
          name="email"
          ref={(input) => (this.email = input)}
          required
        />
        <label htmlFor="email">email</label>
      </div>
      <div>
        <button type="submit" className="btn" disabled={sendingEmail}>
          {sendingEmail ? (
            <Spinner size="lg" spinning="spinning" />
          ) : (
            "Let's Go!"
          )}
        </button>
      </div>
    </form>
  );
}
