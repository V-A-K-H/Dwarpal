import {React, useState, useEffect} from 'react';
import './Admin.css';
import Loader from '../../MainComponents/Loader/Loader';
import {API} from '../../../config';
import {io} from 'socket.io-client';

import {ToastContainer, toast} from 'react-toastify';

const SOCKET_API = API.replace('/api', '');

const socket = io(SOCKET_API, {
  autoConnect: false,
});

const Admin = () => {
  const [load, setLoad] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const [year, setYear] = useState(1);
  const fetchStudentData = async () => {
    try {
      const result = await fetch(
        `${API}/AdminSignIn/auth/${localStorage.getItem('Auth')}`,
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('sessionUser'),
          },
        },
      );
      const response = await result.json();
      const StudentArray = [];
      response.map(elem => {
        StudentArray.push(elem);
      });
      setStudentData(
        StudentArray.sort((a, b) => {
          return b.access - a.access;
        }),
      );
      setLoad(false);
    } catch (err) {
      console.warn(err);
      setLoad(false);
    }
  };
  const handleDatabaseChange = arg => {
    if (arg) {
      const {name, access, year, photolink} = arg;
      const temp = access ? 'OUT' : 'IN';
      const resultStr = `${name} from ${year} year is ${temp}`;
      toast.info(resultStr);
      // alert(resultStr);
      fetchStudentData();
    }
  };

  // after the component renders the first time, this checks if there is any change in the database
  // with the help of socket it can see wheather the socket contains any message if it does, it alerts and reloads
  useEffect(() => {
    // fetch data every at every render
    fetchStudentData();
    socket.connect();

    socket.on('database-change', handleDatabaseChange);
    // Clean up the socket subscription when the component unmounts
    return () => {
      socket.off('database-change', handleDatabaseChange);
      socket.disconnect();
    };
  }, []);
  if (load)
    return (
      <>
        <Loader />
      </>
    );
  const TableRow = () => {
    if (studentData) {
      // return is necessary to run the code
      return studentData.map(elem => {
        // if (elem.year == year) { }
        const outingInfo =
          elem.outinginfo[Object.keys(elem.outinginfo).length - 1];

        // use new date to convert string into date object, not only Date()
        const Status = elem.access ? 'out' : 'In';
        let exitsession = 'AM';
        if (elem.year == year) {
          let exithours = new Date(outingInfo.exit).getHours();
          if (exithours > 12) {
            exithours -= 12;
            exitsession = 'PM';
          }
          if (exithours == 12 && exitsession == 'AM') {
            exitsession = 'PM';
          }
          if (exithours == 12 && exitsession == 'PM') {
            exitsession = 'AM';
          }
          if (exithours <= 9) {
            exithours = `0${exithours}`;
          }
          let exitmin = new Date(outingInfo.exit).getMinutes();
          if (exitmin <= 9) {
            exitmin = `0${exitmin}`;
          }
          let entrysession = 'AM';
          let entryhours = new Date(outingInfo.entry).getHours();
          if (entryhours > 12) {
            entryhours -= 12;
            entrysession = 'PM';
          }
          if (entryhours == 12 && entrysession == 'PM') {
            entrysession = 'AM';
          }
          if (entryhours == 12 && entrysession == 'AM') {
            entrysession = 'PM';
          }
          if (entryhours <= 9) {
            entryhours = `0${entryhours}`;
          }
          let entrymin = new Date(outingInfo.entry).getMinutes();
          if (entrymin <= 9) {
            entrymin = `0${entrymin}`;
          }
          return (
            <tr className="text-black">
              <td>
                <div className="d-flex align-items-center ">
                  <img
                    src={elem.photolink}
                    alt=""
                    style={{width: '58px', height: '58px'}}
                    className="rounded-circle"
                  />
                  <div className="ms-3">
                    <p className="fw-bold mb-1">{elem.name}</p>
                    <p className="text-muted mb-0">{elem.phonenum}</p>
                  </div>
                </div>
              </td>
              <td>
                <p className="fw-normal mb-1">{elem.year}</p>
                <p className="text-muted mb-0">{elem.branch}</p>
              </td>

              {/* <td>{Date(outingInfo.date)}</td>
              <td>{`${Date(outingInfo.entry).getHours()}:${Date(outingInfo.entry).getMinutes()}`}</td>
              <td>{`${Date(outingInfo.exit).getHours()}:${Date(outingInfo.exit).getMinutes()}`}</td> */}
              <td>{`${new Date(outingInfo.date).getDate()}-${
                new Date(outingInfo.date).getMonth() + 1
              }-${new Date(outingInfo.date).getFullYear()}`}</td>
              <td>{outingInfo.purpose}</td>

              <td>{`${exithours}:${exitmin} ${exitsession}`}</td>
              <td>
                {outingInfo.entry
                  ? `${entryhours}:${entrymin} ${entrysession}`
                  : `---`}
              </td>

              <td>
                <span
                  className={
                    elem.access
                      ? 'badge badge-late rounded-pill d-inline'
                      : 'badge badge-In rounded-pill d-inline'
                  }>
                  {Status}
                </span>
              </td>
            </tr>
          );
        }
      });
    }
  };
  return (
    <>
      <ToastContainer style={{fontSize: '14px', fontWeight: 'bolder'}} />
      <div className="adminBody bg-black text-black">
        <div style={{marginLeft: '3%', marginBottom: '2%', paddingTop: '2%'}}>
          <button
            className="button button"
            onClick={() => {
              setYear(1);
              setYear(2);
              setYear(3);
              setYear(4);
            }}>
            All
          </button>
          <button
            className="button button"
            onClick={() => {
              setYear(1);
            }}>
            1st Year
          </button>
          <button
            className="button button"
            onClick={() => {
              setYear(2);
            }}>
            2nd Year
          </button>
          <button
            className="button button"
            onClick={() => {
              setYear(3);
            }}>
            3rd Year
          </button>
          <button
            className="button button"
            onClick={() => {
              setYear(4);
            }}>
            4th Year
          </button>
        </div>
        <main>
          <table className="table align-middle mb-0 bg-white">
            <thead className="bg-light">
              <tr>
                <th>Name</th>
                <th>Year</th>
                <th>Date</th>
                <th>Purpose</th>
                <th>Out</th>
                <th>In</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <TableRow />
            </tbody>
          </table>
        </main>
      </div>
    </>
  );
};
export default Admin;
