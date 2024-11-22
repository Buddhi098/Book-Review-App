import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Rating from '@mui/material/Rating';
import bookImage from '../../assets/images/book.png';
import { Box } from '@mui/material';

export default function Book({name , author , rating , date}) {


  return (
    <Card sx={{ maxWidth:345, boxShadow: 3 }}>
      <CardActionArea>
        {/* Book Image */}
        <CardMedia
          component="img"
          height="140"
          image={bookImage}
          alt={name}
        />
        <CardContent>
          {/* Book Name */}
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>

          {/* Author Name */}
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 1 }}>
            <strong>Author:</strong> {author}
          </Typography>

          {/* Rating */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="body1" sx={{ mr: 1 }}>
              <strong>Rating:</strong>
            </Typography>
            <Rating value={rating} precision={0.5} readOnly />
          </Box>

        </CardContent>
      </CardActionArea>

      <CardActions>
        <Button size="small" color="secondary" variant="contained">
          See More
        </Button>
      </CardActions>
    </Card>
  );
}
