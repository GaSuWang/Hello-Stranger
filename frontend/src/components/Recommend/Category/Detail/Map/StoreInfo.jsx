import Rating from '@mui/material/Rating';
import OpenClosed from '../OpenClosed';

export default function StoreInfo({ toggleDrawer }) {
  return (
    <div className="store-info" onClick={toggleDrawer(true)}>
      <div className="store-info__top">
        <span className="top__title">XX 만두가게</span>
      </div>
      <div className="store-info__scope">
        <span>2.5</span>
        <Rating
          name="half-rating-read"
          defaultValue={2.5}
          precision={0.5}
          size="small"
          readOnly
        />
        <OpenClosed />
      </div>
      <div className="store-info__address">대구광역시 중구 동인동</div>
    </div>
  );
}