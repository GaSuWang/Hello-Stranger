import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { Button } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';


export default function RecipeReviewCard({ id, title, image }) {
  return (
    <Card className="UserInput__Activity__Item__Card">
      <CardHeader
        title={title}
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
      />
      <CardContent>
      </CardContent>
      <div className='Guide__Third__Item__Card__Bottom'>
        <div>
          hihi
        </div>
        <div>
          <Button><ThumbUpOffAltIcon/></Button>
          <Button><ThumbDownOffAltIcon/></Button>
        </div>
      </div>
    </Card>
  );
}
