import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Ajout = () => {

    const [item, setItem] = useState({
        name: "",
        type: "",
        price: null
    });
    const [error,setError] = useState(false);

    const navigate = useNavigate();

    const handleChange = (event) => {
        setItem(prev=>({...prev, [event.target.name]: event.target.value}));
    };

    const handleClick = async e=>{
        e.preventDefault();
        try{
           await axios.post("http://localhost:3300/api/menus", item);
           navigate("/")
            }catch(err){
               console.log(err);
               setError(true)
            };
 
    }

    return (
    <div>
        {/* Banner */}
        <div className="banner">
            {/* insertion Triskell.jpg du fichier src/images*/}
            <img id="triskell" src="images/banner.png" alt="banner" />
        {/* Vous pouvez également ajouter un fond ici */}
        </div>
        <div className="form">
            <h1>AJOUT DANS LE MENU</h1>
            <div className="inputs">
            <input type="text" placeholder="nom" onChange={handleChange} name="name"/>
            <input type="text" placeholder="categorie" onChange={handleChange} name="type"/>
            <input type="number" placeholder="prix" onChange={handleChange} name="price" />
            </div>

        <div className="buttons">
            <button id="sendBtn"  onClick={handleClick}>ENVOYER</button>
            {error && "Something went wrong!"}
            <button id="backBtn"><Link to="/" >RETOUR LISTE</Link></button>
        </div>
           
        </div>
    </div>
    );
};

export default Ajout;