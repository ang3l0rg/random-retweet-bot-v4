import{useState,useEffect}from'react'
import './App.css';
const eth=window.ethereum
// import WhiteBox from './WhiteBox.js'

function Accounts(props) {
  const handleClick=()=>{
    props.props.toggleLogIn()
  }
  return(
    <div className='accounts-container'>
      <button className='button' onClick={handleClick}>Accounts</button>
    </div>
  );
}

function SignIn(props){
  const handleSignInClick=()=>{
    props.props.toggleLogIn()
  }
  const handleMetamaskConnectClick=()=>{
    const metamaskAccounts = eth.request({method:'eth_requestAccounts'})
    console.log(metamaskAccounts[0])
  }
  return(
    <div className='sign-in-container'>
      <h1>Random Retweet Bot V4</h1>
      <form>
        <input type='entry' placeholder='Username'></input>
        <input type='entry' placeholder='Password'></input>
      </form>
      <button onClick={handleMetamaskConnectClick}>Connect To Metamask</button>
      <button className='button' onClick={handleSignInClick}>Sign in</button>
    </div>
  );
}

function WhiteBox() {
  const[isLoggedIn,setIsLoggedIn]=useState(false)
  const toggleLogIn=()=>{
    setIsLoggedIn(!isLoggedIn)
  }
  return(
    <div className='whiteBox'>
      {!isLoggedIn?<SignIn props={{toggleLogIn}}/>:<Accounts props={{toggleLogIn}}/>}
    </div>
  );
}

function Footer() {
  return(
    <>
      <a className='footer__link' href='https://angelorg.online'><h1 className='footer__text'>by J.D. Diamari 🕊</h1></a>
    </>
  )
}

export default function App() {
  const[metamaskInstalled,setMetamaskInstalled]=useState(false)
  useEffect(()=>{
    if (typeof eth !== 'undefined' && eth.isMetaMask) {
      setMetamaskInstalled(true)
    }
  },[])

  return(
    <div className='main'>
      <div></div>
      <WhiteBox props={{metamaskInstalled}}/>
      <Footer/>
    </div>
  );
}
