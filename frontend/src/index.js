import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import store from "./store"
import "./bootstrap.min.css"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <Provider store={store}>
    <PayPalScriptProvider
      options={{
        "client-id":
          "AXgEuouoeO36rT1z4unmN55mn6Q2uIva7Bz7KIuz98PlInFjoRnITZdxl3nYO6VCwdSYvSwjPcv48V6D",
        currency: "USD",
      }}
    >
      <App />
    </PayPalScriptProvider>
  </Provider>
)

reportWebVitals()
