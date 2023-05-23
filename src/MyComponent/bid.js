import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers';
import { Loader } from './loader';


export const Bid = ({ handleClose,biddata,btntext,productcontract,isconnected,Connected}) => {
  const [isLoading, setIsLoading] = useState(false);
  var tokenid;
  var bidvalue;

  // useEffect(()=>{
  //   Connected()
  // },[])
console.log(isconnected)
 const bid=async(e)=>{
  if (!isconnected) {
    
    alert("Please Connect Metamask")
    handleClose()
  } else {
  setIsLoading(true)
  document.getElementsByTagName('body')[0].style.overflow = 'hidden';
      bidvalue=document.getElementById('bidvalue').value;
      
    try {
      const mint = await productcontract.placebid(tokenid, ethers.utils.parseEther(bidvalue.toString()))
      await mint.wait(1);
      const response = fetch('http://localhost:3000/biding', {
        method: 'post',
        body: JSON.stringify({
          tokenid: tokenid,
          bidvalue: bidvalue,
          bidaccount: btntext
        }),
        headers: {
          'Content-type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then(async () => {
          setIsLoading(false)
          document.getElementsByTagName('body')[0].style.overflow = 'visible';
          alert("biding complete")
          window.location.reload(true)

        })
    } catch (err) {
      setIsLoading(false)
      document.getElementsByTagName('body')[0].style.overflow = 'visible';
      alert('Biding is not completed'+err.message)
      console.log(err)
    }
  
    handleClose()
  }
 }


 
  return (
    <div>
      
    <div className='popup-box'>
      <div className="box-inner">
        <span className="close-icon" onClick={handleClose}>x</span>
        <div className="card mb-3" style={{maxWidth: "540px",overflow:'hidden'}}>
          <div className="row g-0">
            <div className="col-md-4">
              <img src={biddata?.product?.uri} className="img-fluid rounded-start" style={{height:"100%"}} alt="..."/>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h4 className="card-title">{biddata?.product?.name} {biddata?.product?.tokenid}</h4>
                <h6>{biddata?.product?.account.substring(0, 7) + '...' + (biddata?.product?.account.substring(biddata?.product?.account.length - 5))}</h6>
                <p className="card-text">{biddata?.product?.description}</p>
                <p className="card-text"><small className="text-body-secondary">Last Bid: {biddata?.product?.lastbiding}  {biddata?.product?.bidaccount}</small></p>
                <input type='number' className='input-bid' id="bidvalue" placeholder='Enter Bid Value'></input>
                <button className='btn-success' style={{background:"cyan", color:"black"}} onClick={()=>{tokenid=biddata.product.tokenid; bid()}}> Bid</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {isLoading &&<Loader />}
    </div>
  )
}
