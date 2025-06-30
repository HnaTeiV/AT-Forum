import Header from "../components/header";
import Footer from "../components/footer";
import { Outlet } from "react-router-dom";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Layout() {
  const container = useRef(null);
  useGSAP(
    () => {
      requestAnimationFrame(() => {
        ScrollSmoother.create({
          smooth: 0.3,
          effects: true,
          smoothTouch: 0.1,
        });
      });
      return () => {
        ScrollSmoother.get()?.kill(); // clean up smoother on unmount
      };
    },

    { scope: container }
  );

  return (
    <div id="smooth-wrapper" ref={container}>
      <div id="smooth-content">
        <Header />
        <main className="app-body">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
