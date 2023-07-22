import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(0);
  useEffect(() => {
    Axios.get('http://localhost:8080/get-phone').then(res => {
      setPhonebook(res.data.data.phoneNumbers)
    })
  },[])
  
  useEffect(() => {
    // Fetch data from the server and populate the phonebook state
    Axios.get('http://localhost:8080/phonebook')
      .then((response) => {
        setPhonebook(response.data);
      })
      .catch((error) => {
        console.error('Error fetching phonebook data:', error);
      });
  }, []); // The empty dependency array ensures that the effect runs only once, on component mount.

  const addNewNumber = () => {
    Axios.post('http://localhost:8080/add-phone', { name, phone })
      .then((response) => {
        // Update the phonebook state with the newly added phone
        setPhonebook([...phonebook, { name, phone }]);
        setName('');
        setPhone(0);
      })
      .catch((error) => {
        console.error('Error adding new number:', error);
      });
  };
  
  //update
  const [newPhone, setNewPhone] = useState(0)
 
  const updatePhone = (id) =>{
    Axios.put('http://localhost:8080/update-phone',{id, newPhone})
  }
  //show
  const [phonebook, setPhonebook] = useState([])

 
  //delete
  
 
  const deletePhone = (id) => {
    Axios.delete(`http://localhost:8080/delete-phone/${id}`)
  }

  return (
    <div>
    <div className="container">
      <label htmlFor="">Name: </label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <br />
      <br />
      <label htmlFor="">Phone: </label>
      <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <br />
      <br />
      <button onClick={addNewNumber}>Add New Number</button>

    
      
     </div>
    
   
   <div className="container1">
      {
        phonebook.map((val,key) => {
          return <div key={key} className="phone" >
            <h1>{val.name}</h1>
            <h1>{val.phone}</h1>
            <input type="number" placeholder='update Phone...' onChange={(e) => {
              setNewPhone(e.target.value)
            }}/>
            <button className="update-btn"  onClick={() => {updatePhone(val._id)}}>Update</button>
            <button  className='delete-btn'onClick={() =>{deletePhone(val._id)}}>Delete</button>
          </div>
        })
      }

    </div>      
   </div>
  );
}

export default App;
