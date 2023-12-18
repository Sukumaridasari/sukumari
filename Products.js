import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
  const[data,setData]=useState([]);
  const[filter,setFilter]=useState(data);
  const[loading,setLoading]=useState(false);
  useEffect(() =>{
    const getProducts =async ()=>{
      setLoading(true);
      const response=await fetch('https://fakestoreapi.com/products');
      setData (await response.clone().json());
      setFilter(await response.json());
      setLoading(false);
      console.log(data);
    } 
    getProducts();
  },[]);
   const Loading =() =>{
  return(
    <>
    <h1>Loading...</h1>
    </>    
   )};
 const filterProducts =(cat)=>{
  const updatedList=data.filter((x)=> x.category ===cat);
  setFilter(updatedList);
 }
  const ShowProducts =()=>{
    return(
      <>
      <div className="button text-center my-5">
      <button className="btn btn-outline-danger me-2"
       onClick={()=>setFilter(data)}>All</button>

      <button className="btn btn-outline-danger me-2"
      onClick={()=>filterProducts("men's clothing")}>Men's</button>

      <button className="btn btn-outline-danger me-2"
      onClick={()=>filterProducts("women's clothing")}>Women</button>

      <button className="btn btn-outline-danger me-2"
      onClick={()=>filterProducts("jewelery")}>Jewelery</button>

      <button className="btn btn-outline-danger me-2"
      onClick={()=>filterProducts("electronics")}>Electronics</button>
      </div>
      {filter.map((product)=>{
       return(
        <>
      <div className="col-md-3">
      <div className="card h-100">
      <img src={product.image} alt={product.tilte} height="300px"/>
      <div className="card-body">
      <div className="card-title">{product.title}</div>
      <p className="card-text text-danger fw- bolder">{product.price}</p>
      <Link to={`/products/${product.id}`} className="btn btn-outline-danger">Buy Now</Link>
      </div>
      </div>
    </div>
      </>
       )
      })}
      </>
    )
    }
      return(
        <div className="container py-3 my-3">
        <div className="row">
        <div className="col-sm-12">
        <h2 className='display-4 text-center'>Latest Products</h2>
        </div>
        <div className="row">
        {loading?<Loading/>:<ShowProducts/>}
        </div>
        </div>
        </div>
    )
      }

export default Products