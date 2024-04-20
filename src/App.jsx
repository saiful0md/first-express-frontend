
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setusers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/user')
      .then(res => res.json())
      .then(data => setusers(data))
  }, [])

  const handleUserAdd = e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = {name, email};
    console.log(user);
  fetch('http://localhost:3000/user', {
    method: 'POST',
    headers:{
      "content-type": 'application/json'
    },
    body: JSON.stringify(user)
  })
  .then(res => res.json())
  .then(data =>{
    console.log(data);
    const newUser = [...users, data]
    console.log(newUser);
    setusers(newUser);
    form.reset()
  })
  }



  return (
    <>
      <h1>users management system</h1>
      <h2>Number of users: {users.length}</h2>

      <form onSubmit={handleUserAdd}>
        <input type="text" name="name" placeholder="name..." className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none dark:bg-gray-100 dark:text-gray-800 focus:dark:bg-gray-50 focus:dark:border-violet-600" />
        <br />
        <input type="email" name="email" placeholder="email..." className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none dark:bg-gray-100 my-10 dark:text-gray-800 focus:dark:bg-gray-50 focus:dark:border-violet-600" />
        <br />
        <input type="submit" value="add user" />
      </form>
      <div className='grid grid-cols-3 gap-4 my-20'>
        {
          users.map(users => <div
            className='border p-3 bg-gray-300 rounded-lg shadow-md flex flex-col items-center'
            key={users.id}
          >
            <img
              src={users.image} alt=""
              className='w-72 py-8 px-4 shadow-md  rounded-lg '
            />
            <div className='  text-start p-4'>
              <p> <span className='font-bold text-lg'>Name:</span> {users.name}</p>
              <p> <span className='font-bold text-lg'>Price:</span> {users.price}</p>
              <p> <span className='font-bold text-lg'>Description:</span> {users.description}</p>
            </div>
          </div>)
        }
      </div>
    </>
  )
}

export default App
