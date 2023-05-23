import './App.css';
import { ethers } from 'ethers';

import { AddProduct } from './MyComponent/Addproduct';
import { Bid } from './MyComponent/bid';
import { Buy } from './MyComponent/buy';
import { Claim } from './MyComponent/claim'
import { GetProduct } from './MyComponent/getproduct';
import { MyToken } from './MyComponent/mytoken';
import Header from './MyComponent/Header';
import {
  BrowserRouter,
  Route,
  useParams,
  Routes,
  redirect,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader } from './MyComponent/loader';
import { Footer } from './MyComponent/Footer';

function App() {

  var account;
  var signer;
  const [btntext, setbtntext] = useState("Connect Metamask")
  const [productcontract, setproductcontract] = useState({});
  const [erc1155contract, seterc1155contract] = useState({});
  const [isloading,setloading]=useState(false);
  const[isconnected,setisconnected]=useState(false)

  
  const connect = async () => {
    if (window.ethereum) {
     
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length) {
       
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        
        account = accounts[0].toLowerCase();
        setisconnected(true);
        setbtntext(account)
        contract();
      } 
    
    }
    else {
      alert("You Do Not Have Metamask")
    }
    
  }

  const contract=()=>{
    setproductcontract(new ethers.Contract(process.env.REACT_APP_PRODUCT_ADDRESS, JSON.parse(process.env.REACT_APP_PRODUCT_ABI), signer))
    seterc1155contract(new ethers.Contract(process.env.REACT_APP_ERC1155_ADDRESS, JSON.parse(process.env.REACT_APP_ERC1155_ABI), signer))
      
  }
  window.ethereum.on('accountsChanged', async (accounts) => {
    
    connect()
    
	})

   const  Connected= async()=> {
		const accounts = await window.ethereum.request({ method: 'eth_accounts' });
		if (accounts.length) {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			signer = provider.getSigner();
			const account = accounts[0].toLowerCase();
      setisconnected(true);
      setbtntext(account)
      contract();
		} else {
			alert("You Are Not Connected")
		}
	}
  
  return (
    
    // {isloading && <Loader/>}
    <BrowserRouter>
      <Header connect={connect} btntext={btntext} />
      <Routes>
        <Route path="/" element={
          <>
            <AddProduct btntext={btntext} erc1155contract={erc1155contract} isconnected={isconnected} Connected={Connected}/>

          </>} />

        <Route path="/getproduct" element={
          <>
            <GetProduct btntext={btntext} setloading={setloading} Connected={Connected} isconnected={isconnected} productcontract={productcontract} erc1155address={process.env.REACT_APP_ERC1155_ADDRESS}/>
          </>} />

        <Route path="/myproduct" element={
          <>
            <MyToken btntext={btntext} isconnected={isconnected} Connected={Connected}/>
          </>} />

          <Route path="/bid" element={
      
            <Bid isconnected={isconnected} Connected={Connected}/>
        } />


        <Route path="/claimproduct" element={
          <>
            <Claim btntext={btntext} isconnected={isconnected} Connected={Connected} productcontract={productcontract} erc1155address={process.env.REACT_APP_ERC1155_ADDRESS}/>
          </>} />

         

      </Routes>
      <Footer />
    </BrowserRouter>
   
  );
}

export default App;
