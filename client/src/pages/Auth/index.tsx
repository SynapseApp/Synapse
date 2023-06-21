import "../pages-styles.scss";
import Auth from "./Auth";

type AuthPageProps = {
  setAuthenticated: (value: boolean) => void;
};

export default function AuthPage({ setAuthenticated }: AuthPageProps) {
  return (
    <section id="Auth-Page">
      <header>
        <h3 className="italic">
          Welcome To <span className="brand glow-effect-text">Synapse</span>
        </h3>
      </header>

      <main>
        <Auth setAuthenticated={setAuthenticated} />
      </main>

      <footer>
        {/* Display the copyright year */}
        Copyright@Synapse {new Date().getFullYear()}
      </footer>
    </section>
  );
}
