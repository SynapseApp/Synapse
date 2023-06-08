import "../pages-styles.scss";
import AuthComponent from "./AuthComponent";

export default function AuthPage() {
  return (
    <section id="Login-Page">
      <header>
        <h3 className="italic">
          Welcome To <span className="brand glow-effect-text">Synapse</span>
        </h3>
      </header>

      <main>
        <AuthComponent />
      </main>

      <footer>Copyright@Synapse {new Date().getFullYear()}</footer>
    </section>
  );
}
