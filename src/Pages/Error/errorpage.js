import './errorpage.css'
import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid} from '@material-ui/core'
import { useState, useEffect } from 'react'
import {FaExclamationCircle} from 'react-icons/fa'
import Axios from 'axios'
import {Link} from 'react-router-dom'
import LoadingIcons from 'react-loading-icons'

const ErrorPage =()=>{
    return <Grid className='errorpage' container>
    <Grid className='errorpage-left' item xs={12} sm={6} >
        <div className='title'>Smart Connect</div>
    </Grid>
    <Grid className='errorpage-right' item xs={12} sm={6} >
        <h1 className='errorpage-title'>404</h1>
        <h1 className='errorpage-subtitle'>Page Not Found</h1>
        <div className='errorpage-options'>
            <Link to='/' className='errorpage-link'>
              <Button style={{color:"var(--color3)", border: "1px solid var(--color3)", fontSize:"0.8rem",  padding: "var(--btn-padding)"}}>
                Return to Home Page
              </Button>
            </Link>
            <Link to='/login' className='errorpage-link'>
              <Button style={{color:"var(--color3)", border: "1px solid var(--color3)", fontSize:"0.8rem", padding: "var(--btn-padding)"}}>
                Login
              </Button>
            </Link>
        </div>
    </Grid>
</Grid>
}

export default ErrorPage