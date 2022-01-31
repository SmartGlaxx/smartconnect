import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import './signup.css'
import { Button, Grid} from '@material-ui/core'
import { useState, useEffect } from 'react'
import {FaExclamationCircle} from 'react-icons/fa'
import Axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
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

const Signup =()=>{
    const {loggedIn, loading, setCurrentUser, currentUser} = UseAppContext()
    const [error, setError] = useState({status: false, msg :''})
    const [formValues, setFormValues] = useState({
        firstname : "",
        lastname : "",
        username : '',
        email : '',
        password1 : "",
        password2 : "",
    })
    const navigate = useNavigate()

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


    const setValues =(e)=>{
        let name = e.target.name
        let value = e.target.value
        if(name=='username'){
            value = value.replace(/\s+/g, '')
        }
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
        //setLoading(true)
        e.preventDefault()
        const { firstname, lastname, username, email, password1, password2} = formValues
        if(password2 !== password1){
            handleError(true, "Password Mismatch")
            setTimeout(()=>{
                setError({status : false, msg :''})
            }, 4000)
        }else{
            const options = {
                url: "http://smart-job-search.herokuapp.com/api/v1/auth/register",
                method : "POST",
                headers : {
                    "Accept" : "application/json",
                    "Content-Type" : "application/json;cjarset=UTF-8"
                },
                data:{
                    firstname : firstname, 
                    lastname : lastname,
                    username : username,
                    email : email,
                    password : password1
                }
            }

            setTimeout(()=>{
              setError({status : true, msg :"Please check your network connection"})
            },10000)
            setTimeout(()=>{
              setError({status : false, msg :""})
            },16000)
            const result = await Axios(options)
            const {response, singupdData} = result.data
            if(response === 'Success'){
                setCurrentUser(singupdData)
                return window.location.href = '/'
                
            }else if(response === 'Fail'){
                const {message} = result.data
                handleError(true, message)
                setTimeout(()=>{
                    setError({status : false, msg :''})
                }, 4000)
            }
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
    <Grid className='signup' container>
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
        <Grid className='signup-left' item xs={12} sm={6}>
            <div className='title'>Smart Connect</div>
        </Grid>
        <Grid className='signup-right' item xs={12} sm={6} >
            
            {
                error.status && <div className={classes.root}>
                <Alert severity="error">{error.msg}</Alert>
              </div>
            }
            <div>
                 <h3 className='page-title'>Register</h3>
                 <input className='input' value ={formValues.firstname} onKeyPress={enterClicked}  onChange={setValues} type='text' name='firstname' placeholder='Firstname'/>
                 <input className='input' value ={formValues.lastname} onKeyPress={enterClicked}  onChange={setValues} type='text' name='lastname' placeholder='Lastname'/>
                <input className='input' value ={formValues.username} onKeyPress={enterClicked}  onChange={setValues} type='text' name='username' placeholder='Username'/>
                <input className='input' value ={formValues.email} onKeyPress={enterClicked}  onChange={setValues} type='email' name='email' placeholder='E-Mail'/>
                <input className='input' value ={formValues.password1} onKeyPress={enterClicked}  onChange={setValues} type='password' name='password1' placeholder='Password'/>
                <input className='input' value ={formValues.password2} onKeyPress={enterClicked}  onChange={setValues} type='password' name='password2' placeholder='Comfirm Password'/>
                {/* <Button className='btn'  onClick={submit}>Sign up</Button> */}
              <div className='auth-btns'>
                <span className='auth-signup-btn2' onClick={submit}>Sign-up</span>
                <Link to ='/login' className='auth-signup-btn1'>Login</Link>
              </div>
            </div>
        </Grid>
    </Grid>
)}

export default Signup