import {React, useEffect, useState, useContext} from 'react';
import './QrGenerator.css';
import ReactDOM from 'react-dom';
import QRCode from 'qrcode';
import {EncryptData} from '../../../EncryptDevice';
const QrGenerator = () => {
  const [timerId, setTimerId] = useState(null);
  useEffect(() => {
    return () => {
      clearInterval(timerId);
    };
  }, [timerId]);
  const [show, setshow] = useState(true);
  const generateQR = async () => {
    if (timerId) clearInterval(timerId);
    const abc = setInterval(() => {
      let time = `${new Date()}$$${EncryptData('D01')}`;
      QRCode.toCanvas(
        document.getElementById('canvas'),
        `${time}`,
        function (error) {
          if (error) console.error(error);
        },
      );
      //media query
      function mobileview(x) {
        if (x.matches) {
          document.getElementById('canvas').style.height = '41%';
          document.getElementById('canvas').style.width = '85%';
          document.getElementById('canvas').style.marginTop = '2%';
          document.getElementById('canvas').style.borderRadius = '10PX';
        } else {
          document.getElementById('canvas').style.height = '79%';
          document.getElementById('canvas').style.width = '41%';
          document.getElementById('canvas').style.marginTop = '2%';
        }
      }
      var x = window.matchMedia('(max-width: 700px)');
      mobileview(x);
    }, 5000);
    setTimerId(abc);
    let time = `${new Date()}$$${EncryptData('D01')}`;
    QRCode.toCanvas(
      document.getElementById('canvas'),
      `${time}`,
      function (error) {
        if (error) console.error(error);
      },
    );
    //media query
    function mobileview(x) {
      if (x.matches) {
        document.getElementById('canvas').style.height = '41%';
        document.getElementById('canvas').style.width = '85%';
        document.getElementById('canvas').style.marginTop = '2%';
        document.getElementById('canvas').style.borderRadius = '15px';
      } else {
        document.getElementById('canvas').style.height = '79%';
        document.getElementById('canvas').style.width = '41%';
        document.getElementById('canvas').style.marginTop = '2%';
      }
    }
    var x = window.matchMedia('(max-width: 700px)');
    mobileview(x);
  };

  return (
    <div className="qr">
      <canvas style={{display: show ? 'none' : 'block'}} id="canvas"></canvas>
      <script src="bundle.js"></script>
      <button
        className="openqr"
        style={{display: show ? 'block' : 'none'}}
        onClick={() => {
          setshow(false);
          return generateQR();
        }}>
        open qrcode
      </button>
    </div>
  );
};

export default QrGenerator;
