import React from "react";
import ReactDOM from "react-dom/client"

function Main() {

  const [meme, setMeme] = React.useState({
    topText: "One does not simply",
    bottomText: "Walk into Mordor",
    imgUrl: "http://i.imgflip.com/1bij.jpg"
  });

  const [allMeme, setAllMeme] = React.useState({});

  React.useEffect(()=>{
    console.log('render')
    fetch("https://api.imgflip.com/get_memes")
    .then(res=> res.json())
    .then(data=> setAllMeme(data.data.memes));
    
  },[]);

  function changeImg(){
    const randomNumber = Math.floor(Math.random()*allMeme.length);
    
    const newMemeUrl = allMeme[randomNumber].url;
    setMeme(prevMeme=>({
    ...prevMeme,imgUrl:newMemeUrl
    } 
    ))
  }

  function changeText(event){
  const {value,name}= event.currentTarget;
  
  setMeme(preMeme=>{
    return {
      ...preMeme, 
        [name]: value
    }
  })
}

    return (

        <main>
            <div className="form">
                <label>Top Text
                    <input onChange={changeText}
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                    />
                </label>

                <label>Bottom Text
                    <input onChange={changeText}
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                    />
                </label>
                <button onClick={changeImg}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={meme.imgUrl} />
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
    )
}

function Header() {
  const trollFace = "troll-face.png";
    return (
        <header className="header">
            <img 
                src={trollFace} 
            />
            <h1>Meme Generator</h1>
        </header>
    )
}

function App(){
  return(
  <>
  <Header/>
  <Main/>
  </>
  )
}


const container = document.querySelector('.js-container');
ReactDOM.createRoot(container).render(<App/>);