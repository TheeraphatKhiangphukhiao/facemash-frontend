import { Outlet, useNavigate } from "react-router-dom";
import "./drawer.css";
import { useEffect, useState } from "react";
import { UserModel } from "../../models/UserModel";


export default function DrawerLeft() {

  // ไม่ว่าจะเป็น user ทั่วไป หรือ damin
  const [user, setUser] = useState<UserModel>();

  // สร้าง object เพื่อใช้สำหรับเปลี่ยนหน้า โดยสามารถส่งตัวแปลไปหน้านั้นๆ ได้
  const navigate = useNavigate();

  //===========================================================================================
  // ไปหน้า Vote
  function navigateToVotePage() {
    navigate('/Drawer/vote');
  }

  // ไปหน้า Ranking
  function navigateToRankingPage() {
    navigate('/Drawer/ranking');
  }

  // ไปหน้า Photos
  function navigateToPhotosPage() {
    navigate('/Drawer/photos');
  }

  // ไปหน้า Account
  function navigateToAccountPage() {
    navigate('/Drawer/account');
  }

  // ไปหน้าแสดง user ทั้งหมด
  function navigateToAllUserPage() {
    navigate('/Drawer/allUsers');
  }

  // ไปหน้า Login
  function navigateToLoginPage() {
    localStorage.clear();
    navigate('/');
  }

  //===========================================================================================
  useEffect(() => {
    // ดึงข้อมูลของ User จาก localStorage ที่ได้ Login ไว้มาใช้งานโดยดึงข้อมูลจาก key userObjStr
    const localStorageData = localStorage.getItem("userObjStr");
    if (localStorageData) {
      const userData : UserModel = JSON.parse(localStorageData);
      setUser(userData);
    }
  }, []);

  //===========================================================================================
  return (
    <div className="main_body">

      {/* ส่วนแสดงปุ่มทางซ้าย */}
      <div className="drawer_left_buttons">
        {
          (user) // ถ้า login แล้ว
            ? <>
                {
                  (user.type === 'admin') // ถ้า login แล้ว แต่เป็น damin
                    ? <>
                        <button className="drawer_left_button" onClick={navigateToVotePage}>Vote</button>
                        <button className="drawer_left_button" onClick={navigateToRankingPage}>Ranking</button>
                        <button className="drawer_left_button" onClick={navigateToPhotosPage}>Photos</button>
                        <button className="drawer_left_button" onClick={navigateToAllUserPage}>Users</button>
                        <button className="drawer_left_button" onClick={navigateToAccountPage}>Account</button>
                        <button className="drawer_left_button" onClick={navigateToLoginPage}>Logout</button>
                      </>

                      // ถ้า login มาแล้ว แต่เป็น user ทั่วไป
                    : <>
                        <button className="drawer_left_button" onClick={navigateToVotePage}>Vote</button>
                        <button className="drawer_left_button" onClick={navigateToRankingPage}>Ranking</button>
                        <button className="drawer_left_button" onClick={navigateToPhotosPage}>Photos</button>
                        <button className="drawer_left_button" onClick={navigateToAccountPage}>Account</button>
                        <button className="drawer_left_button" onClick={navigateToLoginPage}>Logout</button>
                      </>
                }
              </>

              // ถ้ายังไม่ login
            : <>
                <button className="drawer_left_button" onClick={navigateToVotePage}>Vote</button>
                <button className="drawer_left_button" onClick={navigateToRankingPage}>Ranking</button>
                <button className="drawer_left_button" onClick={navigateToLoginPage}>Login</button>
              </>
        }
      </div>

      {/* ส่วนแสดงผลของหน้าต่างๆ */}
      <div className="main_body_content">
        {/* Outlet คือพื้นที่แสดงผลของ path ต่างๆ ที่อยู่ใน children ของ path หลักนั้นๆ */}
        <Outlet />
      </div>

    </div>
  );
}
