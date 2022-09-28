import 'styles/Recommend/RecommendPage.scss';
import { useEffect, useMemo } from 'react';
import { useRecommendContext } from 'components/Recommend/Context/RecommendContext';
import Container from 'components/common/Container';
import CloseRecommend from 'components/Recommend/CloseRecommend';
import PrevNext from 'components/Recommend/PrevNext';
import Music from 'components/Recommend/Music';
import Title from 'components/Recommend/Title';
import Food from 'components/Recommend/Food';
import Activity from 'components/Recommend/Activity';
import {
  setCurrentMusic,
  setMusicList,
} from 'components/Recommend/Context/musicReducer';
import { setFoodList } from 'components/Recommend/Context/foodReducer';
import { setActivityList } from 'components/Recommend/Context/activityReducer';

const titles = [
  ['어떤 음악을', '듣고 싶으신가요?'],
  ['어떤 음식을', '먹고 싶으신가요?'],
  ['어떤 활동을', '하고 싶으신가요?'],
];

const playlist = [
  {
    musicID: 1,
    musicName: '가장 보통의 존재',
    musicArtist: '언니네 이발관',
    musicCategory: '',
    musicImgUrl:
      'https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/066/039/122/66039122_1395715494760_1_600x600.JPG/dims/resize/Q_80,0',
  },
  {
    musicID: 2,
    musicName: '정말 사랑했을까',
    musicArtist: '브라운아이드소울',
    musicCategory: '',
    musicImgUrl:
      'https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/015/027/251/15027251_1388739020483_1_600x600.JPG/dims/resize/Q_80,0',
  },
  {
    musicID: 3,
    musicName: 'starlight',
    musicArtist: 'Muse',
    musicCategory: '',
    musicImgUrl:
      'https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/040/585/421/40585421_1393312393347_1_600x600.JPG/dims/resize/Q_80,0',
  },
  {
    musicID: 4,
    musicName: '신경쓰여',
    musicArtist: '비비',
    musicCategory: '',
    musicImgUrl:
      'https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/081/352/887/81352887_1580457272856_1_600x600.JPG/dims/resize/Q_80,0',
  },
  {
    musicID: 5,
    musicName: '좋은 밤 좋은 꿈',
    musicArtist: '너드커넥션',
    musicCategory: '',
    musicImgUrl:
      'https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/081/392/508/81392508_1584692219778_1_600x600.JPG/dims/resize/Q_80,0',
  },
  {
    musicID: 6,
    musicName: 'Think About`chu',
    musicArtist: '아소토유니온',
    musicCategory: '',
    musicImgUrl:
      'https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/015/027/829/15027829_1310533115577_1_600x600.JPG/dims/resize/Q_80,0',
  },
  {
    musicID: 7,
    musicName: '오랜만에',
    musicArtist: '김현철',
    musicCategory: '',
    musicImgUrl:
      'https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/015/032/851/15032851_1310028555858_1_600x600.JPG/dims/resize/Q_80,0',
  },
  {
    musicID: 8,
    musicName: 'Afraid',
    musicArtist: 'DAY6',
    musicCategory: '',
    musicImgUrl:
      'https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/081/438/259/81438259_1589175437111_1_600x600.JPG/dims/resize/Q_80,0',
  },
];

const food = [
  {
    foodCategory: '만두',
    store: [],
  },
  {
    foodCategory: '떡볶이',
    store: [],
  },
  {
    foodCategory: '우동',
    store: [],
  },
  {
    foodCategory: '라면',
    store: [],
  },
  {
    foodCategory: '삼겹살',
    store: [],
  },
];

const activity = [
  {
    activityCategory: '테니스',
    store: [],
  },
  {
    activityCategory: '영화',
    store: [],
  },
  {
    activityCategory: '클라이밍',
    store: [],
  },
  {
    activityCategory: '피시방',
    store: [],
  },
  {
    activityCategory: '테마카페',
    store: [],
  },
];

function RecommendPage() {
  const { state, dispatch } = useRecommendContext();
  const index = state.indexReducer.index;
  const close = useMemo(() => <CloseRecommend />, []);

  // music
  useEffect(() => {
    dispatch(setMusicList(playlist));
    dispatch(setCurrentMusic(playlist[0]));
  }, [playlist]);

  // food
  useEffect(() => {
    dispatch(setFoodList(food));
  }, [food]);

  // activity
  useEffect(() => {
    dispatch(setActivityList(activity));
  }, [activity]);

  return (
    <Container>
      {close}
      <div className="recommend-content">
        <Title title={titles[index]} />
        {index === 0 ? <Music /> : index === 1 ? <Food /> : <Activity />}
        {/* <Food /> */}
      </div>
      <PrevNext index={index} />
    </Container>
  );
}

export default RecommendPage;
