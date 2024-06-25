import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';


// prop is food items basically
export default function Card(props) {

  let dispatch = useDispatchCart();
  let data = useCart();

  const priceRef = useRef();

  let options = props.options;
  // let foodItem = props.item;
  // store in key
  let priceOptions = Object.keys(options)

  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")
  


  async function handleAddToCart(){

    let food = []
    for (const item of data) {
      // if food id is already exist in add to card data/state id then break
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }




    if (food != []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
        return
      }
      
      else if (food.size != size) {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price:finalPrice, qty: qty, size: size })
        return
      }
      return
    }




    await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price:finalPrice, qty: qty, size: size })

  }






// price * qty  were price => size converted into int
  let finalPrice = qty * parseInt(options[size]); 
  
  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

  return (
    <div>
      <div>
        <div className="card mt-3" style={{ width: "18rem","maxHeight":"360px",padding:"12px" }}>
          <img src={props.foodItem.img} className="card-img-top" alt="..."
          style={{height:"120px", objectFit:"fill"}} />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            

            <div className="container w-100">
                {/* count */}
                <select className="m-2 h-100 bg-success rounded" onChange={(e)=>setQty(e.target.value)}>
                    {Array.from(Array(6),(e,i)=>{
                        return(
                            <option key={i+1} value={i+1}>{i+1}</option>
                        )
                    })}
                </select>

                {/* for sizes */}
                <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
                    {priceOptions.map((data) => {
                       return <option key={data} value={data}>{data}</option>
                   })}
               </select>

                {/* total price */}
                <div className="d-inline h-100 fs-5">
                  ₹{finalPrice}/-
                </div><hr />

                <button className={`btn btn-success justify-center ms-2 `} onClick={handleAddToCart}>Add to Cart</button>
                


            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


