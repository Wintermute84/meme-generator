import { useState, useEffect } from "react"

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}


export default function Main() {
  const [memeInfo,changeMemeInfo] = useState(
    {
      topText:"One does not simply",
      bottomText:"Walk into Mordor",
      imgUrl:"http://i.imgflip.com/1bij.jpg"
    })

  const [allMemes, setAllMemes] = useState([])
    

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(data =>{ 
        setAllMemes(data.data.memes)
      })
}, [])

    function handleChange(event){
      const {value,name} = event.currentTarget
      changeMemeInfo(prevInfo => {
        return {
          ...prevInfo,
          [name]:value
        }
      })
    }

    function getNewMeme(){
      const randomMemeIndex = getRandomInt(0,100);
      changeMemeInfo(prevInfo => {
        return {
          ...prevInfo,
          imgUrl:allMemes[randomMemeIndex].url
        }
      })
    }

    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange={handleChange}
                        value={memeInfo.topText}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        onChange={handleChange}
                        value={memeInfo.bottomText}
                    />
                </label>
                <button onClick={getNewMeme}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={memeInfo.imgUrl} />
                <span className="top">{memeInfo.topText}</span>
                <span className="bottom">{memeInfo.bottomText}</span>
            </div>
        </main>
    )
}