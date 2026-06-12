import { identity } from "../data/content";
import Reveal from "../components/Reveal";

const Contact = () => (
  <section className="contact" id="contact">
    <div className="dot-grid" />
    <div className="container">
      <Reveal>
        <h2>Let's Build Meaningful AI Systems</h2>
        <p className="sub">
          Interested in AI transformation, program leadership, workflow design,
          or product operations? Let's connect.
        </p>
      </Reveal>
      <Reveal delay={120}>
        <div className="contact-links">
          <a className="btn btn--primary" href={`mailto:${identity.email}`}>
            Email Me
          </a>
          <a className="btn btn--ghost" href={identity.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="btn btn--ghost" href={identity.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="btn btn--ghost" href={identity.resumePdf} download>
            Resume
          </a>
          <a className="btn btn--ghost" href={identity.calendly} target="_blank" rel="noreferrer">
            Book a Call
          </a>
        </div>
      </Reveal>
    </div>
  </section>
);

export default Contact;
