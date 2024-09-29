import { useState,useEffect } from "react";
import {useParams,useNavigate} from 'react-router-dom';
import axios from 'axios';
function EditBook() {
 const { id } =useParams()
    const navigate = useNavigate();
 const [values,setValues]=useState({title:"",author:"",publishYear:""});
 const [currentStatus,setCurrentStatus]=useState('');

useEffect(
    ()=>{
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://localhost:5555/books/${id}`);
                let val = response.data;
                console.log(response);
                setValues(val);  // Updates state with the fetched data
            } catch (error) {
                console.log(error); // Handle errors here
            }
        };
    
        fetchBook(); // Call the async function
        }
,[id])

function handleSubmit(event) {
    event.preventDefault();

    const readyValues = {
        title: values.title,
        author: values.author,
        publishYear: Number(values.publishYear)
    };

    axios.put(`http://localhost:5555/books/${id}`, readyValues)
        .then((response) => {
            if (response.status === 200) {
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

function handleInputChange(e){
    // handel change of input value
let inputVal = e.target.value;
let input = e.target.name;

// Spread the current state to avoid mutation
let initialVal = { ...values };
initialVal[input] = inputVal;

// Set the new state
setValues(initialVal);

console.log(inputVal);
console.log(initialVal);
console.log(input);
console.log(values);
// Explanation:
// State mutation: When you assign initialVal = values, both initialVal and values point to the same object. Modifying initialVal directly modifies values, which is against React's immutability principles.
// Fix: The spread operator { ...values } creates a shallow copy of values, ensuring that the original state is not mutated.
// This way, React will correctly detect the state change and re-render the component accordingly.
  

}

    return (  
        <div>  <h1 className="text-4xl font-bold text-center text-red-800 mb-10">Zaya Library</h1>
      
            
<h2 className='text-4xl font-bold text-center text-green-800 mb-10'>{currentStatus}</h2>
        <form onSubmit={handleSubmit}>
            
            <input 
                type="text"
                name="title"
                value={values.title}
                onChange={handleInputChange}
                placeholder="Book Title"
                required
            />
            <input 
                type="text"
                name="author"
                value={values.author}
                onChange={handleInputChange}
                placeholder="Author"
                required
            />
            <input 
                type='test'
                name="publishYear"
                value={values.publishYear}
                onChange={handleInputChange}
                placeholder="Publish Year"
                required  
            />
            <button type="submit">Update Book</button>
        </form>
    </div>

    );
}

export default EditBook;