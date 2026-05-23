import { MdArrowOutward } from "react-icons/md";
import "./styles/LetsConnect.css";

const LetsConnect = () => {
  return (
    <div className="lets-connect-section section-container" id="connect">
      <div className="lets-connect-container">
        <p className="lets-connect-eyebrow">LOOKING TO BUILD SOMETHING GREAT?</p>
        <h2>
          Let's <span>Connect</span>
        </h2>
        <div className="lets-connect-buttons">
          <a
            href="mailto:yogesh.mishra080202@gmail.com"
            className="connect-btn connect-btn-primary"
            data-cursor="disable"
          >
            Email Me <MdArrowOutward />
          </a>
          <a
            href="https://www.linkedin.com/in/yogesh-mishra-pm/"
            target="_blank"
            rel="noreferrer"
            className="connect-btn connect-btn-secondary"
            data-cursor="disable"
          >
            LinkedIn <MdArrowOutward />
          </a>
        </div>
        <p className="lets-connect-email">yogesh.mishra080202@gmail.com</p>
      </div>
    </div>
  );
};

export default LetsConnect;
