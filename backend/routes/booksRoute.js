import express from  "express"
import {Book}  from "../models/bookModel.js"
import cors from 'cors'
//  input it as the second aparamete in the router
const router =express.Router();



 
    
    //route to send books to the database ........................................
    router.post('/',cors({ origin: 'http://localhost:5173' }),async (request,response)=>{
    try{
    
    // check all required fields if not there return status
    if(!request.body.title||!request.body.author||!request.body.publishYear){
        return response.status(400).send('Send all required fields :title ,author, publishYear')
    }
    // the new book variable 
    
    const newBook={
        title:request.body.title,
        author: request.body.author,
        publishYear: request.body.publishYear,
    };
    // using the book model we made at bookModel we we routerly our payload vakues to it then create and push
    const book = await Book.create(newBook);
    return response.status(200).send({message : 'Created successfully!!!'});
    
        
    }
    catch(error){
    console.log(error)
    return response.status.send(500).send({message : error.message});
    
      }  
    })
    
    //route to   get all books from database........................................................
    router.get('/', cors({ origin: 'http://localhost:5173' }),async (request,response)=>{
    try{
    const books= await Book.find({});
    // we use empty araay up to selecta all 
    return response.status(200).json({
        count:books.length,
        data:books
    })
    }
    catch(error){
        return response.status(500),{message: error.message}
    }
    })
    
    //route to  get one book by id 
    router.get('/:id', cors({ origin: 'http://localhost:5173' }),async (request,response)=>{
        try{
            const {id} =request.params;
    
    
    
        const book= await Book.findById(id);
        // we use empty araay up to selecta all 
        return response.status(200).json(book)
        }
        catch(error){
            return response.status(500),{message: error.message}
        }
        })
    //route to  update the book
    
    router.put('/:id', cors({ origin: 'http://localhost:5173' }),async (request,response)=>{
        try{
            if(!request.body.title||!request.body.author||!request.body.publishYear){
                return response.status(400).send('Send all required fields :title ,author, publishYear')
            }
    
            const {id} =request.params;
    
    
    
        const result= await Book.findByIdAndUpdate(id,request.body);
        // we use empty array up to select all data values
       if(!result){
        return response.status(404).json({message:"Book not found!!!"})
       }
       else{
        return response.status(200).send({message : "Book updated successfully!!!"})
       }
        }
        catch(error){
            return response.status(500),{message: error.message}
        }
        })
    
    //route to  delete  the book
    router.delete('/:id', cors({ origin: 'http://localhost:5173' }),async (request,response)=>{
        try{
           
            const {id} =request.params;
    
    
    
        const result= await Book.findByIdAndDelete(id);
        // we use empty array up to select all data values
       if(!result){
        return response.status(404).json({message:"Book not found!!!"})
       }
       else{
        return response.status(200).send({message : "Book deleted successfully!!!"})
       }
        }
        catch(error){
            return response.status(500),{message: error.message}
        }
        })
    
     
    
    


     export default router;