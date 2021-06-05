import { sendMessage } from "../actions/index";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import "../assets/styles/Home.css"

const Home = () => {
  //getting state
  const picture = useSelector((state) => [state.user.picture]);
  const [message, setmesagge] = useState("");
  const userName = useSelector((state) => state.user.name);
  const role = useSelector((state) => state.user.role);
  const history = useSelector((state) => state.history);
  const dispatch = useDispatch({});
  //calling the action at ../action/index

  const sendNewMessage = (e) => {
    e.preventDefault();
    if(message !== ""){   
      const newMessage = {
        id: history.length,
        text: message,
        role : role,
        owner: userName,
        picture: picture,
      };   //constante en el componente para efectos de la prueba ya que no se uso -env
      window.firebase.database().ref(`message/${newMessage.id}`).set(newMessage);
    }
   // dispatch(sendMessage(newMessage));
  };
  //firebace connection on ref message
  useEffect(() => {
    window.firebase
      .database()
      .ref("message/")
      .on("value", (snapshot) => {
        const currentMessage = snapshot.val();
        if(currentMessage !== null)
          dispatch(sendMessage(currentMessage));
          setmesagge("")
      });
  }, [dispatch]);

  return (
    <>
      <div className="container" id="page">
        <h1 className="space">Clase</h1>
        <div className="reproductor">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/qTqqBGTnuWY"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className="chat__container">
      <h3 className="space text-center">Chat de la sesion</h3>
      <div className="chat__messages">
        {history ? (
          history.map((data) => {
            return (
              <div key={data.id} className="chat__mesagge">
               { <span className="info">{data.role || 'usuario no registrado'}</span>  || "no role"} { <span className="info">{data.owner}</span>   ||"no owner"}
               <div className="text-center data-msg">
                { <img className="picture" src={data.picture || 'https://frontprueba.s3.us-east-2.amazonaws.com/images.png'} alt={data.owner || 'anonimo'} /> } 
                 <p className="mg-auto">{data.text}</p> 
               </div>  
              </div>
            );
          })
        ) : (
          <p></p>
        )}
      </div>
      <h3 className="space">Utiliza el chat</h3>
      <div className="chat space">
        <form onSubmit={sendNewMessage}>
          <div className="chat__input">
          <input
            type="text"
            className="input"
            required
            value={message}
            placeholder="Ingresa tu mensaje"
            onChange={(e) => {
              setmesagge(e.target.value);
            }}
          />
          <input type="submit" className="button" value="Send" onClick={sendNewMessage} />
          </div>
        </form>
      </div>
      </div>
    </>
  );
};

export default Home;
