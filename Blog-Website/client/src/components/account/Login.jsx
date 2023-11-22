import React, { useState, useEffect, useContext } from 'react';
import { TextField, Box, Button, Typography, styled ,Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';


const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image = styled('img')({
    width: 100,
    display: 'flex',
    margin: 'auto',
    padding: '50px 0 0'
});

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

const loginInitialValues = {
    username: '',
    password: ''
};

const signupInitialValues = {
    name: '',
    username: '',
    password: '',
};

const sleep=(ms)=>{
    return new Promise(resolve => setTimeout(resolve,ms));
}

const Login = ({ isUserAuthenticated }) => {
    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, showError] = useState('');
    const [account, toggleAccount] = useState('login');
    
    const navigate = useNavigate();
    const { setAccount } = useContext(DataContext);

    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';
    
    useEffect(() => {
        showError('');
    }, [login])

    const sucr=async()=>{
        toast.success('Registration successful', { duration: 2000 });
        await sleep(2000);
        console.log("sleep")
        toggleSignup();

    }
    const failr=(x)=>{
        console.log("inside failr")
        toast.error(x);
        console.log("after toast")
    }
    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }
    
    
    const loginUser = async () => {
      //console.log("Heree")
      //console.log("Hiiiiiinside")
      if(login.username.length===0){
          toast.error("Name should not be empty")
      }else if(login.password.length===0){
          toast.error("Password should not be empty")
      }else{
          let response = await API.userLogin(login);
          try{
              if (response.isSuccess) {
                  console.log(response)
                  showError('');
                  sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
                  sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
                  setAccount({ name: response.data.name, username: response.data.username });
                  
                  isUserAuthenticated(true)
                  setLogin(loginInitialValues);
                  navigate('/');
          }else if(response.isFailure){
              console.log(response.isFailure)
              console.log(response.msg)
              failr('Something went wrong');
              console.log(response.status)
          }
          
      }catch(error){
          //let error=await 
          // console.log("hereeee")
          // console.log(error)
          failr('Something went wrong pls try again later')
      }
      
      
  }}
    const signupUser = async () => {
      if(signup.name.length===0){
          toast.error("Name should not be empty")
      }else if(signup.username.length===0){
          toast.error("Username should not be empty")
      }else if(signup.password.length===0){
          toast.error("Password should not be empty")
      }else{
          try{
              let response = await API.userSignup(signup);
              if (response.isSuccess) {
                  console.log(response.data)
                  console.log(response.isSuccess)
                  showError('');
                  setSignup(signupInitialValues);
                  console.log("beforee")
                  sucr()
                  console.log("afteree")
                  
              } else if(response.isFailure){
  
                  console.log(response.isFailure)
                  console.log("error")
                  showError('Something went wrong! please try again later');
                  failr('User already exists');
                  
              }}
          catch{
              failr('Something went wrong! please try again later');
              showError('Something went wrong! please try again later');
              
          }
      }
      
      
  }

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }

    return (
        
        <Component>
            
          
            <Box>
                <Image src={imageURL} alt="blog" />
                {
                    account === 'login' ?
                        <Wrapper>
                            <TextField variant="standard" value={login.username} onChange={(e) => onValueChange(e)} name='username' label='Enter Username' />
                            <TextField variant="standard" type="password" value={login.password} onChange={(e) => onValueChange(e)} name='password' label='Enter Password'  />
                            
                            
                            
                            <LoginButton variant="contained" onClick={()=>loginUser()} >Login</LoginButton>
                            <Toaster/>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <SignupButton onClick={() => toggleSignup()} style={{ marginBottom: 50 }}>Create an account</SignupButton>
                        </Wrapper> :
                        <Wrapper>
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='name' label='Enter Name' />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='username' label='Enter Username' />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='password' label='Enter Password' type='password'/>

                            <SignupButton onClick={() => {signupUser()}} >Signup</SignupButton>
                            <Toaster/>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <LoginButton variant="contained" onClick={() => toggleSignup()}>Already have an account</LoginButton>
                        </Wrapper>
                }
            </Box>
            
        </Component>
       
    )
}

export default Login;