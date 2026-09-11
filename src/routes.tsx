import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Capabilities from "./pages/Capabilities";
import Methodology from "./pages/Methodology";
import About from "./pages/About";
import Insights from "./pages/Insights";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";
import { Kicker, Btn } from "./components/ui";

function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-[1320px] flex-col justify-center px-6 lg:px-10">
      <Kicker n="404">Not found</Kicker>
      <h1 className="mt-6 font-display text-6xl font-extrabold tracking-[-0.03em]">This page slipped past.</h1>
      <p className="mt-6 max-w-md text-muted">The address you followed isn't part of the Envista site.</p>
      <div className="mt-8"><Btn to="/">Back to home</Btn></div>
    </section>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "capabilities", Component: Capabilities },
      { path: "methodology", Component: Methodology },
      { path: "about", Component: About },
      { path: "insights", Component: Insights },
      { path: "faq", Component: Faq },
      { path: "contact", Component: Contact },
      { path: "*", Component: NotFound },
    ],
  },
]);
