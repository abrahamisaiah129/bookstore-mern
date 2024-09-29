// import React from 'react';
import {useEffect,useState} from 'react';
import {useParams,useNavigate} from 'react-router-dom';
import axios from "axios";

function ShowBook() {
     const [getId,setId]=useState({});
     const { id }=useParams();
     const navigate = useNavigate();



     useEffect(()=>{
        
     const fetchBook= async ()=>{
  await axios.get(`http://localhost:5555/books/${id}`).then((response)=>{
            let val =response.data;
            console.log(response);
            setId(val);
            // console.log(response);
            console.log(id);
            // console.log(hi)
          
        })
        .catch((error)=>{
            console.log(error);
         
        })
       }
       fetchBook();
      }  ,[id])


// back button
        const handleBack = () => {
            navigate(-1);
        };




    return (  
        <>
        <div className="min-h-screen bg-gray-100 py-10">
        <button onClick={handleBack} className="mb-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                Back
            </button>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center text-red-800 mb-10">Zaya Library</h1>
    
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="px-6 py-4">
                        <h2 className="   text-xl font-semibold text-gray-900">{`Title:${getId.title}`}</h2>
                        <p className="text-gray-700 mt-2">{`Author:${getId.author}`}</p>
                        <p className="text-gray-700">{`Published on:${getId.publishYear}`}</p>
                    </div>
                </div>
    
              
            </div>
        </div>
    </div>
    </>
    );
}

export default ShowBook;