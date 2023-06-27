import { Link } from "react-router-dom";

export default function RootPage() {
  return (
    <>
      <div
        id="Root-Page"
        className="flex justify-center items-center w-screen h-screen gap-5"
      >
        <Link to="/auth">
          <button className="gradient-box glow-effect-border">Sign Up</button>
        </Link>

        <Link to="/home">
          <button className="gradient-box glow-effect-border">
            Go To Home
          </button>
        </Link>
      </div>
    </>
  );
}
