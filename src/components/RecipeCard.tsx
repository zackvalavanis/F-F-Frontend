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
import { useState } from 'react';
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
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

interface RecipeReviewCardProps {
  recipe: Recipe;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: 'auto',
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({ recipe }: RecipeReviewCardProps) {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const handleExpandClick = () => setExpanded(!expanded);
  const handleShow = () => navigate(`/recipes/${recipe.id}`, { state: recipe });

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: 300,
        height: expanded ? 'auto' : 400,  // base height for all cards
        borderRadius: 2,
        boxShadow: 3,
        transition: 'all 0.3s ease',
        '&:hover': { transform: 'scale(1.03)', boxShadow: 6 },
      }}
    >
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
          height={180}
          image={recipe.images[0]}
          alt={recipe.title}
          sx={{ objectFit: 'cover' }}
        />
      )}

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {recipe.description}
        </Typography>
      </CardContent>

      <CardActions disableSpacing sx={{ justifyContent: 'space-between' }}>
        <div>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </div>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ pt: 0 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Created By: {recipe.user ? recipe.user.name : 'Unknown'}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Ingredients: {recipe.ingredients}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Difficulty: {recipe.difficulty} | Rating: {recipe.rating}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Prep: {recipe.prep_time} min | Cook: {recipe.prep_time} min
          </Typography>
          <Button fullWidth variant="contained" color="primary" onClick={handleShow}>
            Start Cookin'
          </Button>
        </CardContent>
      </Collapse>
    </Card>
  );
}
