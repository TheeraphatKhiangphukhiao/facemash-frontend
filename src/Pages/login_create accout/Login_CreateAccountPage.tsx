// import { useEffect, useRef } from "react";
// import './login_create_account_page.css';
// import { useNavigate } from "react-router-dom";
// import { TextField } from "@mui/material";
// import { FacemashService } from "../../services/FacemashService.tsx";
// import { UserModel } from '../../models/UserModel.tsx'

// function Login_CreateAccountPage() {
//     // object ของ service
//     const service = new FacemashService();
//     // ตัวเปลี่ยนหน้า
//     const navigate = useNavigate();
    


//     // email login ของผู้ใช้
//     const email_login = useRef<HTMLInputElement>();
//     // password login ของผู้ใช้
//     const password_login = useRef<HTMLInputElement>();


//   //===========================================================================================
//     // Method login
//     async function login() {
//         if (email_login.current?.value.trim() && password_login.current?.value.trim()) {
//             const user : UserModel = await service.login(''+email_login.current?.value, ''+password_login.current?.value);
//             console.log('logined userID is: ' + user.UID)
//             // ถ้าเป็น user
//             if (user.type === 'user') {
//                 navigate('/Drawer/vote/?userUID=' + user?.UID)
//             }
//             // ถ้าเป็น admin
//             else if (user.type === 'admin') {
//                 navigate('');
//             }
//         }
//     }

//     //===========================================================================================
//     // Method login
//     async function signup() {
//         // if (email.current?.value.trim() && password.current?.value.trim()) {
//         //     const user : UserModel = await service.login(''+email.current?.value, ''+password.current?.value);
//         //     console.log('logined userID is: ' + user.UID)
//         //     // ถ้าเป็น user
//         //     if (user.type === 'user') {
//         //         navigate('/account/?userUID=' + user?.UID)
//         //     }
//         //     // ถ้าเป็น admin
//         //     else if (user.type === 'admin') {
//         //         navigate('');
//         //     }
//         // }
//     }


//   //===========================================================================================
//     // เมื่อ component ถูก render และโหลดเสร็จสมบูรณ์ โค้ดในนี้จะถูกเรียกใช้
//     useEffect(() => {
//         // หา DOM element ที่มี id เป็น 'container' และเก็บ reference ไว้ในตัวแปร container
//         const container = document.getElementById('container');
    
//         // หา DOM element ที่มี id เป็น 'register' และเก็บ reference ไว้ในตัวแปร registerBtn
//         const registerBtn = document.getElementById('register');
    
//         // หา DOM element ที่มี id เป็น 'login' และเก็บ reference ไว้ในตัวแปร loginBtn
//         const loginBtn = document.getElementById('login');
    
//         // สร้าง function ที่จะถูกเรียกเมื่อคลิกที่ปุ่ม register
//         const handleRegisterClick = () => {
//             // เพิ่ม class 'active' เข้าไปใน element container
//             container?.classList.add("active");
//         };
    
//         // สร้าง function ที่จะถูกเรียกเมื่อคลิกที่ปุ่ม login
//         const handleLoginClick = () => {
//             // ลบ class 'active' ออกจาก element container
//             container?.classList.remove("active");
//         };
    
//         // เพิ่ม event listener สำหรับปุ่ม register โดยเรียกใช้ handleRegisterClick เมื่อมีการคลิก
//         registerBtn?.addEventListener('click', handleRegisterClick);
    
//         // เพิ่ม event listener สำหรับปุ่ม login โดยเรียกใช้ handleLoginClick เมื่อมีการคลิก
//         loginBtn?.addEventListener('click', handleLoginClick);
    
//         // คืนค่าฟังก์ชัน cleanup ซึ่งจะถูกเรียกเมื่อ component ถูก unmount หรือเมื่อ useEffect ถูกเรียกใหม่
//         // ฟังก์ชัน cleanup นี้ใช้เพื่อลบ event listener เมื่อ component ถูก unmount เพื่อป้องกันการ memory leak
//         return () => {
//             registerBtn?.removeEventListener('click', handleRegisterClick);
//             loginBtn?.removeEventListener('click', handleLoginClick);
//         };
//     }, []); // ตัวแปรที่ใส่ในวงเล็บว่างหมายถึง useEffect จะถูกเรียกเพียงครั้งเดียวเมื่อ component ถูก render
    




//   //===========================================================================================
//   return (<>
//     <div className="login_page_body">
//         {/* ======================================================================= */}
//         <div className="container" id="container">
//             {/* ============================================Sing up=========================== */}
//             <div className="form-container sign-up">
//                 <div className="formClassInput">
//                     <h1>Create Account</h1>
//                     <p>input your email for registration</p>
//                     <TextField size="small" type="text" placeholder="Name" />
//                     <TextField size="small" type="email" placeholder="Email" />
//                     <TextField size="small" type="password" placeholder="Password" />
//                     <button onClick={signup}>Sign Up</button>
//                 </div>
//             </div>
//             {/* ========================================log in=============================== */}
//             <div className="form-container sign-in">
//                 <div className="formClassInput">
//                     <h1>Sign In</h1>
//                     <p>input your email password</p>
//                     <TextField size="small" type="email" placeholder="Email" inputRef={email_login} />
//                     <TextField size="small" type="password" placeholder="Password" inputRef={password_login} />
//                     {/* <a href="#">Forget Your Password?</a> */}
//                     <button onClick={login}>Sign In</button>
//                 </div>
//             </div>
//             {/* ===========================================ตัวเลื่อน============================ */}
//             <div className="toggle-container">
//                 <div className="toggle">
//                     <div className="toggle-panel toggle-left">
//                         <h1>Welcome Back!</h1>
//                         <p>Enter your personal details to use all site features</p>
//                         <button className="hidden" id="login">Sign In</button>
//                     </div>
//                     <div className="toggle-panel toggle-right">
//                         <h1>Hello, Friend!</h1>
//                         <p>Register with your personal details to use all site features</p>
//                         <button className="hidden" id="register">Sign Up</button>
//                     </div>
//                 </div>
//             </div>
//             {/* ======================================================================= */}
//         </div>
//         {/* ======================================================================= */}
//     </div>
//   </>);
// }

// export default Login_CreateAccountPage;










import { useEffect, useRef } from "react";
import './login_create_account_page.css';
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { FacemashService } from "../../services/FacemashService";

function Login_CreateAccountPage() {
    // object ของ service
    const service = new FacemashService();
    // ตัวเปลี่ยนหน้า
    const navigate = useNavigate();
    

    // email login ของผู้ใช้
    const email_login = useRef<HTMLInputElement>();
    // password login ของผู้ใช้
    const password_login = useRef<HTMLInputElement>();

    // name signup ของผู้ใช้
    const name_signup = useRef<HTMLInputElement>();
    // email signup ของผู้ใช้
    const email_signup = useRef<HTMLInputElement>();
    // password signup ของผู้ใช้
    const password_signup = useRef<HTMLInputElement>();


    //===========================================================================================
    // ไปหน้า Vote
    function navigateToVotePage() {
        navigate('/Drawer/vote');
    }


  //===========================================================================================
    // Method login
    async function login() {
        if (email_login.current?.value.trim() && password_login.current?.value.trim()) {
            const user = await service.login(''+email_login.current?.value, ''+password_login.current?.value);
            console.log('logined userID is: ' + user?.name);
            // console.log(user[0]?.UID);
            const obj = { 
                UID: user?.UID,
                name: user?.name,
                email: user?.email,
                password: user?.password,
                image: user?.image,
                type: user?.type
            };
            localStorage.setItem("userObjStr", JSON.stringify(obj));
            navigate('/Drawer/vote/');
        } else {
            confirm("กรุณากรอกข้อมูลให้ครบ");
        }
    }

    //===========================================================================================
    // Method signup
    async function signup() {
        if (name_signup.current?.value.trim() && email_signup.current?.value.trim() && password_signup.current?.value.trim()) {
            const user = await service.signup(''+name_signup.current?.value, ''+email_signup.current?.value, ''+password_signup.current?.value);
            const last_idx = user['last_idx']; 
            if(last_idx) {
                console.log("สมัครสมาชิกเรียบร้อยเเล้ว ID = " + last_idx);
                // ถ้าสมัครสมาชิกเรียบร้อยเเล้วจะได้ UID ของ User นั้นออกมา
                const userData = await service.select_user_by_id(last_idx); //จากนั้นนำ UID ไป select หาข้อมูลของ User คนนั้นๆ
                const obj = { 
                    UID: userData?.UID,
                    name: userData?.name,
                    email: userData?.email,
                    password: userData?.password,
                    image: userData?.image,
                    type: userData?.type
                };
                // ทำการเก็บข้อมูลของ User ลงบน localStorage เพื่อนำไปใช้งานต่อ
                localStorage.setItem("userObjStr", JSON.stringify(obj));
                //ทำการ navigate ไปยังหน้า vote
                navigate('/Drawer/vote/');
            } else {
                confirm("มีอีเมลนี้ในระบบเเล้วกรุณาใช้อีเมลอื่น");
            }
        } else {
            confirm("กรุณากรอกข้อมูลให้ครบ");
        }
    }

  //===========================================================================================
    // เมื่อ component ถูก render และโหลดเสร็จสมบูรณ์ โค้ดในนี้จะถูกเรียกใช้
    useEffect(() => {
        // หา DOM element ที่มี id เป็น 'container' และเก็บ reference ไว้ในตัวแปร container
        const container = document.getElementById('container');
    
        // หา DOM element ที่มี id เป็น 'register' และเก็บ reference ไว้ในตัวแปร registerBtn
        const registerBtn = document.getElementById('register');
    
        // หา DOM element ที่มี id เป็น 'login' และเก็บ reference ไว้ในตัวแปร loginBtn
        const loginBtn = document.getElementById('login');
    
        // สร้าง function ที่จะถูกเรียกเมื่อคลิกที่ปุ่ม register
        const handleRegisterClick = () => {
            // เพิ่ม class 'active' เข้าไปใน element container
            container?.classList.add("active");
        };
    
        // สร้าง function ที่จะถูกเรียกเมื่อคลิกที่ปุ่ม login
        const handleLoginClick = () => {
            // ลบ class 'active' ออกจาก element container
            container?.classList.remove("active");
        };
    
        // เพิ่ม event listener สำหรับปุ่ม register โดยเรียกใช้ handleRegisterClick เมื่อมีการคลิก
        registerBtn?.addEventListener('click', handleRegisterClick);
    
        // เพิ่ม event listener สำหรับปุ่ม login โดยเรียกใช้ handleLoginClick เมื่อมีการคลิก
        loginBtn?.addEventListener('click', handleLoginClick);
    
        // คืนค่าฟังก์ชัน cleanup ซึ่งจะถูกเรียกเมื่อ component ถูก unmount หรือเมื่อ useEffect ถูกเรียกใหม่
        // ฟังก์ชัน cleanup นี้ใช้เพื่อลบ event listener เมื่อ component ถูก unmount เพื่อป้องกันการ memory leak
        return () => {
            registerBtn?.removeEventListener('click', handleRegisterClick);
            loginBtn?.removeEventListener('click', handleLoginClick);
        };
    }, []); // ตัวแปรที่ใส่ในวงเล็บว่างหมายถึง useEffect จะถูกเรียกเพียงครั้งเดียวเมื่อ component ถูก render
    




  //===========================================================================================
  return (<>
    <div className="login_page_body">
        {/* ======================================================================= */}
        <div className="container" id="container">
            {/* ============================================Sing up=========================== */}
            <div className="form-container sign-up">
                <div className="formClassInput">
                    <h1>Create Account</h1>
                    <p>input your email for registration</p>
                    <TextField size="small" type="text" placeholder="Name" inputRef={name_signup} />
                    <TextField size="small" type="email" placeholder="Email" inputRef={email_signup} />
                    <TextField size="small" type="password" placeholder="Password" inputRef={password_signup} />
                    <button onClick={signup}>Sign Up</button>
                </div>
            </div>
            {/* ========================================log in=============================== */}
            <div className="form-container sign-in">
                <div className="formClassInput">
                    <h1>Sign In</h1>
                    <p>input your email password</p>
                    <TextField size="small" type="email" placeholder="Email" inputRef={email_login} />
                    <TextField size="small" type="password" placeholder="Password" inputRef={password_login} />
                    {/* <a href="#">Forget Your Password?</a> */}
                    <button onClick={login}>Sign In</button>
                    {/* ไปหน้า Vote page ได้เลย ถ้าไม่อยาก login */}
                    <button onClick={navigateToVotePage}>Go to Vote!</button>
                </div>
            </div>
            {/* ===========================================ตัวเลื่อน============================ */}
            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1>Welcome Back!</h1>
                        <p>Enter your personal details to use all site features</p>
                        <button className="hidden" id="login">Sign In</button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>Hello, Friend!</h1>
                        <p>Register with your personal details to use all site features</p>
                        <button className="hidden" id="register">Sign Up</button>
                    </div>
                </div>
            </div>
            {/* ======================================================================= */}
        </div>
        {/* ======================================================================= */}
    </div>
  </>);
}

export default Login_CreateAccountPage;