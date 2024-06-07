import "./account_page.css";
import { UserModel } from "../../models/UserModel";
import { useEffect, useState, useRef, useMemo } from "react";
import { FacemashService } from "../../services/FacemashService";
import { Avatar, Card, IconButton, TextField } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function AccountPage() {
  
  //ใช้ useMemo เพื่อสร้าง service เพียงครั้งเดียว
  const service = useMemo(() => new FacemashService(), []);

  // ตัวดึงตัวค่ามาจาดตัวแปลใน path
  const [searchParams] = useSearchParams();

  // ดึง UID มาจาก path ที่ส่งมาจาด หน้า VotePage กับ AllUsersPage
  const uidFrom_VotePage_AllUsersPage = searchParams.get("UID"); //รับ PID

  // ใช้สำหรับดึงตัวแปลที่อยู่ใน path แต่จะเป็น array
  // const [searchParams] = useSearchParams();
  // ดึง parameter ที่ชื่อว่า movieName ที่อยู่ใน path มาเป็บไว้ในตัวแปล movieName
  // const userUID = searchParams.get("userUID");

  // user model
  const [user, setUser] = useState<UserModel>();
  // State สำหรับเก็บจำนวนรูปภาพของ User คนนั้นๆ
  const [count, setCount] = useState(0);

  //เก็บข้อมูล photoURL ที่เป็นรูปภาพออนไลน์ใน Firebase Storage
  const [photoURL, setPhotoURL] = useState<string>();

  const name = useRef<HTMLInputElement>();

  const email = useRef<HTMLInputElement>();

  const password = useRef<HTMLInputElement>();

  const original_password = useRef<HTMLInputElement>();

  const confirm_password = useRef<HTMLInputElement>();

  const [checkImage, setCheckPassword] = useState<string>();

  const navigate = useNavigate();

  //State สำหรับบังคับให้ useEffect ทำงานใหม่
  const [reload, setReload] = useState(0);

  // ไปหน้าสำหรับเเสดงรูปภาพทั้งหมดของ User คนนั้นๆ
  function navigateToPhotos() {
    if (uidFrom_VotePage_AllUsersPage) {
      navigate("/Drawer/photos/?UID=" + uidFrom_VotePage_AllUsersPage);
    } else {
      navigate("/Drawer/photos");
    }
  }

  //ฟังก์ชั่นจัดการการอัปโหลดไฟล์ภาพใหม่ไปยัง Firebase Storage เเละอัปเดตข้อมูลของ user ให้ใช้ภาพใหม่ที่ได้เปลี่ยน
  //โดยจะทำการลบภาพเก่าที่อยู่ใน Firebase Storage ออกด้วย
  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]; //รับไฟล์ที่ถูกเลือก

      //ทำการเรียก service เพื่ออัปโหลดไฟล์ใหม่ไปยัง Firebase Storage เเล้วรับ URL กลับมา
      const responsePhotoURL = await service.uploadPhoto(file);

      if (user?.image) {
        //ลบรูปภาพเก่าจาก Firebase Storage
        await service.deletePhotoInFilebase(user.image);
      }
      //ทำการกำหนด URL ของรูปภาพใหม่
      setPhotoURL(responsePhotoURL);

      if (user) {
        user.image = responsePhotoURL; //กำหนดรูปภาพใหม่ให้กับ user
        setUser({ ...user }); //อัปเดตข้อมูล user
      }
    }
  }

  function navigateToAccountPage() {
    setUser(undefined);
    const loadDataAsync = async () => {
      //ทำการเช็คว่าผู้ใช้ต้องการเปลี่ยนรหัสผ่านหรือไม่
      if (checkImage === password.current?.value) {
        if (confirm("ยืนยันการอัปเดต")) {
          const response = await service.update_user_information(
            Number(user?.UID),
            String(name.current?.value),
            String(user?.image),
            String(email.current?.value),
            String(password.current?.value)
          );
          console.log(response);
          const userData = await service.select_user_by_id(Number(user?.UID));
          const obj = {
            UID: userData?.UID,
            name: userData?.name,
            email: userData?.email,
            password: userData?.password,
            image: userData?.image,
            type: userData?.type,
          };
          // ทำการเก็บข้อมูลของ User ลงบน localStorage เพื่อนำไปใช้งานต่อ
          localStorage.setItem("userObjStr", JSON.stringify(obj));
          navigate("/Drawer/account");
          setReload(reload + 1); // บังคับให้ useEffect ทำงานใหม่
        }
      } else {
        if (original_password.current?.value) {
          if (user?.password === original_password.current?.value) {
            if (password.current?.value === confirm_password.current?.value) {
              if (confirm("ยืนยันการอัปเดต")) {
                const response = await service.update_user_information(
                  Number(user?.UID),
                  String(name.current?.value),
                  String(user?.image),
                  String(email.current?.value),
                  String(password.current?.value)
                );
                console.log(response);

                const userData = await service.select_user_by_id(
                  Number(user?.UID)
                );
                const obj = {
                  UID: userData?.UID,
                  name: userData?.name,
                  email: userData?.email,
                  password: userData?.password,
                  image: userData?.image,
                  type: userData?.type,
                };
                // ทำการเก็บข้อมูลของ User ลงบน localStorage เพื่อนำไปใช้งานต่อ
                localStorage.setItem("userObjStr", JSON.stringify(obj));
                navigate("/Drawer/account");
                setReload(reload + 1); // บังคับให้ useEffect ทำงานใหม่
              }
            } else {
              confirm("ยืนยันรหัสผ่านไม่ถูกต้อง");
            }
          } else {
            confirm("รหัสผ่านเดิมไม่ถูกต้อง");
          }
        } else {
          confirm(
            "เมื่อคุณทำการเปลี่ยนรหัสผ่าน กรุณาใส่รหัสผ่านเดิมที่ช่อง(Original Password) เเละยืนยันรหัสผ่านใหม่ที่ช่อง(Confirm Password)"
          );
        }
      }
    };
    loadDataAsync();
  }

  useEffect(() => {
    console.log("useEffect เริ่มทำงาน");

    if (uidFrom_VotePage_AllUsersPage) {
      const loadDataAsync = async () => {
        const userData = await service.select_user_by_id(
          Number(uidFrom_VotePage_AllUsersPage)
        );
        setUser(userData);

        const photoAnount = await service.countImage(
          Number(uidFrom_VotePage_AllUsersPage)
        ); // ทำการเรียก service เพื่อนับจำนวนรูปภาพ
        setCount(photoAnount.count_image); //ทำการ set State เพื่อเก็บจำนวนรูปภาพของ User คนนั้นๆ
      };
      loadDataAsync();
    } else {
      // ดึงข้อมูลของ User จาก localStorage ที่ได้ Login ไว้มาใช้งานโดยดึงข้อมูลจาก key userObjStr
      const localStorageData = localStorage.getItem("userObjStr");
      if (localStorageData) {
        console.log(1);
        // ทำการเเปลงข้อมูลของ User ที่เป็น json string ไปเป็น object
        const userData = JSON.parse(localStorageData);
        const uid = userData.UID; // ทำการดึง UID ของ User ออกมาจาก localStorage เพื่อนำไปนับจำนวนรูปภาพของ User คนนั้นๆ
        setUser(userData); //ทำการเก็บข้อมูลของผู้ใช้ไว้เเสดงผล
        setCheckPassword(userData.password); //ทำการเก็บรหัสผ่านเดิมของ User ไว้เช็คกับการเปลี่ยนเเปลง

        const loadDataAsync = async () => {
          const photoAnount = await service.countImage(uid); // ทำการเรียก service เพื่อนับจำนวนรูปภาพ
          setCount(photoAnount.count_image); //ทำการ set State เพื่อเก็บจำนวนรูปภาพของ User คนนั้นๆ
        };
        loadDataAsync();
      }
    }
  }, [uidFrom_VotePage_AllUsersPage, service, reload]);

  // ===============================================================================================
  return (
    <>
      <div className="account_page_body">
        {/* =========================================== Avatar แสดงรูป */}
        <div className="account_page_body_avatar">
          <Avatar
            alt="name..."
            src={user?.image || photoURL}
            sx={{
              width: 250,
              height: 250,
              border: "5px ridge rgb(97, 82, 192, 1)",
            }}
          />
        </div>

        {/*================================================================ แสดงส่วนของ ชื่อ email password photos... */}
        <div className="account_page_body_cards">
          {/*==============================================Name */}
          <Card
            sx={{
              borderRadius: "25px",
              width: "100%",
            }}
          >
            <TextField
              id="outlined-multiline-flexible"
              defaultValue={user?.name}
              multiline
              placeholder="name"
              maxRows={4}
              inputRef={name}
              variant="outlined"
              InputProps={{
                sx: {
                  borderRadius: "25px", // ทำให้มุมของ TextField โค้งเหมือน Card
                  bgcolor: "background.paper", // ตั้งสีพื้นหลังให้เหมือนกับ Card
                  boxShadow: 3, // เพิ่มเงาเล็กน้อยเพื่อให้ดูเป็นเนื้อเดียวกัน
                  fontFamily: 'Kanit',
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none", // ลบเส้นขอบของ TextField
                  },
                },
              }}
              sx={{ width: "100%", borderRadius: "25px" }}
            />
          </Card>
          <br />

          {uidFrom_VotePage_AllUsersPage ? null : (
            <Card
              sx={{
                borderRadius: "25px",
                width: "100%",
              }}
            >
              <input
                type="file"
                alt="*"
                onChange={handleFileUpload}
                style={{
                  width: "100%", // ให้ input กว้างเต็มที่
                  borderRadius: "25px", // ทำให้มุมโค้งเหมือน Card
                  padding: "8px", // เพิ่ม padding ภายใน input
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)", // เพิ่มเงาเล็กน้อยเพื่อให้ดูเป็นเนื้อเดียวกัน
                  border: "1px solid #ccc", // ตั้งค่าเส้นขอบเบาๆ
                  outline: "none", // ลบเส้นขอบเวลาคลิก
                  backgroundColor: "#fff", // ตั้งสีพื้นหลังให้เหมือนกับ Card
                  fontFamily: 'Kanit',
                }}
              />
            </Card>
          )}
          <br />

          {/* =============================================Email */}
          <Card
            sx={{
              borderRadius: "25px",
              width: "100%",
            }}
          >
            <TextField
              id="outlined-multiline-flexible"
              defaultValue={user?.email}
              multiline
              placeholder="email"
              maxRows={4}
              inputRef={email}
              variant="outlined"
              InputProps={{
                sx: {
                  borderRadius: "25px", // ทำให้มุมของ TextField โค้งเหมือน Card
                  bgcolor: "background.paper", // ตั้งสีพื้นหลังให้เหมือนกับ Card
                  boxShadow: 3, // เพิ่มเงาเล็กน้อยเพื่อให้ดูเป็นเนื้อเดียวกัน
                  fontFamily: 'Kanit',
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none", // ลบเส้นขอบของ TextField
                  },
                },
              }}
              sx={{ width: "100%", borderRadius: "25px" }}
            />
          </Card>
          <br />

          {/*=============================================== Password */}
          {uidFrom_VotePage_AllUsersPage ? null : (
            <Card
              sx={{
                borderRadius: "25px",
                width: "100%",
              }}
            >
              <TextField
                id="outlined-multiline-flexible"
                placeholder="Original Password"
                multiline
                maxRows={4}
                inputRef={original_password}
                variant="outlined"
                InputProps={{
                  sx: {
                    borderRadius: "25px", // ทำให้มุมของ TextField โค้งเหมือน Card
                    bgcolor: "background.paper", // ตั้งสีพื้นหลังให้เหมือนกับ Card
                    boxShadow: 3, // เพิ่มเงาเล็กน้อยเพื่อให้ดูเป็นเนื้อเดียวกัน
                    fontFamily: 'Kanit',
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none", // ลบเส้นขอบของ TextField
                    },
                  },
                }}
                sx={{ width: "100%", borderRadius: "25px" }}
              />
            </Card>
          )}
          <br />

          {uidFrom_VotePage_AllUsersPage ? null : (
            <Card
              sx={{
                borderRadius: "25px",
                width: "100%",
              }}
            >
              <TextField
                id="outlined-multiline-flexible"
                defaultValue={user?.password}
                multiline
                maxRows={4}
                inputRef={password}
                variant="outlined"
                InputProps={{
                  sx: {
                    borderRadius: "25px", // ทำให้มุมของ TextField โค้งเหมือน Card
                    bgcolor: "background.paper", // ตั้งสีพื้นหลังให้เหมือนกับ Card
                    boxShadow: 3, // เพิ่มเงาเล็กน้อยเพื่อให้ดูเป็นเนื้อเดียวกัน
                    fontFamily: 'Kanit',
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none", // ลบเส้นขอบของ TextField
                    },
                  },
                }}
                sx={{ width: "100%", borderRadius: "25px" }}
              />
            </Card>
          )}
          <br />

          {uidFrom_VotePage_AllUsersPage ? null : (
            <Card
              sx={{
                borderRadius: "25px",
                width: "100%",
              }}
            >
              <TextField
                id="outlined-multiline-flexible"
                placeholder="Confirm Password"
                multiline
                maxRows={4}
                inputRef={confirm_password}
                variant="outlined"
                InputProps={{
                  sx: {
                    borderRadius: "25px", // ทำให้มุมของ TextField โค้งเหมือน Card
                    bgcolor: "background.paper", // ตั้งสีพื้นหลังให้เหมือนกับ Card
                    boxShadow: 3, // เพิ่มเงาเล็กน้อยเพื่อให้ดูเป็นเนื้อเดียวกัน
                    fontFamily: 'Kanit',
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none", // ลบเส้นขอบของ TextField
                    },
                  },
                }}
                sx={{ width: "100%", borderRadius: "25px" }}
              />
            </Card>
          )}
          <br />

          {/*=============================================== go to Photos */}
          {uidFrom_VotePage_AllUsersPage ? (
            <Card
              sx={{ borderRadius: "50px" }}
              className="account_page_body_card"
            >
              <h1 className="account_page_body_card_name">Photos: {count}</h1>
              <div className="account_page_body_card_btn_edit">
                <IconButton
                  sx={{ backgroundColor: "ButtonHighlight" }}
                  onClick={() => navigateToPhotos()}
                >
                  <ArrowBackIosNewIcon
                    sx={{ width: 30, height: 30 }}
                    className="account_page_body_card_btn_edit_icon_gotophotos"
                  />
                </IconButton>
              </div>
            </Card>
          ) : null}

          <div className="account_page_body_card_btn_edit">
            {
              // ถ้าผู้ใช้คนอื่นเอ้ามาดู profile เราเขาจะแก้ไขข้อมูลของเราไม่ได้
              uidFrom_VotePage_AllUsersPage ? null : (
                <button
                  className="account_page_head_btnback"
                  onClick={() => navigateToAccountPage()}
                >
                  Save
                </button>
              )
            }
          </div>
        </div>
      </div>
    </>
  );
}
