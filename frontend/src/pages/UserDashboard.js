import { Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import SearchFilters from '../components/SearchAndFilter'
import BookList from '../components/BookList'
import Footer from '../components/Footer'
import UserReviewList from '../components/UserReviewList'
import apiClient from '../api/apiClient'

const UserDashboard = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [rating, setRating] = useState('none');
  const [dateOrder, setDateOrder] = useState('asc');

  const [reviews, setReviews] = useState([]);

  const fetchData = async () => {
    try {

      const userID = localStorage.getItem('userID');
      console.log(userID);
      if (!userID) {
        throw new Error('User ID is not available in localStorage');
      }

      const response = await apiClient.get(`/user/${userID}`);
      console.log(response.data);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Stack sx={{ minHeight: "100vh", backgroundColor: "#f0f0f0" }}>
      <Header />
      <SearchFilters setSearchQuery={setSearchQuery} setRating={setRating} setDateOrder={setDateOrder} searchQuery={searchQuery} rating={rating} dateOrder={dateOrder} fetchData={fetchData}/>
      <UserReviewList searchQuery={searchQuery} rating={rating} dateOrder={dateOrder} reviews={reviews} fetchData={fetchData}/>
      <Footer />
    </Stack>
  )
}

export default UserDashboard