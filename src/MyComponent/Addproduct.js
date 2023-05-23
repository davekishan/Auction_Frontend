import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers';
import { Loader } from './loader';



export const AddProduct = ({ btntext, erc1155contract,isconnected,Connected}) => {
  const [file, setFile] = useState();
  const [image, setImage] = useState();
  const [choice, setChoice] = useState('0');
  const [isLoading, setIsLoading] = useState(false);

useEffect(()=>{
 Connected()
},[])
  const onsubmit = async (e) => {
   
    if (!isconnected) {
      e.preventDefault()
      alert("Please Connect Metamask")
    } else {
      setIsLoading(true)
      document.getElementsByTagName('body')[0].style.overflow = 'hidden';
      const addproduct = document.getElementById("addproduct");
      e.preventDefault();
      const tokenid = document.getElementById('tokenid').value;
      const amount = document.getElementById('amount').value;
      const price = document.getElementById('price').value;
      var timeline = document.getElementById('timeline').value;
      const name = document.getElementById('name').value;
      const description = document.getElementById('desc').value;
      document.getElementById('addproduct').reset()
      setImage(null)
      


      const imageData = new FormData();
      imageData.append('image', image);

      try {
        const imageResponse = await fetch('https://api-nft-auction.onrender.com/imageupload', {
          method: 'post',
          body: imageData,
        })
        const imageIPFS = await imageResponse.json()

        const imageIPFSLink = imageIPFS.response;
        console.log(imageIPFSLink)
        try {

          const value = ethers.utils.formatUnits(1000, "wei")
          alert("Listing Pirce Is : " + value + " Wei")

          var newtimeline = (parseInt(timeline) * 1000) + new Date().getTime();
          const mint = await erc1155contract.mintERC1155(tokenid, tokenid, amount, ethers.utils.parseEther(price.toString()), imageIPFSLink, choice, timeline, { value: value })
          await mint.wait(1);
          const response = fetch('https://api-nft-auction.onrender.com/product', {
            method: 'post',
            body: JSON.stringify({
              tokenid: tokenid,
              name: name,
              description: description,
              amount: amount,
              account: btntext,
              price: price,
              uri: imageIPFSLink,
              isToken: choice,
              timeline: newtimeline
            }),
            headers: {
              'Content-type': 'application/json'
            }
          })
            .then((response) => response.json())
            .then(async () => {
              setIsLoading(false)
              alert("Data Added")
              document.getElementsByTagName('body')[0].style.overflow = 'visible';
            })
        } catch (err) {
          setIsLoading(false)
          alert('product not added  :' + err.message)
          document.getElementsByTagName('body')[0].style.overflow = 'visible';

        }
      } catch (err) {
        setIsLoading(false)
        alert('error'+err.message)
        document.getElementsByTagName('body')[0].style.overflow = 'visible';

      }
    }
    //})

  }
  const changeChoice = (e) => {
    setChoice(e.target.value)
  }

  function handleChange(e) {

    setFile(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0])
  }

  return (
    <div className="add-product">

      <div className='container'>
        <div className="card">
          <div className="card2">

            <form className="form" method="post" id="addproduct">
              <p id="heading">Add Product</p>
              <div className="field">

                <input type="text" className="input-field" id="tokenid" placeholder="Token Id" />
              </div>
              <div className="field">

                <input type="text" className="input-field" id="name" placeholder="Name" />
              </div>
              <div className="field">

                <input type="text" className="input-field" id="desc" placeholder="Description" />
              </div>
              <div className="field">

                <input type="text" className="input-field" id="amount" placeholder="Amount" />
              </div>
              <div className="field">

                <input type="text" className="input-field" id="price" placeholder="Price" />
              </div>
              <div className="field">

                <input type="text" className="input-field" id="timeline" placeholder="timeline" />
              </div>
              <div className="field-1">
                <div className="radio-input">

                  <div className="selector">
                    <div className="choice">
                      <div>
                        <input type="radio" id="one" name="number-selector" onChange={changeChoice} defaultValue="0" defaultChecked className="choice-circle" />
                        <div className="ball"></div>

                      </div>
                      <label className="choice-name" htmlFor="one">Auction</label>
                    </div>
                    <div className="choice">
                      <div>
                        <input type="radio" id="two" name="number-selector" onChange={changeChoice} defaultValue="1" className="choice-circle" />
                        <div className="ball"></div>
                      </div>
                      <label className="choice-name" htmlFor='two'>Instant</label>
                    </div>

                  </div>
                </div>
              </div>


              <div className='field-1'>

                <input type="file" id="image" placeholder='Choose Product' onChange={handleChange} required accept="image/*"/>
                <img className='img-fluid' src={file} />
              </div>

              <div className="btn">
                <button className="button1" onClick={onsubmit}>Add Product</button>

              </div>

            </form>
          </div>
        </div>

        {isLoading &&
          <>
            <Loader />
          </>
        }
      </div>
    </div>
  )
}
