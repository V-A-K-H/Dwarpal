import Lottie from "lottie-react";
import HomePage from "../../WebPagePhotos/HomePage.png";
import LoginPage from "../../WebPagePhotos/LoginPage.jpg";
import AdminTable from "../../WebPagePhotos/AdminTable.png";
import ProfilePage from "../../WebPagePhotos/ProfilePage.png";

import { useState, useEffect, useRef } from "react";
import "./landingPage.css";
import { Link, useNavigate } from "react-router-dom";
import qrScannerAnim from "./QR Code Scanner.json";
import { FaStar } from "react-icons/fa";

function LandingPage() {
  const navigate = useNavigate();
  const nextSectionRef = useRef(null);

  useEffect(() => {
    const whouse = localStorage.getItem("Auth");
    if (whouse === "user" || whouse === "admin") {
      navigate("HomePage");
    }

    const scrollTimer = setTimeout(() => {
      nextSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 5000);

    return () => clearTimeout(scrollTimer);
  }, []);

  // Force white color for QR animation
  qrScannerAnim.layers?.forEach((layer) => {
    layer.shapes?.forEach((shapeGroup) => {
      shapeGroup.it?.forEach((item) => {
        if (item.c && Array.isArray(item.c.k)) {
          item.c.k = [1, 1, 1, 1];
        }
        if (item.c && Array.isArray(item.c.k[0])) {
          item.c.k = item.c.k.map(() => [1, 1, 1, 1]);
        }
      });
    });
  });

  const feedbacks = [
    {
      name: "Dr. Sandesh Tripathi",
      comment:
        "A smart solution for campus security. Great initiative and execution!",
      stars: 5,
    },
    {
      name: "Aryan Raj",
      comment:
        "User experience is seamless, and the QR system is very effective.",
      stars: 4,
    },
    {
      name: "Kritik Sharma",
      comment: "Impressive design with real-world utility!",
      stars: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentFeedback = feedbacks[currentIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === feedbacks.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [feedbacks.length]);

  return (
    <>
      <nav className="mainNav">
        <div className="mainNav__logo">DWARPAL</div>

        <div className="mainNav__icon">
          <a className="mainNav__link">
            <Link to="signUp">Login</Link>
          </a>
        </div>
      </nav>

      <header className="mainHeading">
        <div className="mainHeading__container">
          <div className="mainHeading__text">
            <h2 className="mainHeading__title">
              College Entry/Exit Authenticator
            </h2>
            <p className="mainHeading__description">
              We offer a secure and reliable service to access and maintain the
              information about the student's entry and exit from the college
              campus. <br /> Designed exclusively for BIAS Bhimtal students,
              this system ensures only verified individuals can access campus
              facilities, keeping your environment safe, smart, and traceable.{" "}
              <br />
              Just log in, scan, and move confidently.
            </p>
            <Link to="/signUp">
              <button className="cta">Login</button>
            </Link>
          </div>

          <div className="mainHeading__qr">
            <Lottie
              animationData={qrScannerAnim}
              className="qr-animation"
              loop
              renderer="svg" // 👈 forces SVG renderer for transparency
            />
          </div>
        </div>
      </header>

      <section class="products upgraded" ref={nextSectionRef} id="next-section">
        <div class="products-header">
          <h2>Core Functionalities of DWARPAL</h2>
          <p>
            Every entry. Every exit. Authenticated and accounted for — enhancing
            campus security and automation.
          </p>
        </div>
        <div class="product-grid">
          <div class="product-card">
            <span>🔐</span>
            <h3>Secure QR Scan</h3>
            <p>
              Students scan dynamically generated admin QR codes at the gate to
              record entry or exit with precision.
            </p>
          </div>
          <div class="product-card">
            <span>🔄</span>
            <h3>Live QR Refresh</h3>
            <p>
              Admin QR changes every 5 seconds to prevent misuse or screen
              grabs. Always dynamic, always safe.
            </p>
          </div>
          <div class="product-card">
            <span>📊</span>
            <h3>Real-time Logs</h3>
            <p>
              Admins get instant access to the entry/exit activity of every
              student — time-stamped and verified.
            </p>
          </div>
          <div class="product-card">
            <span>📱</span>
            <h3>Responsive Interface</h3>
            <p>
              Optimized for mobile and desktop so that scanning and monitoring
              can be done from anywhere.
            </p>
          </div>
          <div class="product-card">
            <span>👮‍♂️</span>
            <h3>Guard-Friendly Mode</h3>
            <p>
              Admin portal is streamlined for security guards to monitor scans
              without technical knowledge.
            </p>
          </div>
        </div>
      </section>

      <section className="how-to-use">
        <h2>Inside Dwarpal</h2>
        <div className="how-to-grid">
          <div className="step">
            <img src={LoginPage} alt="Login Page" />
            <h3>Login Page</h3>
            <p>
              The login screen offers a clean and intuitive UI where both Users
              and Admins authenticate using valid credentials. Role tabs ensure
              appropriate redirection, securing access to features based on
              authority level.
            </p>
          </div>
          <div className="step">
            <img src={HomePage} alt="User Home" />
            <h3>User Home</h3>
            <p>
              After login, users land on a personalized screen showing their
              profile. Here, they enter their outing purpose and initiate gate
              activity by scanning a dynamic admin QR code — ensuring traceable
              movement.
            </p>
          </div>
          <div className="step">
            <img src={ProfilePage} alt="User Profile" />
            <h3>User Profile</h3>
            <p>
              This section displays key details such as name, roll number,
              academic year, and parent contact. It functions as a digital
              student ID and confirms user identity during gate verification or
              record lookup.
            </p>
          </div>
          <div className="step">
            <img src={AdminTable} alt="Admin Dashboard" />
            <h3>Admin Dashboard</h3>
            <p>
              Admins get a comprehensive log of all entries and exits, including
              student details, QR scan timestamps, and visit purposes. This
              real-time table empowers them to oversee and verify gate activity
              instantly.
            </p>
          </div>
        </div>
      </section>
      <section className="feedback-showcase">
        <h2 className="feedback-title">Hear What Our Users Say</h2>
        <p className="feedback-subtitle">
          Real opinions. Real improvements. Real trust.
        </p>

        <div className="feedback-carousel">
          <div className="feedback-track">
            {[...Array(2)].flatMap(() =>
              [
                {
                  name: "Mr. Abhay Kumar Sharma",
                  quote:
                    "It’s simple and works exactly how you’d expect. Scan and go — no confusion.",
                },
                {
                  name: "Dr. Sandesh Tripathi",
                  quote:
                    "This is actually useful. It saves time and keeps a proper record without much effort.",
                },
                {
                  name: "Mr. Kaushal Bhatt",
                  quote:
                    "Very neat interface. I didn’t need any help to figure out what to do.",
                },
                {
                  name: "Mr. Manish Bhatt",
                  quote:
                    "Even the security guards were using it without any issues. That says a lot.",
                },
                {
                  name: "Anurag Singh Rawat",
                  quote:
                    "The scanning part is really smooth. It felt fast and easy every time I used it.",
                },
                {
                  name: "Aryan Raj",
                  quote:
                    "Honestly, I didn’t expect it to work this well. It’s super clean and fast.",
                },
              ].map((item, index) => (
                <div className="feedback-card" key={`${index}-${item.name}`}>
                  <div className="card-content">
                    <p className="quote">"{item.quote}"</p>
                    <p className="author">- {item.name}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="feedback-highlights">
          <div>
            <h4>💡 Instant Visibility</h4>
            <p>Scan & track updates in seconds.</p>
          </div>
          <div>
            <h4>🚀 Dynamic & Secure</h4>
            <p>Rotating QR prevents misuse or sharing.</p>
          </div>
          <div>
            <h4>📈 Growth Insights</h4>
            <p>Spot movement patterns and optimize safety.</p>
          </div>
        </div>
      </section>

      <footer className="new_footer_area bg_color">
        <div className="new_footer_top">
          <div className="footer_bg">
            <div className="footer_bg_one"></div>
            <div className="footer_bg_two"></div>
          </div>
        </div>
      </footer>
      <div className="footer_text_block">
        <p className="footer_made">
          Made with <span className="heart">❤️</span> by Dwarpal Team
        </p>
        <p className="footer_copy">
          © {new Date().getFullYear()} DWARPAL — All Rights Reserved
        </p>
      </div>
    </>
  );
}

export default LandingPage;
