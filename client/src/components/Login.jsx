import { useState } from "react";
import { auth } from "../api/auth";
import { useNavigate } from "react-router-dom";



function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeemail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await auth(email, password);
    console.log(res)
    // console.log(res.statusText)
    if (res.role === 'admin') {
      navigate('/admin')
    }
  };


  return (
    <div className="w-full h-[100vh] bg-neutral-800 flex flex-col items-center justify-center text-neutral-300 select-none">

      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-xl flex flex-col items-center gap-4 bg-neutral-600"
      >
        <p className="text-xl font-semibold">Log in</p>
        <div className="h-10 w-80 flex items-center justify-center gap-2 rounded-t-xl">
          <label className="w-20" htmlFor="email">
            Email:
          </label>

          <input
            className="cursor-pointer border rounded-md px-2 border-neutral-300"
            type="text"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={handleChangeemail}
            autoComplete="off"
          // required
          />
        </div>

        <div className="h-10 w-80 flex items-center justify-center gap-2 rounded-b-xl">
          <label className="w-20" htmlFor="password">
            Password:
          </label>
          <input
            className="cursor-pointer border rounded-md px-2 border-neutral-300"
            type="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={handleChangePassword}
            autoComplete="off"
          // required
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-24 py-1 rounded-xl text-neutral-300 bg-blue-500 hover:bg-blue-600 cursor-pointer duration-300 font-semibold"
          type="button"
        >Log in</button>
      </form>

    </div>
  );
}

export default Login;




