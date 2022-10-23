
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
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
              <th>
              <Link key={idx} to={`/${e.roomNum}`}> {e.roomName}</Link>
              </th>

            </tr>

          )
        }

      </tbody>
    </Table>



  )
}

export default SidHome