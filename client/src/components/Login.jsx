import { useState } from "react";
import { signin } from '../api/auth';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { loginStart, loginSuccess, loginFailure } from "../features/authSlice";


function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // dispatch(loginStart());
    console.log(email, password)
    // try {

    //   // const token = await signin(email, password)
    //   const res = await signin(email, password)

    //   // console.log(res)
    //   if (res.message) {
    //     console.log(res.response.data.message)
    //     dispatch(loginFailure());
    //     setError('error');
    //     return;
    //   }


    //   dispatch(loginSuccess({ token: res.data.token }));
    //   navigate('/admin')

    // } catch (e) {
    //   dispatch(loginFailure());
    //   setError('Network error');
    // }
  }


  return (
    <div className="w-full h-[100vh] bg-neutral-800 flex flex-col items-center justify-center text-neutral-300 select-none">

      <form
        // onSubmit={handleSubmit}
        onSubmit={handleLogin}
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
            onChange={handleEmail}
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
            onChange={handlePassword}
            autoComplete="off"
          // required
          />
        </div>

        <button
          // onClick={handleSubmit}
          onClick={handleLogin}
          className="w-24 py-1 rounded-xl text-neutral-300 bg-blue-500 hover:bg-blue-600 cursor-pointer duration-300 font-semibold"
          type="button"
        // type="submit"
        >Log in</button>
      </form>

    </div>
  );
}

export default Login;




