
import React from 'react'
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';


const SidHome = () => {
  return (
    <Table responsive >

    <thead >
   
      <tr> 
        
        <th>Home</th>
    
      </tr>
    

    </thead>

    <tbody>
       
      <tr>
        
        <td><Link to="/Sekes">1번방</Link></td>
      
      </tr>
      
      <tr>
      
        <td><Link   eventKey="Sekes">2번방</Link></td>
        
      </tr>
      <tr>
    
        <td>집 왜감?</td>
        
      </tr>
      <tr>
      
        <td>집 왜감?</td>
        
      </tr>
      <tr>
      
        <td>집 왜감?</td>
   
      </tr>
      <tr>
      
        <td>집 왜감?</td>
        
      </tr>
      <tr>
      
        <td>집 왜감?</td>
      
      </tr>
      <tr>
      
        <td>집 왜감?</td>
     
      </tr>
    </tbody>
  </Table>

  

  )
}

export default SidHome