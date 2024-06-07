// import {
//   Card,
//   CardActions,
//   CardMedia,
//   Radio,
// } from "@mui/material";
// import "./viewthephotopage.css";
// import { LineChart } from "@mui/x-charts/LineChart";
// import { useEffect, useState } from "react";
// import BoltIcon from '@mui/icons-material/Bolt';
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
// import HeartBrokenIcon from '@mui/icons-material/HeartBroken';


// export default function ViewThePhotoPage() {


//     // วันที่ 7 วัน ย้อนหลังของรูปภาพนี้ ที่สามารถทำคะแนนได้ (แสดงใน graph)
//     const [date, setDate] = useState([8, 9, 10, 11, 12, 13, 14]);
//     // คะแนน หรือค่าอื่นๆ 7 วันย้อนหลังของรูปภาพนี้ (แสดงใน graph)
//     const [score, setScore] = useState([2, 5.5, 2, 8.5, 1.5, 5]);

//     // ตัวเลือกสำหรับแสดง graph ว่าจะแสดง graph ในรูปแบบใด
//     const [selectValueTypeOfGraph, setSelectValueTypeOfGraph] = useState('Rank');




//   //==================================================================== funtion สำหรับแสดง graph โดย รับวันที่ และ score เข้ามา
//   function Date_score_graph() {
//     return (
//         <LineChart
//             xAxis={[{ data: date }]} //วันที่
//             series={[
//               {data: score},
//               {data: []}
//             ]} //คะแนนของวันนั้นๆ
//             width={500}
//             height={300}
//             className="viewthephotopage_date_score_graph"
//         />
//     );
//   }



//   //==================================================================== function สำหรับปุ่มเลือกการแสดงผลของ graph
//   function Graph_radio_selection(typ_of_graph : string) {
//     return (
//         <Radio
//             sx={{  }}
//             checked={selectValueTypeOfGraph === typ_of_graph} //ก่อนที่จะแสดงปุ่มว่าถูกเลือก ต้องตรวจสอบก่อนว่าค่าตรงกันหรือไม่
//             onChange={() => setShowGraph(typ_of_graph)} //เมื่อมีการกดเลือกปุ่ม ให้กำหนดค่าใหม่สำหรับแสดง graph
//             // value={name} //กดหนดค่าให้กับปุ่มนี้
//             // name="radio-buttons"
//             // inputProps={{ 'aria-label': name }}
//         />
//     );
//   }
//   //===================================================================== function set ข้อมูลให้กับ graph เพื่อแสดงผลในค่าต่างๆ
//   function setShowGraph(typ_of_graph : string) {
//     setSelectValueTypeOfGraph(typ_of_graph);
//     if (typ_of_graph === 'Rank') {
//         setScore([2, 5.5, 2, 8.5, 1.5, 5])
//     }
//     else if (typ_of_graph === 'Score') {
//         setScore([2, 4, 3, 8.5, 7, 9])
//     }
//     else if (typ_of_graph === 'Win') {
//         setScore([6, 4, 3, 1, 5, 10])
//     }
//     else if (typ_of_graph === 'Lose') {
//         setScore([2, 3, 5, 10, 2, 1])
//     }
//   }



//   //  ==============================================================================
//   useEffect(() => {

//   }, []);



//   // ===========================================================================================================
//   return (
//     <>
//       <div className="viewhephotopage_body">
//         {/*==================================================================== header ปุ่มกดกลับ และ ชื่อรูป */}
//         <div className="viewhephotopage_head">
//           {/*======================== ปุ่มกดหลับ */}
//           <div className="viewhephotopage_head_btnback_name">
//             <button className="viewhephotopage_head_btnback">
//               <h1>{"< Back"}</h1>
//             </button>
//           </div>
//           {/* =========================ชื่อรูปภาพ */}
//           <div className="viewhephotopage_head_btnback_name">
//             <h1>name</h1>
//           </div>
//         </div>



//         {/* ==================================================================== content ส่วนแสดงเนื้อหา */}
//         <div className="viewhephotopage_contents">
//           {/* =========================================== card แสดงรูปภาพ */}
//           <Card
//             sx={{ borderRadius: "50px" }}
//             className="viewhephotopage_contents_card"
//           >
//             <CardMedia
//               className="viewhephotopage_contents_card_cardmedia"
//               image="https://us-fbcloud.net/wb/data/1240/1240115-img.ugfpwy.4p.jpg"
//               title="green iguana"
//             />

//             <CardActions className="viewhephotopage_contents_card_cardactions">
//               <button className="viewhephotopage_contents_card_cardactions_btn_edit">
//                 Edit
//               </button>
//               <button className="viewhephotopage_contents_card_cardactions_btn_delete">
//                 Delete
//               </button>
//             </CardActions>
//           </Card>


//           {/* =================================================ส่วนแสดง graph และค่าอื่นๆ */}
//           <div className="viewhephotopage_contents_graph_and_score">


//             {/* =========================== แสดง graph */}
//             <Card sx={{ borderRadius: '50px' }} className="viewhephotopage_contents_graph">
//                 {selectValueTypeOfGraph}
//                 <Date_score_graph />
//                 <p>Date</p>
//             </Card>


//             {/* =========================== ปุ่มเปลี่ยนการแสดงผลของ graph */}
//             <div className="viewhephotopage_contents_graph_btn_select">
//                 {
//                     ['Rank', 'Score', 'Win', 'Lose'].map((value) => Graph_radio_selection(value))
//                 }
//             </div>


//             {/* =========================== แสดงข้อมูล score 4 ตัว */}
//             <div className="viewhephotopage_contents_scores">

//                 {/* ============= แสดง คะแนน และ rank */}
//                 <div className="viewhephotopage_contents_scores__score_rank_win_lose">
//                     {/* ===== Score */}
//                     <Card sx={{ backgroundColor: 'rgb(97, 82, 192, 1)', borderRadius: '20px' }} className="viewhephotopage_contents_scores__score_rank_win_lose_Card">
//                         <h3 className="viewhephotopage_contents_scores__score_rank_win_lose_Card_h2">
//                             <BoltIcon sx={{ width: 35, height: 35, marginLeft: -2, color: 'rgb(255, 165, 0)' }}/>
//                             {'1'}
//                         </h3>
//                         <p style={{ color: 'white' }}>xp ทั้งหมด</p>
//                     </Card>

//                     {/* ===== Rank */}
//                     <Card sx={{ backgroundColor: 'rgb(97, 82, 192, 1)', borderRadius: '20px' }} className="viewhephotopage_contents_scores__score_rank_win_lose_Card">
//                         <h3 className="viewhephotopage_contents_scores__score_rank_win_lose_Card_h2">
//                             <TrendingUpIcon sx={{ width: 35, height: 35, marginRight: 2, color: 'rgb(0, 238, 255)' }}/>
//                             {'5'}
//                         </h3>
//                         <p style={{ color: 'white' }}>rank</p>
//                     </Card>
//                 </div>

//                 {/* ============= แสดง win และ lose */}
//                 <div className="viewhephotopage_contents_scores__score_rank_win_lose">
//                     {/* ===== Win */}
//                     <Card sx={{ backgroundColor: 'rgb(97, 82, 192, 1)', borderRadius: '20px' }} className="viewhephotopage_contents_scores__score_rank_win_lose_Card">
//                         <h3 className="viewhephotopage_contents_scores__score_rank_win_lose_Card_h2">
//                             <EmojiEventsIcon sx={{ width: 35, height: 35, marginLeft: -1, marginRight: 2, color: 'rgb(255, 239, 46)' }}/>
//                             {'5'}
//                         </h3>
//                         <p style={{ color: 'white' }}>wins</p>
//                     </Card>

//                     {/* ===== Lose */}
//                     <Card sx={{ backgroundColor: 'rgb(97, 82, 192, 1)', borderRadius: '20px' }} className="viewhephotopage_contents_scores__score_rank_win_lose_Card">
//                         <h3 className="viewhephotopage_contents_scores__score_rank_win_lose_Card_h2">
//                             <HeartBrokenIcon sx={{ width: 35, height: 35, marginRight: 2, color: 'rgb(255, 140, 176)' }}/>
//                             {'5'}
//                         </h3>
//                         <p style={{ color: 'white' }}>Losesa</p>
//                     </Card>
//                 </div>
//             </div>

//           </div>

//         </div>
//       </div>
//     </>
//   );
// }









import { Card, CardActions, CardMedia, Radio } from "@mui/material";
import "./viewthephotopage.css";
import { LineChart } from "@mui/x-charts/LineChart";
import { useEffect, useState } from "react";
import BoltIcon from "@mui/icons-material/Bolt";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { FacemashService } from "../../../services/FacemashService";
import { PhotoModelHasGraph } from "../../../models/photoModelHasGraph";
import CircularProgress from '@mui/material/CircularProgress';

export default function ViewThePhotoPage() {
  const [searchParams] = useSearchParams();
  const pid = searchParams.get("PID"); //รับ PID ของรูปภาพที่ส่งเข้ามาจากหน้า PhotosPage เพื่อใช้ในการเเสดงข้อมูลของรูปภาพนั้นๆ
  // ดึง UID มาจาก path ที่ส่งมาจาด หน้า VotePage กับ AllUsersPage
  const uidFrom_VotePage_AllUsersPage = searchParams.get("UID"); //รับ PID
  const [photoHasGraph, setPhotoHasGraph] = useState<PhotoModelHasGraph>();

  // วันที่ 7 วัน ย้อนหลังของรูปภาพนี้ ที่สามารถทำคะแนนได้ (แสดงใน graph)
  const [date, setDate] = useState<number[]>([8, 9, 10, 11, 12, 13, 14]);
  // คะแนน หรือค่าอื่นๆ 7 วันย้อนหลังของรูปภาพนี้ (แสดงใน graph)
  const [score, setScore] = useState<number[]>([]);
  // คะแนนของของแต่ละวัน เมื่อ แพ้จะเสียคะแนนเท่าไหร่ของวันนั้น
  const [loseScore, setLoseScore] = useState<number[]>([]);

  // ตัวเลือกสำหรับแสดง graph ว่าจะแสดง graph ในรูปแบบใด
  const [selectValueTypeOfGraph, setSelectValueTypeOfGraph] = useState("Rank");

  // object ของ service
  const service = new FacemashService();

  const navigate = useNavigate();

  // ไปหน้าสำหรับเพิ่มรูปภาพของ User คนนั้นๆ โดยสามารถอัพโหลดรูปภาพได้ไม่เกิน 5 รูป
  function navigateToPhotos() {
    if (uidFrom_VotePage_AllUsersPage) {
      navigate("/Drawer/photos/?UID=" + uidFrom_VotePage_AllUsersPage);
    }
    else {
      navigate("/Drawer/photos");
    }
  }
  // function สำหรับลบรูปภาพของ User คนนั้นๆเเละเมื่อลบรูปภาพเสร็จเเล้วจะกลับไปที่หน้า PhotosPage เพื่อเเสดงผลการเปลี่ยนเเปลงของข้อมูล
  function deletePhoto( photoURL : string ) {
    const loadDataAsync = async () => {
      if (confirm("คุณต้องการจะลบรูปภาพไหม")) {
        const response = await service.deletePhotoById(Number(pid));
        if (response) {
          await service.deletePhotoInFilebase(photoURL);
          navigate("/Drawer/photos");
        }
      }
    };
    loadDataAsync();
  }

  // ไปหน้าสำหรับเเก้ไขรูปภาพของ User 
  function navigateToEditPhoto() {
    navigate("/editThePhoto?PID=" + pid);
  }

  //==================================================================== funtion สำหรับแสดง graph โดย รับวันที่ และ score เข้ามา
  function Date_score_graph() {
    return (
      <LineChart
        xAxis={[{ data: date }]} //วันที่
        series={[
          { data: score },
          { data: loseScore }
        ]} //คะแนนของวันนั้นๆ
        width={500}
        height={300}
        className="viewthephotopage_date_score_graph"
      />
    );
  }

  //==================================================================== function สำหรับปุ่มเลือกการแสดงผลของ graph
  function Graph_radio_selection(typ_of_graph: string) {
    return (
      <Radio
        sx={{}}
        checked={selectValueTypeOfGraph === typ_of_graph} //ก่อนที่จะแสดงปุ่มว่าถูกเลือก ต้องตรวจสอบก่อนว่าค่าตรงกันหรือไม่
        onChange={() => setShowGraph(typ_of_graph)} //เมื่อมีการกดเลือกปุ่ม ให้กำหนดค่าใหม่สำหรับแสดง graph
        // value={name} //กดหนดค่าให้กับปุ่มนี้
        // name="radio-buttons"
        // inputProps={{ 'aria-label': name }}
      />
    );
  }
  //===================================================================== function set ข้อมูลให้กับ graph เพื่อแสดงผลในค่าต่างๆ
  function setShowGraph(typ_of_graph: string) {
    setSelectValueTypeOfGraph(typ_of_graph);
    if (typ_of_graph === "Rank") {
      if (photoHasGraph?.ranking_graph) {
        setScore(photoHasGraph?.ranking_graph);
        setLoseScore([]);
      }
    } else if (typ_of_graph === "Score") {
      if (photoHasGraph?.score_wins_graph) {
        setScore(photoHasGraph?.score_wins_graph);
        setLoseScore(photoHasGraph?.score_loses_graph)
      }
    } else if (typ_of_graph === "Win") {
      if (photoHasGraph?.wins_amount_graph) {
        setScore(photoHasGraph?.wins_amount_graph);
        setLoseScore([]);
      }
    } else if (typ_of_graph === "Lose") {
      if (photoHasGraph?.loses_amount_graph) {
        setScore(photoHasGraph?.loses_amount_graph);
        setLoseScore([]);
      }
    }
  }

  //=======================================================================================
  async function convertDateToNumber( dateString: string[] ) {
    const dateNumber : number[] = [];
    for (let i = 0; i < dateString.length; i++) {
      const date : number = Number(dateString[i].split('-')[2]);
      dateNumber.push(date);
    }
    setDate(dateNumber);
  }

  //  ==============================================================================
  useEffect(() => {
    const loadDataAsync = async () => {
      const response = await service.getGrophForThePhoto(Number(pid));
      setPhotoHasGraph(response);
      setScore(response.ranking_graph);
      await convertDateToNumber(response.days);
    };
    loadDataAsync();
  }, [pid]);

  // ===========================================================================================================
  return (
    <>
        <div className="viewhephotopage_body">
          {/*==================================================================== header ปุ่มกดกลับ และ ชื่อรูป */}
          <div className="viewhephotopage_head">
            {/*======================== ปุ่มกดหลับ */}
            <div className="viewhephotopage_head_btnback_name">
              <button
                className="viewhephotopage_head_btnback"
                onClick={() => navigateToPhotos()}
              >
                <h1>{"< Back"}</h1>
              </button>
            </div>
            {/* =========================ชื่อรูปภาพ */}
            <div className="viewhephotopage_head_btnback_name">
              <h1>{photoHasGraph?.name}</h1>
            </div>
          </div>

          {/* ==================================================================== content ส่วนแสดงเนื้อหา */}
          <div className="viewhephotopage_contents">


            {/* =========================================== card แสดงรูปภาพ */}
            {
              (photoHasGraph)
                ? <Card
                    sx={{ borderRadius: "50px" }}
                    className="viewhephotopage_contents_card"
                  >
                    <CardMedia
                      className="viewhephotopage_contents_card_cardmedia"
                      image={photoHasGraph?.photo_url}
                      title="green iguana"
                    />

                    <CardActions className="viewhephotopage_contents_card_cardactions">
                      {
                        (uidFrom_VotePage_AllUsersPage)
                        ? null
                        : <>
                            <button 
                              className="viewhephotopage_contents_card_cardactions_btn_edit"
                              onClick={() => navigateToEditPhoto()}
                            >
                              Edit
                            </button>
                            <button 
                              className="viewhephotopage_contents_card_cardactions_btn_delete"
                              onClick={() => deletePhoto(photoHasGraph?.photo_url)}
                            >
                              Delete
                            </button>
                          </>
                      }
                    </CardActions>
                  </Card>
                    // ถ้ายังไม่มีข้อมูลจะแสดงการ load
                : <CircularProgress/>
            }




            {/* =================================================ส่วนแสดง graph และค่าอื่นๆ */}
            <div className="viewhephotopage_contents_graph_and_score">
              {/* =========================== แสดง graph */}
              <Card
                sx={{ borderRadius: "50px" }}
                className="viewhephotopage_contents_graph"
              >
                {selectValueTypeOfGraph}
                {
                  (score.length > 0)
                  ? <Date_score_graph />
                  : <CircularProgress/>
                }
                <p>Date</p>
              </Card>



              {/* =========================== ปุ่มเปลี่ยนการแสดงผลของ graph */}
              <div className="viewhephotopage_contents_graph_btn_select">
                {["Rank", "Score", "Win", "Lose"].map((value) =>
                  Graph_radio_selection(value)
                )}
              </div>



              {/* =========================== แสดงข้อมูล score 4 ตัว */}
              <div className="viewhephotopage_contents_scores">
                {/* ============= แสดง คะแนน และ rank */}
                <div className="viewhephotopage_contents_scores__score_rank_win_lose">
                  {/* ===== Score */}
                  <Card
                    sx={{
                      backgroundColor: "rgb(97, 82, 192, 1)",
                      borderRadius: "20px",
                    }}
                    className="viewhephotopage_contents_scores__score_rank_win_lose_Card"
                  >
                    <h3 className="viewhephotopage_contents_scores__score_rank_win_lose_Card_h2">
                      <BoltIcon
                        sx={{
                          width: 35,
                          height: 35,
                          marginLeft: -2,
                          color: "rgb(255, 165, 0)",
                        }}
                      />
                      {photoHasGraph?.score.toFixed(0)}
                    </h3>
                    <p style={{ color: "white" }}>xp ทั้งหมด</p>
                  </Card>


                  {/* ===== Rank */}
                  <Card
                    sx={{
                      backgroundColor: "rgb(97, 82, 192, 1)",
                      borderRadius: "20px",
                    }}
                    className="viewhephotopage_contents_scores__score_rank_win_lose_Card"
                  >
                    <h3 className="viewhephotopage_contents_scores__score_rank_win_lose_Card_h2">
                      <TrendingUpIcon
                        sx={{
                          width: 35,
                          height: 35,
                          marginRight: 2,
                          color: "rgb(0, 238, 255)",
                        }}
                      />
                      {photoHasGraph?.rank}
                    </h3>
                    <p style={{ color: "white" }}>rank</p>
                  </Card>
                </div>


                {/* ============= แสดง win และ lose */}
                <div className="viewhephotopage_contents_scores__score_rank_win_lose">
                  {/* ===== Win */}
                  <Card
                    sx={{
                      backgroundColor: "rgb(97, 82, 192, 1)",
                      borderRadius: "20px",
                    }}
                    className="viewhephotopage_contents_scores__score_rank_win_lose_Card"
                  >
                    <h3 className="viewhephotopage_contents_scores__score_rank_win_lose_Card_h2">
                      <EmojiEventsIcon
                        sx={{
                          width: 35,
                          height: 35,
                          marginLeft: -1,
                          marginRight: 2,
                          color: "rgb(255, 239, 46)",
                        }}
                      />
                      {photoHasGraph?.wins}
                    </h3>
                    <p style={{ color: "white" }}>wins</p>
                  </Card>


                  {/* ===== Lose */}
                  <Card
                    sx={{
                      backgroundColor: "rgb(97, 82, 192, 1)",
                      borderRadius: "20px",
                    }}
                    className="viewhephotopage_contents_scores__score_rank_win_lose_Card"
                  >
                    <h3 className="viewhephotopage_contents_scores__score_rank_win_lose_Card_h2">
                      <HeartBrokenIcon
                        sx={{
                          width: 35,
                          height: 35,
                          marginRight: 2,
                          color: "rgb(255, 140, 176)",
                        }}
                      />
                      {photoHasGraph?.loses}
                    </h3>
                    <p style={{ color: "white" }}>Losesa</p>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}