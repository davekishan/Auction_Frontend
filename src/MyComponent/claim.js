import React, { useState,useEffect } from 'react'
import { ethers } from 'ethers';

export const Claim = ({btntext,productcontract,erc1155address,isconnected,Connected}) => {
  var tokenid,amount,lastbiding;
  const[data,setData]=useState([])
  useEffect(() => {
    Connected()
    getdata()
    
  }, [btntext]);

  const getdata = () => {
    if(!isconnected)
    {
      alert("Please Connect Wallet")
    }else
    {
      fetch("http://localhost:3000/claim/"+btntext)
        .then(response => response.json())
        .then(data => setData(data))
    }

  }

  const claimbid=async()=>{
      
      try {
        const ethvalue=ethers.utils.parseEther((lastbiding * amount).toString())
        const buy = await productcontract.Claimbid(tokenid, amount, erc1155address,{value:ethvalue})
        await buy.wait(1);
        const response = fetch('http://localhost:3000/claimbid', {
          method: 'post',
          body: JSON.stringify({
            tokenid: tokenid,
            account: btntext
          }),
          headers: {
            'Content-type': 'application/json'
          }
        })
          .then((response) => response.json())
          .then(async () => {

            alert("Claim complete")
            window.location.reload(true)
          })
      } catch (err) {
        alert('Claim is not completed'+err.message)
        console.log(err)
      }
    
  }


  return (
   
      <div className='add-product'>
      <div className='container'>
        <div className='row mx-5' style={{ rowGap: "65px" }}>
          {console.log(data?.product?.length)}
          {data?.product?.length && (
            data.product.map((user, key) => {
              { console.log(user) }

              return (

                <div className="col-xl-4 col-lg-6 col-md-12" key={key}>
                  <div className="nft">
                    <div className='main'>
                      <img className='tokenImage' src={user.uri} alt="NFT" />
                      <h2 className='tokenName'>{user.name} #{user.tokenid}</h2>
                      <p className='description'>{user.description}</p>
                      <div className='tokenInfo'>
                      {user.saletype === '1' ? 
                        <div className="price">
                          <ins>◘</ins>
                          <p>{user.price} ETH</p>
                        </div>
                        :
                        <div className="price">
                          <i class="fas fa-gavel"> </i>&nbsp; Last Bid:&nbsp; 
                          <p>{user.lastbiding} ETH</p>
                        </div>
                        }
                        <div className="duration">
                          <ins>◷</ins>
                          <p>11 days left</p>
                        </div>
                      </div>
                      <hr />
                      <div className='creator'>
                        <div className='wrapper'>
                          <img src="https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80" alt="Creator" />
                        </div>
                        <p className='account'><ins>Creation of</ins><br />{user.account.substring(0, 7) + '...' + (user.account.substring(user.account.length - 5))}</p>
                      </div>
                    </div>
                    <div className='bottom-button '>
                        
                        <button className='button2' onClick={()=>{tokenid=user.tokenid; amount=user.amount;lastbiding=user.lastbiding; claimbid()}}>Claim</button>
                      </div>
                  </div>
                </div>
              )
            })
          )}

        </div>
      </div>
    </div>
    
  )
}
