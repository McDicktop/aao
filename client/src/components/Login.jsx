import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, userLogin } from "../features/authSlice";
import { signin } from "../api/auth";
import LoadingButton from "./common/Button/LoadingButton";


function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    const res = await signin(email, password);

    if (res.code) {

      res.code === "ERR_BAD_REQUEST" ?
        setError(res.response.data.message || 'Login error') :
        setError('Internal server error');
      setLoading(false);
      return;

      // switch (res.code) {
      //   case ("ERR_BAD_REQUEST"): {
      //     setError(res.response.data.message || 'Login error');
      //     setLoading(false);
      //     break;
      //   }
      //   default: {
      //     setError('Internal server error')
      //     setLoading(false);
      //   }
      // }
      // return;
    }

    dispatch(setToken(res.data.token));
    dispatch(userLogin({
      id: res.data.userId,
      email: res.data.email,
      role: 'admin'
    }));

    localStorage.setItem("authToken", res.data.token);

    localStorage.setItem("userData", JSON.stringify({
      id: res.data.userId,
      email: res.data.email,
      role: 'admin'
    }));

    navigate("/admin");
    setLoading(false);
  }


  return (
    <div className="w-full h-[100vh] bg-neutral-800 flex flex-col items-center justify-center text-neutral-300 select-none">

      <form
        onSubmit={handleLogin}
        className="p-6 rounded-xl flex flex-col items-center gap-4 bg-neutral-600"
      >
        <p className="text-xl font-semibold">Log in</p>

        {error && (
          <div className="text-red-400 text-sm bg-red-900/20 p-2 rounded">
            {error}
          </div>
        )}

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
            required
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
            required
          />
        </div>

        {/* <button
          className={`w-24 py-1 rounded-xl text-neutral-300 font-semibold cursor-pointer duration-300 ${loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
            }`}
          type="submit"
          disabled={loading}
        >
          {loading ? "Loading..." : "Log in"}
        </button> */}

        <LoadingButton isLoading={loading}>
          Log in
        </LoadingButton>
      </form>

    </div>
  );
}

export default Login;




