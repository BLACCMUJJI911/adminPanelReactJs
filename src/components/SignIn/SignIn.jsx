import React, { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../config/firebase"
import { ToastContainer, toast } from "react-toastify";

export default function SignIn() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (localStorage.getItem("User_ID", auth?.currentUser?.uid)) {

    window.location.replace('/dashboard')

  }

  const handleChangeEmail = e => {
    setEmail(e.target.value)
  }

  const handleChangePassword = e => {
    setPassword(e.target.value)
  }

  const signIn = async e => {

    e.preventDefault();

    try {

      if (email == "" || password == "") {

        let p = document.getElementsByTagName("p")

        p[0, 1].classList.remove("d-none")


      }

      else {

        await signInWithEmailAndPassword(auth, email, password)
        localStorage.setItem("User_ID", auth.currentUser.uid)
        alert(`Signed In Successfully ${email}`)
        window.location.replace('/dashboard')

      }

    }

    catch (error) {

      toast.error('No User Founder');

    }


  }

  return (
    <>
      <div className="mainContainer d-flex align-items-center justify-content-center flex-column mt-2 rounded">
        <h1>Admin Panel</h1>
        <hr className="line" />
        <div className="form d-flex justify-content-center align-items-center flex-column p-3 gap-2 mt-2">
          <h1 className="mb-3">Sign In</h1>
          <hr className="line2" />

          <input placeholder="Email" onChange={handleChangeEmail} value={email} className="form-control" type="text" />
          <p className="text-danger d-none">Enter Valid Email !</p>

          <input placeholder="Password" onChange={handleChangePassword} value={password} className="form-control" type="password" />
          <p className="text-danger d-none">Enter Password !</p>

          <button onClick={signIn} className="btn btn-primary mt-2">SignIn</button>

          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </div>

    </>
  )
}