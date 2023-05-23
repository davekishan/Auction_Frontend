import React, { useState,useEffect } from 'react'

export const MyToken = ({btntext,isconnected,isConnected,Connected}) => {

  const [data,setData]=useState([])

  useEffect(() => {
    Connected()
    getdata()
    
  },[]);

  const getdata = (e) => {

      console.log("this is get data"+btntext)
      fetch("https://api-nft-auction.onrender.com/gettoken/"+btntext)
      .then(response => response.json())
      .then(data => setData(data))
    
  }

  return (
    <div className='add-product'>
      <div className='container'>
        <div className='row mx-5' style={{ rowGap: "65px" }}>
          {console.log(data?.product?.length)}
          {data?.product?.length && (
            data.product.map((user, key) => {

              return (

                <div className="col-xl-4 col-lg-6 col-md-12" key={key}>
                  <div className="nft">
                    <div className='main'>
                      <img className='tokenImage' src={user.uri} alt="NFT" />
                      <h2 className='tokenName'>{user.name} #{user.tokenid}</h2>
                      <p className='description'>{user.description}</p>
                      <div className='tokenInfo'>
                        <div className="price">
                            <p>Buy: {user.price} ETH</p>
                          </div>
                        <div className="duration">
                        <p>Created:{user.date.substring(0, 10)}</p>
                        </div>
                      </div>
                      <hr />
                      <div className='creator'>
                        <div className='wrapper'>
                          <img src="https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80" alt="Creator" />
                        </div>
                        <p className='account'><ins>Creator :</ins><br />{user?.creator?.substring(0, 7) + '...' + (user?.creator?.substring(user?.creator?.length - 5))}</p>
                      </div>
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
