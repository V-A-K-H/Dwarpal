import { React, useState, useEffect } from "react";
import "./HomePage.css";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../config";
import Loader from "../MainComponents/Loader/Loader";
import Navbar from "../MainComponents/Navbar/Navbar";
import QrGenerator from "../AdminProfile/Admin/QrGenerator";
import { AdminRoute } from "../PrivateRoute";

const HomePage = () => {
  let whoUse = localStorage.getItem("Auth");
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [purpose, setPurpose] = useState();
  const [load, setLoad] = useState(false);

  const fetchData = async () => {
    try {
      setLoad(false);
      const result = await fetch(
        `${API}/StudentInfo/columns/name phonenum year access photolink`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("sessionUser"),
          },
        }
      );
      const response = await result.json();
      setUserData(response);
    } catch (err) {
      navigate("/signup");
    }
    setLoad(true);
  };

  useEffect(() => {
    whoUse = localStorage.getItem("Auth");
    setTimeout(() => {
      fetchData();
      setLoad(true);
    }, 1000);
  }, []);

  if (whoUse === "admin") return <AdminRoute element={<QrGenerator />} />;
  if (whoUse == null) return navigate("/signup");
  if (!load || !userData) return <Loader />;
  if (userData.access) navigate("/qrscanner");

  return (
    <div className="homebody">
      <Navbar />
      <main className="homepage-main">
        <section className="user-profile-card">
          <img src={userData.photolink} alt="User" className="user-photo" />
          <h2 className="username">{userData.name}</h2>
          <p className="useryear">Year: {userData.year}</p>
        </section>

        <section className="action-section">
          <input
            type="text"
            className="textbox"
            placeholder="Enter your purpose..."
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />
          <Link
            to="/qrscanner"
            state={{ purpose: purpose }}
            className={`buttonqr ${!purpose ? "disabled" : ""}`}
          >
            Open QR Scanner
          </Link>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-top">
          <div className="logo-block">
            <img
              src="https://res.cloudinary.com/dmlo55ukc/image/upload/v1717526893/Dwarpal_cnf4py.png"
              alt="Dwarpal Logo"
            />
            <img
              src="https://res.cloudinary.com/dmlo55ukc/image/upload/v1717526892/Dwarpal1_gp9zfr.png"
              alt="Dwarpal Logo 2"
            />
          </div>
          <p className="footer-description">
            Dwarpal uses QR code scanning to manage student entry and exit for
            enhanced campus security and transparency.
          </p>
        </div>

        <div className="footer-developers">
          <h3>Developers</h3>
          <div className="developer-avatars">
            <a
              href="https://www.linkedin.com/in/aryan-raj7"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://res.cloudinary.com/dmlo55ukc/image/upload/v1715939368/glmctlshecdfdqvh7dvt.jpg"
                alt="Aryan Raj"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/harshit-roy"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://res.cloudinary.com/dmlo55ukc/image/upload/v1717526094/photo_2024-05-31_14-15-20_2_gj4pnr.jpg"
                alt="Harshit Roy"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/kritik-srivastava"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://res.cloudinary.com/dmlo55ukc/image/upload/v1717526094/photo_2024-05-31_14-15-20_xx1rxb.jpg"
                alt="Kritik Srivastava"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/vivekbhatt3011"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://res.cloudinary.com/dmlo55ukc/image/upload/v1717526094/photo_2024-05-31_14-15-19_jumgha.jpg"
                alt="Vivek Bhatt"
              />
            </a>
          </div>
        </div>

        <div className="footer-contact">
          <p>
            <strong>Email:</strong> dwarpalsystem@gmail.com
          </p>
          <p>
            <strong>Location:</strong> B3 Top Floor, BIAS, Bhimtal
          </p>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2023 Dwarpal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
