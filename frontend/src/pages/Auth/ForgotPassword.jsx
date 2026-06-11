import { useState } from "react";
import { forgotPassword }
from "../../services/authService";

function ForgotPassword() {

  const [email,setEmail] =
  useState("");

  const handleSubmit =
  async (e) => {

    e.preventDefault();

    try {

      const response =
      await forgotPassword(email);

      alert(
        response.data.message
      );

    } catch(error){

      alert(
        error.response?.data?.message
      );

    }

  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-slate-100">

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Enter Email"
            className="w-full border p-3 rounded mb-4"
            value={email}
            onChange={(e)=>
              setEmail(
                e.target.value
              )
            }
          />

          <button
            className="w-full bg-blue-600 text-white p-3 rounded"
          >
            Send Reset Token
          </button>

        </form>

      </div>

    </div>

  );

}

export default ForgotPassword;