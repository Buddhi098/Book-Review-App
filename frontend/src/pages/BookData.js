import { Stack } from '@mui/material'
import React from 'react'
import BookReviews from '../components/BookReviews'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'
import Footer from '../components/Footer'

const BookData = () => {
    const {id} = useParams();
  return (
    <Stack sx={{ minHeight: "100vh", backgroundColor: "#f0f0f0" }}>
        <Header/>
        <BookReviews id={id}/>
        <Footer/>
    </Stack>
  )
}

export default BookData