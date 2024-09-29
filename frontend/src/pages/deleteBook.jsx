import { useState,useEffect } from "react";
import {useParams,useNavigate} from 'react-router-dom';
import axios from 'axios';
function DeleteBook() {
    const { id } =useParams()
       const navigate = useNavigate();
    const [Id,setId]=useState({});
    const [currentStatus,setCurrentStatus]=useState('');
   const [Alerts,setAlerts]=useState(false);
   useEffect(()=>{
    const fetchBook = async () => {
        try {
            const response = await axios.get(`http://localhost:5555/books/${id}`);
            let val = response.data;
            console.log(response);
            setId(val);  // Updates state with the fetched data
        } catch (error) {
            console.log(error); // Handle errors here
        }
    };

    fetchBook(); // Call the async function

},[id])
   
   function handleSubmit(event) {
       event.preventDefault();
   
     
       axios.delete(`http://localhost:5555/books/${id}`)
           .then((response) => {
               if (response.status === 200) {
                setAlerts(true)
                   setCurrentStatus(response.data.message);
                   setTimeout(() => {
                       navigate('/'); // Use navigate to redirect to the homepage
                   }, 2000);
               }
           })
           .catch((error) => {
               console.log(error);
           });
   }
   
   
   
   
       return (  
           <div>  <h1 className="text-4xl font-bold text-center text-red-800 mb-10">Zaya Library</h1>
        
               
  
           <form onSubmit={handleSubmit}>
         { Alerts|| (<h2 className='text-4xl font-bold text-center text-green-800 mb-10'>{currentStatus}</h2>)}
           <h2 className='text-4xl font-bold text-center text-red-800 mb-10'>Are you sure you want to delete {Id.title}</h2>
        
               <button type="submit">Delete Book</button>
           </form>
       </div>
   
       );
   }

export default DeleteBook;