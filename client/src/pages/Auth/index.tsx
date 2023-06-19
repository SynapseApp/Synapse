import '../pages-styles.scss';
import AuthComponent from './AuthComponent';

type AuthPageProps = {
  setAuthenticated: (value: boolean) => void;
};

export default function AuthPage({ setAuthenticated }: AuthPageProps) {
  return (
    <section id="Login-Page">
      <header>
        <h3 className="italic">
          Welcome To <span className="brand glow-effect-text">Synapse</span>
        </h3>
      </header>

      <main>
        <AuthComponent setAuthenticated={setAuthenticated} />
      </main>

      <footer>Copyright@Synapse {new Date().getFullYear()}</footer>
    </section>
  );
}
