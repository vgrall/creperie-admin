import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";


const Modif = () => {

    const [item, setItem] = useState({
        name: "",
        type: "",
        price: null
    });

    const [error,setError] = useState(false)

    const navigate = useNavigate(); 
    const location = useLocation();

    const id = location.pathname.split("/")[2];


    const handleChange = (event) => {
        setItem(prev=>({...prev, [event.target.name]: event.target.value}));
    };

     const handleClick = async e=>{
          e.preventDefault();
          try{
              await axios.put(`http://localhost:3300/api/modif/${id}`, item);
              navigate("/")
                }catch(err){
                    console.log(err);
                    setError(true);

                };
 
     }

    return (
    <div>

        <div className="banner">
            <img id="triskell" src="/images/banner.png" alt="banner" />
        </div>
        
        <div className="form">
            <h1>MODIFICATION DANS LE MENU</h1>

            <div className="mainForm">
            <input type="text" placeholder="nom" onChange={handleChange} name="name"/>
            <input type="text" placeholder="categorie" onChange={handleChange} name="type"/>
            <input type="number" placeholder="prix" onChange={handleChange} name="price" />

            <button id="sendBtn" onClick={handleClick}>ENVOYER</button>
            </div>
            <div className="buttons">
            <button id="updateBtn" onClick={handleClick}>MODIFIER</button>
            {error && "Something went wrong!"}
            <button id="backBtn" ><Link to="/">RETOUR LISTE</Link></button>
            </div>

        </div>
    </div>
       
        
    );
};

export default Modif;