import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Connect</h4>
            <p>
              <a
                href="https://www.linkedin.com/in/yogesh-mishra-pm/"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                LinkedIn — yogesh-mishra-pm
              </a>
            </p>
            <p>
              <a
                href="mailto:yogesh.mishra080202@gmail.com"
                data-cursor="disable"
              >
                yogesh.mishra080202@gmail.com
              </a>
            </p>
            <h4>Education</h4>
            <p>MBA in Business Analytics, PIMR, Gwalior — 2023–2025</p>
            <p>B.Sc in Mathematics, Jiwaji University, Gwalior — 2019–2022</p>
            <p>Atlassian Agile Project Management Professional Certificate</p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/Yogi2809"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              GitHub <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/yogesh-mishra-pm/"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Portfolio of <br /> <span>Yogesh Mishra</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
