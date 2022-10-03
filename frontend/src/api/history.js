import { getApiInstance } from 'api';

const api = getApiInstance();

export function getUserHistory() {
    return api.get('/review')
    .then((res)=>{
        console.log('다시보기 리스트 불러오기', res.data.contents)
        return res.data.contents
    })
    .catch((err)=>{
        console.error(err)
    })
}

export function getUserDetail(reviewId) {
    return api.get(`/detail/${reviewId}`)
    .then((res)=>{
        console.log('다시보기 세부 일정 불러오기', res.data)
        return res.data
    })
    .catch((err)=>{
        console.error(err)
    });
}

export function getUserActivity(activityId){
    api.get(`/detail/activity/${activityId}`)
    .then((res)=> {
        console.log('활동 상세 정보',res.data)
    })
    .catch((err)=>{
        console.error(err)
    })
}
export function getUserFood(foodId){
    api.get(`/detail/food/${foodId}`)
    .then((res)=> {
        console.log('음식 상세 정보',res.data)
    })
    .catch((err)=>{
        console.error(err)
    })
}

export function rateRecommendation({reviewId, activityCatergory, activityLike, foodCategory, foodLike, musicId, musicLike}){
    console.log('api rateRecommendation', reviewId, activityCatergory, activityLike, foodCategory, foodLike, musicId, musicLike)
    api.post(`detail/${reviewId}/rating`,
        {
        "activity": {
            "category": activityCatergory,
            "choiceYN": activityLike
        },
        "food": {
            "category": foodCategory,
            "choiceYN": foodLike
        },
        "music": {
            "choiceYN": musicLike,
            "id": musicId
        },
        }
    )
    .then((res)=> {
        console.log('평가 제대로 됨',res, reviewId, activityCatergory, activityLike, foodCategory, foodLike, musicId, musicLike)
    })
    .catch((err)=>{
        console.error('평가 제대로 안됨',err, reviewId, activityCatergory, activityLike, foodCategory, foodLike, musicId, musicLike)
    })
}
