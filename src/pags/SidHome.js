
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import NoData from '../img/NoData.png';


const SidHome = () => {
  const [data, setData] = useState();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.post("http://192.168.2.82:5000/readRoom",
          {
            id: sessionStorage.getItem("id")
          });
        console.log(res.data)
        setData(res.data);
      } catch (error) {
        console.log(error)
      }
    })();

  }, [])

  const testonclick = idx => {
    console.log(idx);
    window.location.href = '/Sekes/' + idx;

  }

  const main = () => {
    window.location.href = "/"
  }

  return (
    <div>
      <Table responsive >

        <thead >

          <tr>
            <th onClick={() => { window.location.href = "http://localhost:3000" }}>Home</th>
          </tr>
        </thead>


        <tbody>
          {
            data && data.map((e, idx) =>
              <tr onClick={() => testonclick(e.roomNum)}>
                <th> {e.roomName}</th>
              </tr>
            )
          }

        </tbody>
      </Table>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }} >
         {
          sessionStorage.getItem("id") === null ? <div className="nodatabox"><img className="image" src={NoData} /></div> : (data == 0 ?
            <div className="nodatabox"><img className="image" src={NoData} /></div> : null
          )
        }
      </div>
    </div>



  )
}

export default SidHome