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
import { Button, Tooltip } from '@mui/material';
import { LikeModal } from './LikeModal';
// import { TextField } from '@mui/material'
import { Box } from '@mui/material';

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
  average_rating: number;
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
  const [modalShowing, setModalShowing] = useState(false)
  const [rating, setRating] = useState<number | null>(null)

  const handleExpandClick = () => setExpanded(!expanded);
  const handleShow = () => navigate(`/recipes/${recipe.id}`, { state: recipe });

  const handleCopyUrl = (id: number) => {

    const url = `${window.location.origin}/recipes/${id}`

    navigator.clipboard.writeText(url).then(() => {
      alert('Recipe address has been copied to your clipboard.')
    })
      .catch((err) => {
        console.error('Failed to copy: ', err)
        alert('Failed to copy recipe URL.')
      })
  }


  const showLikeModal = () => {
    setModalShowing(true)
    console.log('modalShowing')
  }

  return (
    <div>
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
            <IconButton onClick={showLikeModal} aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <Tooltip title="Copy to clipboard" arrow>
              <IconButton onClick={() => handleCopyUrl(recipe.id)} aria-label="share">
                <ShareIcon />
              </IconButton>
            </Tooltip>
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
              Difficulty: {recipe.difficulty} | Rating: {recipe.average_rating}
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
      <LikeModal show={modalShowing} onClose={() => setModalShowing(false)}>
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', color: 'black' }}>
          <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>Rate the Dish</h1>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
              <Button
                key={num}
                variant={rating === num ? 'contained' : 'outlined'}
                color={rating === num ? 'primary' : 'inherit'}
                onClick={() => setRating(num)}
                sx={{
                  minWidth: 70,
                  height: 70,
                  fontWeight: 600,
                  borderRadius: '8px',
                  transition: '0.2s',
                }}
              >
                {num}
              </Button>
            ))}
          </Box>
          <Button style={{ marginTop: '20px' }} variant='contained'>
            Submit Rating
          </Button>
        </div>
      </LikeModal>
    </div>
  );
}
