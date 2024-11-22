import { Stack } from '@mui/material'
import React, { useState } from 'react'
import Header from '../components/Header'
import SearchFilters from '../components/SearchAndFilter'
import BookList from '../components/BookList'
import Footer from '../components/Footer'

const Home = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [rating, setRating] = useState('none');
  const [dateOrder, setDateOrder] = useState('asc');

  return (
    <Stack sx={{ minHeight: "100vh", backgroundColor: "#f0f0f0" }}>
      <Header />
      <SearchFilters setSearchQuery={setSearchQuery} setRating={setRating} setDateOrder={setDateOrder} searchQuery={searchQuery} rating={rating} dateOrder={dateOrder}/>
      <BookList searchQuery={searchQuery} rating={rating} dateOrder={dateOrder}/>
      <Footer sx={{position:"fixed" , bottom:"0px"}}/>
    </Stack>
  )
}

export default Home