import React from 'react'

import Hero from '../components/Hero'
import Features from '../components/Feature'
import Footer from '../components/Footer'
import { Box } from '@mui/material'
import Navbar from '../components/Navbar'

const HomePage = () => {
  return (
    <>
      <Navbar />
 <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
        <Box sx={{ flexGrow: 1 }}>
          <Hero />
          <Features />
        </Box>
 
      </Box>
      <Footer></Footer>
    </>
  )
}

export default HomePage