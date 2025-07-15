import { React, useState, useEffect } from "react";
import "./Profile.css";

import { API } from "../../../config";
import Loader from "../../MainComponents/Loader/Loader";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [load, setLoad] = useState(false);
  const fetchData = async () => {
    try {
      const result = await fetch(
        `${API}/StudentInfo/columns/name rollnum fathername fatherphonenum branch year photolink`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("sessionUser"),
          },
        }
      );
      const response = await result.json();
      setUserData(response);
    } catch (err) {
      console.log(err);
      window.alert("Signed Out");
    }
  };
  useEffect(() => {
    setTimeout(() => {
      fetchData();
      setLoad(true);
    }, 1125);
  }, []);
  if (!load || !userData)
    return (
      <>
        <Loader />
      </>
    );

  // if (userData) {
  //   ({ name, rollnum, fatherphonenum, userData.branch, year } = userData)
  //
  // }
  return (
    <div className="profile-body">
      <div className="containerpro">
        <div className="photopro">
          <img
            src={userData.photolink || "photo"}
            alt="Profile"
            className="profile-pic"
          />
        </div>

        <div className="informationpro">
          <div className="profileinfo">
            <h4>Name</h4>
            <input
              type="text"
              className="textbox"
              placeholder={userData.name}
              readOnly
            />
          </div>
          <div className="profileinfo">
            <h4>Roll Number</h4>
            <input
              type="text"
              className="textbox"
              placeholder={userData.rollnum}
              readOnly
            />
          </div>
          <div className="profileinfo">
            <h4>Father's Name</h4>
            <input
              type="text"
              className="textbox"
              placeholder={userData.fathername}
              readOnly
            />
          </div>
          <div className="profileinfo">
            <h4>Father's Mobile</h4>
            <input
              type="text"
              className="textbox"
              placeholder={userData.fatherphonenum}
              readOnly
            />
          </div>
          <div className="profileinfo">
            <h4>Branch</h4>
            <input
              type="text"
              className="textbox"
              placeholder={userData.branch}
              readOnly
            />
          </div>
          <div className="profileinfo">
            <h4>Year</h4>
            <input
              type="text"
              className="textbox"
              placeholder={userData.year}
              readOnly
            />
          </div>
          <div className="profileinfo">
            <h4>Alternate Phone</h4>
            <input type="text" className="textbox" placeholder="N/A" readOnly />
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-logo">
          <img
            src="https://res.cloudinary.com/dmlo55ukc/image/upload/v1717526893/Dwarpal_cnf4py.png"
            alt="Dwarpal"
          />
          <img
            src="https://res.cloudinary.com/dmlo55ukc/image/upload/v1717526892/Dwarpal1_gp9zfr.png"
            alt="Dwarpal"
          />
        </div>
        <p className="footer-description">
          Dwarpal uses QR code scanning to securely log student entries and
          exits, enabling smart campus monitoring and accountability.
        </p>

        <div className="footer-social-icon">
          <span>Developers</span>
          <div className="dev-avatars">
            <a href="https://www.linkedin.com/in/aryan-raj7">
              <img
                src="https://res.cloudinary.com/dmlo55ukc/image/upload/v1715939368/glmctlshecdfdqvh7dvt.jpg"
                alt="Aryan"
              />
            </a>
            <a href="https://www.linkedin.com/in/harshit-roy">
              <img
                src="https://res.cloudinary.com/dmlo55ukc/image/upload/v1717526094/photo_2024-05-31_14-15-20_2_gj4pnr.jpg"
                alt="Harshit"
              />
            </a>
            <a href="https://www.linkedin.com/in/kritik-srivastava">
              <img
                src="https://res.cloudinary.com/dmlo55ukc/image/upload/v1717526094/photo_2024-05-31_14-15-20_xx1rxb.jpg"
                alt="Kritik"
              />
            </a>
            <a href="https://www.linkedin.com/in/vivekbhatt3011">
              <img
                src="https://res.cloudinary.com/dmlo55ukc/image/upload/v1717526094/photo_2024-05-31_14-15-19_jumgha.jpg"
                alt="Vivek"
              />
            </a>
          </div>
        </div>

        <div className="footer-note">© 2023 Dwarpal. All Rights Reserved.</div>
      </footer>
    </div>
  );
};
export default Profile;
