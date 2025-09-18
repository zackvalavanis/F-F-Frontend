import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { type IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface Recipe {
  id: number;
  category: string;
  description: string;
  difficulty: number;
  ingredients: string;
  prep_time: number;
  rating: number;
  servings: number;
  tags: string;
  title: string;
  images?: string[];
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: 'auto',
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const api = import.meta.env.VITE_BACKEND;
  const navigate = useNavigate()

  const handleIndex = async () => {
    try {
      const res = await fetch(api);
      const data = await res.json();
      setRecipes(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleIndex();
  }, []);

  const handleExpandClick = (id: number) => {
    setExpanded(expanded === id ? null : id);
  };

  const handleShow = (id: number) => {
    console.log('you clicked it yo')
    navigate(`/recipes/${id}`)
  }

  return (
    <div style={{
      display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(345px, 1fr))'
    }}>
      {
        recipes.map((recipe) => (
          <Card key={recipe.id} sx={{ maxWidth: 345 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {recipe.title[0]}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={recipe.title}
              subheader={recipe.category}
            />
            {recipe.images && recipe.images.length > 0 && (
              <CardMedia
                component="img"
                height="194"
                image={recipe.images[0]} // show the first image
                alt={recipe.title}
              />
            )}
            <CardContent>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {recipe.description}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <ExpandMore
                expand={expanded === recipe.id}
                onClick={() => handleExpandClick(recipe.id)}
                aria-expanded={expanded === recipe.id}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded === recipe.id} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography sx={{ marginBottom: 2 }}>
                  Ingredients: {recipe.ingredients}
                </Typography>
                <Typography sx={{ marginBottom: 2 }}>
                  Difficulty: {recipe.difficulty} | Rating: {recipe.rating}
                </Typography>
                <Typography sx={{ marginBottom: 2 }}>
                  Prep: {recipe.prep_time} min | Cook: {recipe.prep_time} min
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }} onClick={handleShow}>Start Cookin'</Button>
                </div>
              </CardContent>
            </Collapse>
          </Card>
        ))
      }
    </div >
  );
}
