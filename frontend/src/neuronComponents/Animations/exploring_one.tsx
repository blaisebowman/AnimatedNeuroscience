import * as React from "react";
import {useEffect, useState} from "react";
import axios, {AxiosResponse, AxiosError} from "axios";

import AnimateCC, { GetAnimationObjectParameter } from "react-adobe-animate/build";

const App2 = () => {
    const [animationObject, getAnimationObject] = useState<GetAnimationObjectParameter|null>(null);
    const [arrayOfButtons, setArrayOfButtons] = useState([]);
    const [memberArrayOfButtons, setMemberArray] = useState([]);
    let id = sessionStorage.getItem("id");

    animationObject?.addEventListener('click',(element) => {
    const obj = Object.values(element);
    //console.log(obj[1]);
    console.log(obj[1].name);
    })

    interface Member {
        _id: string,
        animationCategory: string,
        animationName: string,
    }

    const handleMemberResponse = (response: AxiosResponse<Member>)=>{
        console.log(response);
        console.log(response.data);
        //response.data is the {complete: false, completedActions: []} object used to determine if an action has been completed in an animation
    }

    const handleError = (error: AxiosError) => {
        if (error.response) {
            console.log("CALLING");
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else {
            console.log(id);
            console.log(error.message);
        }
    };

    async function getMemberArray(){
        let port = process.env.PORT || 'http://localhost:8080/api/members/'+id+'/animations/completed';
        axios.get<Member>(port, {params: {_id: id, animationCategory: "neurons", animationName: "exploring"}})
            .then(handleMemberResponse)
            .catch(handleError);
    }
    getMemberArray();

    return (
        <div style={{maxHeight: '65vh', maxWidth: '60vw', margin:'auto'}}>
            <AnimateCC
                getAnimationObject={getAnimationObject}
                animationName="exploring"
            />
        </div>
    );
};

export default App2;