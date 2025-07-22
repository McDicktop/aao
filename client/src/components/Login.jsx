import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  return (
    <div className="w-full h-[100vh] bg-neutral-800 flex flex-col items-center justify-center text-neutral-300 select-none">

      <div className="p-6 rounded-xl flex flex-col items-center gap-4 bg-neutral-600">
        <div className="h-10 w-80 flex items-center justify-center gap-2 rounded-t-xl">
          <label className="w-20" htmlFor="username">
            User:
          </label>

          <input
            className="cursor-pointer border rounded-md px-2 border-neutral-300"
            type="text"
            id="username"
            placeholder="Enter username"
            value={username}
            onChange={handleChangeUsername}
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
            onChange={handleChangePassword}
            autoComplete="off"
            required
          />
        </div>

        <button
          className="w-24 py-1 rounded-xl text-neutral-300 bg-blue-500 hover:bg-blue-600 cursor-pointer duration-300 font-semibold"
          type="button"
        >Log in</button>
      </div>

    </div>
  );
}

export default Login;
