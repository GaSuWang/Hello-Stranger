import { useRecommendContext } from '../Context/RecommendContext';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import marker from 'assets/images/marker.png';
import marker_my from 'assets/images/marker-my.png';
import Menu from './Menu';

export default function ResultMap() {
  const currentPos = JSON.parse(localStorage.getItem('current'));
  const { state } = useRecommendContext();
  const foodStoreList = state.foodReducer.list.map((item) => item.store);
  const activityStoreList = state.activityReducer.list.map(
    (item) => item.store
  );

  return (
    <>
      <div className="recommend-result-title">
        <div>이런 하루는 어떠세요?</div>
      </div>
      <Menu />
      <Map className="recommend-result-map" center={currentPos} level={3}>
        <MapMarker
          position={currentPos}
          image={{ src: marker_my, size: { width: 35, height: 35 } }}
        />
        {foodStoreList.map((list) =>
          list.map((store) => (
            <MapMarker
              position={{ lat: store.latitude, lng: store.longitude }}
              image={{ src: marker, size: { width: 40, height: 40 } }}
            />
          ))
        )}
        {activityStoreList.map((list) =>
          list.map((store) => (
            <MapMarker
              position={{ lat: store.latitude, lng: store.longitude }}
              image={{ src: marker, size: { width: 40, height: 40 } }}
            />
          ))
        )}
      </Map>
    </>
  );
}