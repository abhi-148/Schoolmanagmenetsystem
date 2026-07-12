import { useState }
from "react";

import { resetPassword }
from "../../services/authService";

function ResetPassword() {

const [formData,setFormData] =
useState({
token:"",
password:""
});

const handleChange =
(e)=>{

setFormData({
...formData,
[e.target.name]:
e.target.value
});

};

const handleSubmit =
async(e)=>{

e.preventDefault();

try{

const response =
await resetPassword(
formData
);

alert(
response.data.data.message
);

}
catch(error){

alert(
error.response?.data?.message
);

}

};

return(

<div className="min-h-screen flex justify-center items-center bg-slate-100">

<div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

<h2 className="text-2xl font-bold text-center mb-6">
Reset Password
</h2>

<form onSubmit={handleSubmit}>

<input
type="text"
name="token"
placeholder="Enter Reset Token"
className="w-full border p-3 rounded mb-4"
onChange={handleChange}
/>

<input
type="password"
name="password"
placeholder="Enter New Password"
className="w-full border p-3 rounded mb-4"
onChange={handleChange}
/>

<button
className="w-full bg-green-600 text-white p-3 rounded"
>
Reset Password
</button>

</form>

</div>

</div>

);

}

export default ResetPassword;