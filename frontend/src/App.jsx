// Vido Sourch from yt: https://youtu.be/NxAwOjb_NlA?si=rHvv5ikCKUIVvqbJ

import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';
import axios from 'axios';

function App() {

  // If making custom react query:
  // const [products,error,loading]=customReactQuery('/api/products')

  const [products, setProducts] = useState([])
  const [error, setError]= useState(false)
  const [loading,setLoading] = useState (false)
  const [search,setSearch] = useState('')

  useEffect(()=>{

    // Here controller is basically cancels all the privious search request
    const controller = new AbortController()

    ;(async ()=>{
      try {
        setLoading(true)
        setError(false)
        const response = await axios.get('/api/products?search=' + search, {
          signal: controller.signal
        })
        console.log(response.data);
        setProducts(response.data);
        setLoading(false)
      } catch (error) {
        if(axios.isCancel(error)){
          console.log('Request canceled', error.message)
          return
        }
        setError(true)
        setLoading(false)
      }
    })()

    //cleanup method
    return ()=>{
      controller.abort();
    }

  },[search])

// Conditions handling

  // if (error){
  //   return <h1>Some error occured</h1>
  // }
  // if (loading){
  //   return <h1>Loading...</h1>
  // }

  return (
    <>
      <h1>Hello, goodies!</h1>

      <input type="text" placeholder='Search...' value={search} onChange={(e)=> setSearch(e.target.value)} />

      {/* We can also handle conditions like this: */}
       {error && <h1>Some error occured</h1>}
      {loading && <h1>Loading...</h1>} 

      <h2>Number of Products are: {products.length}</h2>

       {/* Listing all fetched products  */}
       <h1 className='heading'>Here's all the Product List</h1>
       <div className="container">
          {products.map((product, index) => (
            <div key={index} className="product">
              <h2>{product.name}</h2>
              <p>Price: {product.price}</p>
              </div>
              ))}
       </div>
    </>
  )
}

export default App

// Custom react query
/*
const customReactQuery = (urlPath) => {

  const [products, setProducts] = useState([])
  const [error, setError]= useState(false)
  const [loading,setLoading] = useState (false)

  useEffect(()=>{
    ;(async ()=>{
      try {
        setLoading(true)
        setError(false)
        const response = await axios.get(urlPath)
        console.log(response.data);
        setProducts(response.data);
        setLoading(false)
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    })()
  },[])
  return{
    products,
    error,
    loading
  }
}
  */