import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import "./ranking_page.css";
// import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PhotoRankingTodayAndYesterdayModel } from "../../models/PhotoRankingTodayAndYesterdayModel";
import { FacemashService } from "../../services/FacemashService";
import CircularProgress from '@mui/material/CircularProgress';
import { PhotoModel } from "../../models/PhotoModel";

export default function RankingPage() {

  // const navigate = useNavigate();

  // สร้าง object ของ class FacemashService
  const services = new FacemashService();

  // rank ของรูปวันนี้
  const [photosRankingToday, setPhotosRankingToday] = useState<PhotoModel[]>([]);
  // rank เมื่อวานที่รูปภาพ ข้อมูลปัจจุบันนี้เคยอยู่
  const [yesterdayRankOfphotosRankingToday, setYesterdayRankOfphotosRankingToday] = useState<number[]>([]);

  // rank ของรูปเมื่อวาน
  const [photosRankingYesterday, setPhotosRankingYesterday] = useState<PhotoModel[]>([]);


  // ไปหน้าแสดงข้อมูลของรูปภาพนี้
  function navigateToViewThePhoto() {
    // navigate('/viewThePhoto');
  }


  //=====================================================================================
  useEffect(() => {
    const callAPI = async () => {
      const data : PhotoRankingTodayAndYesterdayModel = await services.rankingPhotosTodayAndYesterday();
      setPhotosRankingToday(data.ranking_photos_today);
      setYesterdayRankOfphotosRankingToday(data.yesterdayRank_of_photoRankToday);
      setPhotosRankingYesterday(data.ranking_photos_yesterday);
    };
    callAPI();
  });



  //======================================================================================
  // card สำหรับ 3 อันดับแรก
  function card_top_3(index : number ,photo : PhotoModel, yesterdayRank? : number) {
    return (
      <div className="ranking_page_photo_top_3">
        <h1>{index}</h1>
        <Card className="ranking_page_card_media_grow_img" sx={{ maxWidth: 300, borderRadius: '30px', border: '5px ridge rgb(97, 82, 192, 1)' }}>
          <CardActionArea onClick={() => navigateToViewThePhoto()}>
            <CardMedia
              component="img"
              height="140"
              image={photo?.photo_url}
              alt="green iguana"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary" className="ranking_page_photo_top_3_content">
                <p>ชื่อ : {photo?.name}</p>
                <p>คะแนน : {photo?.score.toFixed(0)}</p>
                <p>rank เมื่อวาน: {yesterdayRank}</p>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    );
  }


  //======================================================================================
  // card สำหรับ 7 อันดับหลัง
  function card_top_7(index : number ,photo : PhotoModel, yesterdayRank? : number) {
    return (
      <Card sx={{ borderRadius: 50, height: 140, display: 'flex' }} className="ranking_page_photo_top_7">
        <CardActionArea onClick={() => navigateToViewThePhoto()}>
          <div className="ranking_page_photo_top_7_content">

            <CardContent sx={{ width: '20%' }}>
              <Typography
                variant="body2"
                color="text.secondary"
                className="photo_rank"
              >
                <h2>{index}</h2>
              </Typography>
            </CardContent>

            <CardMedia
              sx={{ width: '30%', borderRadius: '10px' }}
              component="img"
              height="100"
              className="ranking_page_card_media_grow_img"
              image={photo?.photo_url}
              alt="green iguana"
            />

            <CardContent sx={{ width: '50%' }}>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                <div className="photo_name_score">
                  <p>ชื่อ : {photo?.name}</p>
                  <p>rank เมื่อวาน: {yesterdayRank}</p>
                  <p>คะแนน : {photo?.score.toFixed(0)}</p>
                </div>
              </Typography>
            </CardContent>
          </div>
        </CardActionArea>
      </Card>
    );
  }

  return (
    <div className="ranking_page_body">
      <h1 className="ranking_page_h1">Ranking Page</h1>


      {/* ranking 10 อันดับ ของวันนี้ */}
      {
        (photosRankingToday.length > 0)
          ?
            <>
              <h1 className="ranking_page_photos_header">Today</h1>
              {/* 3 อันดับแรก */}
              <div className="ranking_page_photos_top_3">
                {
                  photosRankingToday?.slice(0,3).map((photo, index) => card_top_3(index+1 ,photo, yesterdayRankOfphotosRankingToday[index]))
                }
              </div>
              {/* 7 อันดับหลัง */}
              <div className="ranking_page_photos_top_7">
                {
                  photosRankingToday?.slice(3,10).map((photo, index) => card_top_7(index+4 ,photo, yesterdayRankOfphotosRankingToday[index]))
                }
              </div>
            </>

          : <div className="ranking_page_body_loading">
              <CircularProgress/>
            </div>
      }



      {/* ranking 10 อันดับ ของเมื่อวาน */}
      {
        (photosRankingYesterday.length > 0)
          ?
            <>
              <h1 className="ranking_page_photos_header">Yesterday</h1>
               {/* 3 อันดับแรก */}
              <div className="ranking_page_photos_top_3">
                {
                  photosRankingYesterday?.slice(0,3).map((photo, index) => card_top_3(index+1 ,photo))
                }
              </div>
              {/* 7 อันดับหลัง  */}
              <div className="ranking_page_photos_top_7">
                {
                  photosRankingYesterday?.slice(3,10).map((photo, index) => card_top_7(index+4 ,photo))
                }
              </div>
            </>

          : <div className="ranking_page_body_loading">
              <CircularProgress/>
            </div>
      }

    </div>
  );
}
