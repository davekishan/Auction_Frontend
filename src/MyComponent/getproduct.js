
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bid } from './bid';
import { ethers } from 'ethers';
import { Loader } from './loader';


export const GetProduct = ({ btntext, setloader, erc1155address, productcontract,isconnected,Connected }) => {
  const [data, setData] = useState([]);
  const [isopen, setisopen] = useState(false);
  const [biddata, setbiddata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  var tokendbib, tokenid, amount, price;
  const time= new Date().getTime();
  const onbid = () => {
    console.log(tokendbib)
    if (tokendbib) {
      setIsLoading(true)
      document.getElementsByTagName('body')[0].style.overflow = 'hidden';
      fetch("http://localhost:3000/bidproduct/" + tokendbib)
        .then(response => response.json())
        .then(data => setbiddata(data))
      setIsLoading(false)
      document.getElementsByTagName('body')[0].style.overflow = 'visible';
      

    }
    setisopen(!isopen);

  }


  const buynow = async (e) => {
    
    if (!isconnected) {
      alert("Please Connect Metamask")
    } else {
      try {
        setIsLoading(true)
        document.getElementsByTagName('body')[0].style.overflow = 'hidden';
        const ethvalue = ethers.utils.parseEther((price * amount).toString())
        console.log(ethvalue.toString());
        const buy = await productcontract.buy_now(tokenid, amount, erc1155address, { value: ethvalue });
        await buy.wait(1)
        const response = fetch('http://localhost:3000/buying', {
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
            setIsLoading(false)
            document.getElementsByTagName('body')[0].style.overflow = 'visible';
            alert("buy complete")
            window.location.reload(true)

          })
      } catch (err) {
        setIsLoading(false)
        document.getElementsByTagName('body')[0].style.overflow = 'visible';
        alert('buying is not completed' + err.message)
        window.location.reload(true)

      }
    }
  }

  useEffect(() => {
    Connected()
    getdata()
    
  }, []);

  const getdata = () => {

    fetch("http://localhost:3000/getproduct")
      .then(response => response.json())
      .then(data => setData(data))

  }

  return (
    <div className='add-product'>
      <div className='container'>
        <div className='row mx-5' style={{ rowGap: "65px" }}>

          {data?.product?.length && (
            data.product.map((user, key) => {
              console.log(user)
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
                           
                            <p> <i className="fas fa-gavel"> </i> Last Bid: <br/> {user.lastbiding} ETH</p>
                          </div>
                        }
                        <div className="duration">
                          
                          <p>Created: <br/>{user.date.substring(0, 10)}</p>
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
                    {user.saletype === '0' ?
                      <div className='bottom-button '>
                        {/* <Link className='button2' to={`/bid/${user.tokenid}`}>Bid</Link> */}
                        <button className='button2' onClick={() => { tokendbib = user.tokenid; onbid() }}>Bid</button>
                      </div>
                      :
                      <div className='bottom-button '>
                        <button className='button2' onClick={() => { tokenid = user.tokenid; amount = user.amount; price = user.price; buynow() }}>Buy</button>
                      </div>
                    }
                  </div>
                </div>
              )
            })
          )
          }

          {
            isopen && <Bid handleClose={onbid} biddata={biddata} btntext={btntext} isconnected={isconnected} Connected={Connected} productcontract={productcontract} />
          }


        </div>
      </div>
      {isLoading &&
        <>
          <Loader />
        </>
      }
    </div>
  )
}
