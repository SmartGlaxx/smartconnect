import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import './login.css'
import { Button, Grid} from '@material-ui/core'
import { useState, useEffect } from 'react'
import {FaExclamationCircle} from 'react-icons/fa'
import Axios from 'axios'
import {Link} from 'react-router-dom'
import { UseAppContext } from '../../../Contexts/app-context'
import LoadingIcons from 'react-loading-icons'
import Particles from "react-tsparticles";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '20rem',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
      position:"absolute",
      top:"30%",
      left : "50%",
      transform : "translate(-50%)"
    },
  }));
  

const Login =()=>{
    const {loading, setCurrentUser, currentUser, setLoggedIn} = UseAppContext()
    const [error, setError] = useState({status: false, msg :''})
    const [formValues, setFormValues] = useState({
        emailOrUsername : '',
        password : ""
    })

    //Snackbar Alert start
    const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  
  const handleError = (status, message) => {
    setOpen(true);
    setError({status : status, msg : message})
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  //Snackbar Alert ends


    const setLoginValues =(value, loginData)=>{
        setCurrentUser(loginData)
        setLoggedIn(value)
        // setLoading(false)
    
    }
    const setValues =(e)=>{
        const name = e.target.name
        const value = e.target.value
        setFormValues(prev => {
            return{...prev, [name] : value}
        })
    }
 
    // Enter key to submit
    const enterClicked =(e)=>{
        if(e.charCode === 13){
            submit(e)
          }
    }
    const submit = async(e)=>{
         e.preventDefault()
        
        const {emailOrUsername, password} = formValues
        if(!emailOrUsername || !password){
            setError({status : true, msg : "Pleae enter E-mail or Username and Password"})
            setTimeout(()=>{
                setError({status : false, msg :''})
            }, 4000)
        }
            const options = {
                url: "http://smart-job-search.herokuapp.com/api/v1/auth/login",
                method : "POST",
                headers : {
                    "Accept" : "application/json",
                    "Content-Type" : "application/json;cjarset=UTF-8"
                },
                data:{
                    emailOrUsername : emailOrUsername,
                    password : password
                }
            }
           
            setTimeout(()=>{
              setError({status : true, msg :"Please check your network connection"})
            },10000)
            setTimeout(()=>{
              setError({status : false, msg :""})
            },16000)
            const result = await Axios(options)
            
           
            const requestResponse = result.data.response
            if(requestResponse === 'Success'){
                const {loginData} = result.data
                setLoginValues(true, loginData)
                return window.location.href = '/'
            }else if(requestResponse === 'Fail'){
                const {message} = result.data
                handleError(true, message)
                setTimeout(()=>{
                    setError({status : false, msg :''})
                }, 4000)
            }
    }

   

//scroll to top of page
useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

    if(loading){
        return <div style={{width: "100%",height : "100vh", 
        display: 'grid', placeItems: "center"}}>
           <LoadingIcons.Puff       stroke="#555" strokeOpacity={.9} />
       </div>
    }
    
    const particlesInit = (main) => {
      console.log(main);
  
      // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    };
  
    const particlesLoaded = (container) => {
      console.log(container);
    };
    return (
    <Grid className='login' container>
      <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "#243eb3"
          },
          position: "50% 50%",
          repeat: "no-repeat",
          size: "cover"
        },
        fullScreen: {
          zIndex: -1
        },
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push"
            },
            onDiv: {
              selectors: "#repulse-div",
              mode: "repulse"
            },
            onHover: {
              enable: true,
              mode: "repulse",
              parallax: {
                force: 60
              }
            }
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.8,
              size: 40
            },
            grab: {
              distance: 400
            },
            slow: {
              factor: 1,
              radius: 0
            }
          }
        },
        particles: {
          color: {
            value: "#ffffff"
          },
          links: {
            color: {
              value: "#ffffff"
            },
            distance: 150,
            enable: true,
            opacity: 0.4,
            shadow: {
              color: {
                value: "lime"
              }
            }
          },
          move: {
            attract: {
              rotate: {
                x: 600,
                y: 1200
              }
            },
            enable: true,
            outModes: {
              bottom: "out",
              left: "out",
              right: "out",
              top: "out"
            }
          },
          number: {
            density: {
              enable: true
            },
            value: 80
          },
          opacity: {
            value: {
              min: 0.1,
              max: 0.5
            },
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.1
            }
          },
          shape: {
            options: {
              character: [
                {
                  fill: true,
                  font: "Font Awesome 5 Brands",
                  style: "",
                  value: [
                    ""
                  ],
                  weight: "400"
                },
                {
                  fill: true,
                  font: "Font Awesome 5 Free",
                  style: "",
                  value: [
                    ""
                  ],
                  weight: "900"
                }
              ],
              char: [
                {
                  fill: true,
                  font: "Font Awesome 5 Brands",
                  style: "",
                  value: [
                    ""
                  ],
                  weight: "400"
                },
                {
                  fill: true,
                  font: "Font Awesome 5 Free",
                  style: "",
                  value: [
                    ""
                  ],
                  weight: "900"
                }
              ],
              polygon: {
                sides: 5
              },
              star: {
                sides: 5
              },
              image: {
                height: 100,
                replaceColor: true,
                src: "https://particles.js.org/images/github.svg",
                width: 100
              },
              images: {
                height: 100,
                replaceColor: true,
                src: "https://particles.js.org/images/github.svg",
                width: 100
              }
            },
            type: "char"
          },
          size: {
            value: 16,
            animation: {
              speed: 10,
              minimumValue: 10
            }
          },
          stroke: {
            width: 1,
            color: {
              value: "#ffffff",
              animation: {
                h: {
                  count: 0,
                  enable: false,
                  offset: 0,
                  speed: 1,
                  sync: true
                },
                s: {
                  count: 0,
                  enable: false,
                  offset: 0,
                  speed: 1,
                  sync: true
                },
                l: {
                  count: 0,
                  enable: false,
                  offset: 0,
                  speed: 1,
                  sync: true
                }
              }
            }
          }
        }
      }}
    />

        <Grid className='login-left' item xs={12} sm={6} >
            <div className='title'>Smart Connect</div>
        </Grid>
        <Grid className='login-right' item xs={12} sm={6} >
            
            {
                error.status && <div className={classes.root}>
                <Alert severity="error">{error.msg}</Alert>
              </div>
                
            }
            <div>
                 <h3 className='page-title'>Welcome Back</h3>
                <input className='input' value ={formValues.emailOrUsername} onKeyPress={enterClicked} onChange={setValues} 
                 type='text' name='emailOrUsername' placeholder='E-mail/Username' required/>
                <input className='input' value ={formValues.password} onKeyPress={enterClicked} onChange={setValues} 
                type='password' name='password' placeholder='Password' required/>
              <div className='auth-btns'>
                <span className='auth-login-btn2' onClick={submit}>Login</span>
                <Link to ='/signup' className='auth-login-btn1'>Sign-up</Link>
              </div>
            </div>
        </Grid>
    </Grid>
)}

export default Login







