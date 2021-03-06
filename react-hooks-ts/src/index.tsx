import React from "react";
import { render } from "react-dom";
import "./index.css";
import App from "./Layout";

const root: HTMLElement | null = document.getElementById("root");

render(<App />, root);
