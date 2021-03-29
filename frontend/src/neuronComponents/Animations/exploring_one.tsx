import * as React from "react";
import {useEffect, useState} from "react";
import axios, {AxiosResponse, AxiosError} from "axios";

import AnimateCC, { GetAnimationObjectParameter } from "react-adobe-animate/build";

const App2 = () => {
    const [animationObject, getAnimationObject] = useState<GetAnimationObjectParameter|null>(null);
    const [userClicked, setUserClicked] = useState<string>("");
    const [userIsDone, setUserIsDone] = useState(false);
    const [isListener, setIsListener] = useState(false);
    const [memberArray, setMemberArray] = useState([]);
    let exploringComplete: string [] = ['button_1', 'button_2','button_3', 'button_4', 'button_5', 'button_6', 'button_7', 'button_8', 'button_9', 'button_10', 'button_11']
    let id = sessionStorage.getItem("id");
    let port = process.env.PORT || 'http://localhost:8080/api/members/'+id+'/animations/completed';

    interface Member {
        //parameters to be passed in GET request.
        _id: string,
        animationCategory: string,
        animationName: string,
        complete: boolean,
        completedActions: []
    }

    const handleMemberGetResponse = (response: AxiosResponse<Member>)=>{
        //response.data is the {complete: false, completedActions: []} object used to determine if an action has been completed in an animation
        console.log(response);
        console.log(response.data);
        console.log(response.data['complete']);
        console.log(response.data['completedActions']);
        setUserIsDone(response.data['complete']);
        setMemberArray(response.data['completedActions']);
    }

    const handleGetError = (error: AxiosError) => {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else {
            console.log(id);
            console.log(error.message);
        }
    };

    async function getMemberArray(){
        //get a member's progress on the exploring animation
        axios.get<Member>(port, {params: {_id: id, animationCategory: "neurons", animationName: "exploring"}})
            .then(handleMemberGetResponse)
            .catch(handleGetError);
    }


    const handleMemberPostResponse = (response: AxiosResponse<Member>)=>{
        //response.data is the {complete: false, completedActions: []} object used to determine if an action has been completed in an animation
        console.log(response);
        console.log(response.data);
    }

    const handlePostError = (error: AxiosError) => {
        if (error.response) {
            console.log(error);
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else {
            console.log(id);
            console.log(error.message);
        }
    };

    async function postMemberArray(){
        axios.post<Member>(port, {_id: id, animationCategory: "neurons", animationName: "exploring", action: userClicked},{headers: {'Content-Type': 'application/json'}})
            .then(handleMemberPostResponse)
            .catch(handlePostError);
    }


    animationObject?.addEventListener('click',(element) => {
        const obj = Object.values(element);
        //console.log(obj[1]);
        console.log(obj[1].name);
        setUserClicked(obj[1].name);
        getMemberArray();
        postMemberArray();
        setIsListener(true);
    });

    if(isListener) {
        console.log("already clicked");
        animationObject?.removeEventListener('click', (element) => {
            const obj = Object.values(element);
            //console.log(obj[1]);
            console.log(obj[1].name);
            setUserClicked(obj[1].name);
            getMemberArray();
            postMemberArray();
        });
    }



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