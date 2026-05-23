import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI/Technical Program Manager</h4>
                <h5>Cars24 · Gurugram</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Led 3-pod Agile delivery for a 12-engineer team. Shipped
              price-negotiation voicebot (3,500+ calls/day, ~33% conversion),
              LLM chatbot QA pipeline, Pre-Inspection analytics dashboard, and
              Zendesk automations (1,500+ tickets/month). Managed ECS→EKS and
              Bitbucket→GitHub migrations end-to-end.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Research Analyst</h4>
                <h5>99acres.com · Noida</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Analyzed 24,000+ property listings using Google Maps, RERA, and
              government datasets for geospatial and data quality validation.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Power BI &amp; SQL Intern</h4>
                <h5>CODTECH IT Solutions · Gwalior</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Built Sales, HR, and Marketing ROI dashboards in Power BI; wrote
              SQL queries for data extraction and reporting across 3 business
              functions.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>MBA — Business Analytics</h4>
                <h5>PIMR, Gwalior</h5>
              </div>
              <h3>2023–25</h3>
            </div>
            <p>
              Specialization in Business Analytics. Atlassian Agile Project
              Management Professional Certificate.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Sc — Mathematics</h4>
                <h5>Jiwaji University, Gwalior</h5>
              </div>
              <h3>2019–22</h3>
            </div>
            <p>Bachelor of Science in Mathematics, Jiwaji University.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
