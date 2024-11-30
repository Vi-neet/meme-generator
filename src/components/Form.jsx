import { useState, useEffect } from "react";

export default function Form() {
  const [memeInfo, setMemeInfo] = useState({
    topText: "One does not simply",
    bottomText: "Walk into Mordor",
    imageUrl: "http://i.imgflip.com/1bij.jpg",
  });
  const [allMemes, setAllMemes] = useState([]);

  useEffect(function () {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const newMemeUrl = allMemes[randomNumber].url;
    setMemeInfo((prevMeme) => ({
      ...prevMeme,
      imageUrl: newMemeUrl,
    }));
  }
  function handleChange(e) {
    const { value, name } = e.currentTarget;
    setMemeInfo((prevVal) => {
      return {
        ...prevVal,
        [name]: value,
      };
    });
  }
  return (
    <main>
      <div className="form">
        <label>
          Top Text
          <input
            type="text"
            placeholder="One does not simply"
            name="topText"
            onChange={handleChange}
            value={memeInfo.topText}
          />
        </label>

        <label>
          Bottom Text
          <input
            type="text"
            placeholder="Walk into Mordor"
            name="bottomText"
            onChange={handleChange}
            value={memeInfo.bottomText}
          />
        </label>
        <button onClick={getMemeImage}>Get a new meme image 🖼</button>
      </div>
      <div className="meme">
        <img src={memeInfo.imageUrl} />
        <span className="top">{memeInfo.topText}</span>
        <span className="bottom">{memeInfo.bottomText}</span>
      </div>
    </main>
  );
}
