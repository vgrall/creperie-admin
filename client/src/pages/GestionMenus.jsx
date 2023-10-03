import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const GestionMenus = ()=> {
    const [menus, setMenus] = useState([]);
    
    useEffect(() => {
        const fecthAllMenus = async () => {
            try{
                const res = await axios.get("http://localhost:3300/api/menus");
                setMenus(res.data);
                console.log(res);
            }catch(err){
                console.log(err);
            }

        };

        fecthAllMenus();

    }, []);

    const handleDelete = async (id) => {
        try{
            await axios.delete(`http://localhost:3300/api/menus/${id}`);
            window.location.reload();
        }catch(err){
            console.log(err);
        }
    };

    return (
        <div>
             <div className="banner">
            {/* insertion Triskell.jpg du fichier src/images*/}
            <img id="triskell" src="images/banner.png" alt="Triskell" />
        {/* Vous pouvez également ajouter un fond ici */}
        </div>
       
        <div className="bodyList">
            <h1>LISTES DES PRODUITS</h1>

            <div className="buttons">
            <button className="addButton"><Link to="/ajout" id="addBtn">AJOUT AU MENU</Link></button> 
            </div>

            <div className="listMenu">
                {menus.map(menu => (
                    <div className="item" key={menu.id}>
                        <ul>
                            <li>id : {menu.id}</li>
                            <li>nom : {menu.name}</li>
                            <li>catégorie : {menu.type}</li>
                            <li>prix : {menu.price} €</li>
                        </ul>
                        <div className="buttons">
                        <button className="deleteBtn"onClick={()=>handleDelete(menu.id)}>SUPPRIMER</button>
                        <button className="updateBtn"><Link to={`/modif/${menu.id}`} id="btn" >MODIFIER</Link></button>
                        </div>
                    </div>
                    
                ))}
            </div>
                     
        </div>
        </div>
    );
};

export default GestionMenus;