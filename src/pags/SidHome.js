
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios';


const SidHome = () => {
  const [data, setData] = useState();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.post("http://192.168.2.65:5000/readRoom",
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

  const testonclick = () => {
    data && data.map((e, idx) =>
      window.location.href = `/Sekes/${e.roomNum}/`
    )
  }

  return (
    <Table responsive >

      <thead >
        <tr>
          <th>Home</th>
        </tr>
      </thead>
      

      <tbody>
        {
          data && data.map((e, idx) =>

            <tr>
              <th  onClick={testonclick}>
              {e.roomName}
              </th>
            </tr>
          )
        }

      </tbody>
    </Table>



  )
}

export default SidHome