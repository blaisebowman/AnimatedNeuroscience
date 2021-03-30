import * as React from "react";
import {useEffect, useState} from "react";

import AnimateCC, { GetAnimationObjectParameter } from "react-adobe-animate/build";
import axios, {AxiosError, AxiosResponse} from "axios";
import {Message} from "semantic-ui-react";

const OlfactorySystem = () => {
    const [animationObject, getAnimationObject] = useState<GetAnimationObjectParameter|null>(null);
    const [userClicked, setUserClicked] = useState<string>("");
    const [userIsDone, setUserIsDone] = useState(false);
    const [memberArray, setMemberArray] = useState<Array<string>>([]);

    useEffect(() => {
        //call getMemberArray on page load, which is used to determine if the user has completed the animation.
        if(sessionStorage.getItem("id")){
            getMemberArray();
        }
    }, []);
    //transduction is a 'static' page with only one frame with three ways to access it. So, store all requests as the same value to simplify.
    //transduction access: ff2 || backvoltage || transduction
    //voltages is a 'static' page with only one frame with three ways to access it. So, store all requests as the same value to simplify.
    //voltage access: ff3 || voltages || back4
    //pathways is a 'static' page with only one frame with to the two ways to access it. So, store both requests as the same value to simplify.
    //pathways: pathways || ff4
    let animationComplete: string [] = ["nerve", "cribri", "basal", "receptorCell", "supportingCell", "cilia", "mucus", "bulbBtn", "second", "tract", "glom", "crib", "cells", "transduction", "pathways"];
    let id = sessionStorage.getItem("id");
    let port = process.env.PORT || 'http://localhost:8080/api/members/'+id+'/animations/completed';
    console.log(animationObject);

    interface Member {
        //parameters to be passed in GET request.
        _id: string,
        animationCategory: string,
        animationName: string,
        complete: boolean,
        completedActions: [],
        animationComplete: []
    }

    const handleMemberGetResponse = (response: AxiosResponse<Member>)=>{
        //response.data is the {complete: false, completedActions: []} object used to determine if an action has been completed in an animation
        console.log(response.data);
        setUserIsDone(response.data['complete']);
        setMemberArray(response.data['completedActions']);
        if(animationComplete.every(r=> memberArray.includes(r))){
            if (!userIsDone) {
                console.log("The user finished the animation.");
                setUserIsDone(true);
            }
        }
    }

    const handleGetError = (error: AxiosError) => {
        if (error.response) {
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
    };

    async function getMemberArray(){
        //get a member's progress on the exploring animation
        await axios.get<Member>(port, {params: {_id: id, animationCategory: "sensory", animationName: "olfactory"}})
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

    function handleClick(event: Object) {
        const obj = Object.values(event);
        console.log(obj[1].name);
        console.log(userClicked);
        let btnClicked = obj[1].name;
        if(btnClicked === "ff2" || btnClicked === "backvoltage" || btnClicked === "transduction"){
            btnClicked = "transduction";
        }
        else if (btnClicked === "ff3" || btnClicked === "voltages" || btnClicked === "back4"){
            btnClicked = "voltages";
        }
        else if (btnClicked === "pathways" || btnClicked === "ff4"){
            btnClicked = "pathways";
        }
        if (userClicked === ""){
            animationObject?.removeAllEventListeners();
        }
        if (userClicked !== obj[1].name && userClicked !== "") {
            console.log("User pressed a different button.");
        }
        setUserClicked(btnClicked);
        console.log("User click button with name: " + (btnClicked));
        console.log(obj[1].name);
        if (memberArray.includes(btnClicked)) {
            console.log("Button already in the array.");
        }
        if (obj[1].name !== null) {
            getMemberArray();
            axios.post<Member>(port, {_id: id, animationCategory: "sensory", animationName: "olfactory", action: btnClicked, animationComplete: animationComplete},{headers: {'Content-Type': 'application/json'}})
                .then(handleMemberPostResponse)
                .catch(handlePostError);
        }
    }

    if(sessionStorage.getItem("id")) {
        //only set event listener if the page viewer is a member
        if (!(animationObject?.hasEventListener('click'))) {
            console.log("Adding event listener.");
            animationObject?.addEventListener('click', handleClick);
        }
    }
    return (
        <div style={{maxHeight: '65vh', maxWidth: '70vw', margin:'auto'}}>
            <AnimateCC
                getAnimationObject={getAnimationObject}
                animationName="olfactory_js"
            />
            {userIsDone &&
            <Message content = 'Congratulations! You completed this animation.' color='green'/>
            }
        </div>
    );
};

export default OlfactorySystem;