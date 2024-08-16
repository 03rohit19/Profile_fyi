import { useEffect, useState } from "react";
import Header from "../Header/Header";

const Contact = () => {
  const [dataInfo, setDataInfo] = useState({
    name: "dummy",
    bio: "dummy biodata",
    avatar_url: "dummy photo",
    login: "dummy login",
  });

  const fetchBioData = async () => {
    const data = await fetch("https://api.github.com/users/03rohit19");
    const json = await data.json();
    setDataInfo(json);
  };

  useEffect(() => {
    fetchBioData();
  }, []);

  const { name, bio, avatar_url, login } = dataInfo;

  return (
    <>
      <Header />
      <div className="user-card p-4 bg bg-white font-serif">
        <img
          className="w-40 h-40 rounded-full mb-4 shadow-lg bg-slate-50 mt-20"
          src={avatar_url}
          alt="Avatar"
        />
        <h2 className="text-xl font-bold mb-2">Name: {name}</h2>
        <h3 className="text-lg font-semibold">Bio: {bio}</h3>
        <h3 className="text-lg font-semibold">Git User Id: {login}</h3>
        <h3 className="text-lg font-semibold">Contact: 9625112668</h3>
      </div>
    </>
  );
};

export default Contact;
