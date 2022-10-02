import React from 'react'
import { Link } from 'react-router-dom'

 const Header = () => {
  
  return (
    <div className="ui menu">
      
        <div className="ui container center" style={{display:"flex",justifyContent:"space-between"}} >
        <Link to="/add" className="item">Add Contact</Link>
            <h2 className='header'>Contact Manager</h2>
            <Link to="/" className="item">Home</Link>
          
        </div>
    </div>
  )
}
export default Header;
