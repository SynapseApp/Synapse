import { Link } from "react-router-dom";

export default function RootPage() {
  return (
    <>
      <div
        id="Root-Page"
        className="flex justify-center items-center w-screen h-screen"
      >
        <Link to="/auth">
          <button className="gradient-box glow-effect-border">Sign Up</button>
        </Link>
      </div>
    </>
  );
}
