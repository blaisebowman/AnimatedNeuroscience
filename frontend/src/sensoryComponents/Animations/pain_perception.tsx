import * as React from "react";
import {useEffect, useState} from "react";

import AnimateCC, { GetAnimationObjectParameter } from "react-adobe-animate/build";
import axios, {AxiosError, AxiosResponse} from "axios";
import {Message} from "semantic-ui-react";

const PainPerception = () => {
    const [animationObject, getAnimationObject] = useState<GetAnimationObjectParameter|null>(null);
    console.log(animationObject);
    animationObject?.stage?.enableMouseOver(1000);
    const [userClicked, setUserClicked] = useState<string>("");
    const [userHover, setUserHover] = useState<string>("");
    const [userIsDone, setUserIsDone] = useState(false);
    const [memberArray, setMemberArray] = useState<Array<string>>([]);
    useEffect(() => {
        //call getMemberArray on page load, which is used to determine if the user has completed the animation.
        if(sessionStorage.getItem("id")){
            getMemberArray();
        }
    }, []);
    //due to the intricacies of this animation in particular, we will consider a small amount of buttons to count as complete.
    /*
    somatosensory or [*back13,back12, back9, back7, back4] from thalamus
    thalamus or [*back19,back18,back17,back16,back15,back14] or [*ff12, ff13, ff14, ff15, ff16, ff17, ff18]
    gate or [*back22,back21, back20] or [*ff18, ff19, ff20, ff21]
    senseReceptors or [*ff21]
    hover buttons: [throb2, throbbob, throb1, thrboblob, throbalice]
    mc_btns (click): [mc_btn1, ma_btn2, mc_btn3, ma_btn4, mc_btn5, ma_btn6, mc_btn7, ma_btn8, mc_btn9, ma_btn10]

     */
    let animationComplete: string [] = ["throb2", "throbbob", "throb1", "thrboblob", "throbalice", "back4", "back8", "back11", "back12", "back13", "back14", "back15", "back16", "back17", "back18", "back19", "back20", "back21", "ff21", "mc_btn1", "ma_btn2", "mc_btn3", "ma_btn4", "mc_btn5", "ma_btn6", "mc_btn7", "ma_btn8", "mc_btn9", "ma_btn10"];
    let needToCountHover: string [] = ["throb2", "throbbob", "throb1", "thrboblob", "throbalice"];
    let conditionalPaths: string [] = ["back4", "back8", "back11", "back12", "back13", "back14", "back15", "back16", "back17", "back18", "back19", "back20", "back21", "ff21"];

    let id = sessionStorage.getItem("id");
    let port = process.env.PORT || 'http://localhost:8080/api/members/'+id+'/animations/completed';

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
        console.log(animationComplete.filter(e=>!memberArray.includes(e)));
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
        await axios.get<Member>(port, {params: {_id: id, animationCategory: "sensory", animationName: "pain"}})
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
        if(conditionalPaths.includes(obj[1].name)){
            if (obj[1].name === "ff2" || obj[1].name === "somatosensory"){
                btnClicked = "back4";
            }else if (obj[1].name === "ff7" ){
                btnClicked = "back8";
            }else if (obj[1].name === "ff8" ){
                btnClicked = "back11";
            }else if (obj[1].name === "ff11" ){
                btnClicked = "back12";
            }else if (obj[1].name === "ff12" ){
                btnClicked = "back13";
            }else if (obj[1].name === "ff13" || obj[1].name === "thalamus" ){
                btnClicked = "back14";
            }else if (obj[1].name === "ff14" ){
                btnClicked = "back15";
            }else if (obj[1].name === "ff15" ){
                btnClicked = "back16";
            }else if (obj[1].name === "ff16" ){
                btnClicked = "back17";
            }else if (obj[1].name === "ff17" ){
                btnClicked = "back18";
            }else if (obj[1].name === "ff18" ){
                btnClicked = "back19";
            }else if (obj[1].name === "ff19" || obj[1].name === "gate"){
                btnClicked = "back20";
            }else if (obj[1].name === "ff20" ){
                btnClicked = "back21";
            }else if (obj[1].name === "back22" || obj[1].name === "senseReceptors"){
                btnClicked = "ff21";
            }
        }
        if (userClicked === ""){
            animationObject?.removeAllEventListeners();
        }
        if (userClicked !== btnClicked && userClicked !== "") {
            console.log("User pressed a different button.");
        }
        setUserClicked(btnClicked);
        console.log("User click button with name: " + (btnClicked));
        if (memberArray.includes(btnClicked)) {
            console.log("Button already in the array.");
        }
        if (btnClicked !== null && btnClicked !== "home") {
            getMemberArray();
            axios.post<Member>(port, {_id: id, animationCategory: "sensory", animationName: "pain", action: btnClicked, animationComplete: animationComplete},{headers: {'Content-Type': 'application/json'}})
                .then(handleMemberPostResponse)
                .catch(handlePostError);
        }
    }

    function handleHover(event: Object) {
        const obj = Object.values(event);
        console.log(obj[1].name);
        if(obj[1].name === "throb2" || obj[1].name === "throbbob" || obj[1].name === "throb1" || obj[1].name === "thrboblob" || obj[1].name ==="throbalice") {
            if (needToCountHover.includes(obj[1].name)) {
                console.log(userHover);
                if (userHover === "") {
                    animationObject?.removeAllEventListeners();
                }
                if (userHover !== obj[1].name && userHover !== "") {
                    console.log("User pressed a different button.");
                }
                setUserHover(obj[1].name);
                console.log("User hovered button with name: " + (obj[1].name));
                if (memberArray.includes(obj[1].name)) {
                    console.log("Button already in the array.");
                }
                console.log(obj[1].name);
                if (obj[1].name !== null) {
                    getMemberArray();
                    axios.post<Member>(port, {
                        _id: id,
                        animationCategory: "sensory",
                        animationName: "pain",
                        action: obj[1].name,
                        animationComplete: animationComplete
                    }, {headers: {'Content-Type': 'application/json'}})
                        .then(handleMemberPostResponse)
                        .catch(handlePostError);
                }
            }
        }
    }

    if(sessionStorage.getItem("id")) {
        //only set event listener if the page viewer is a member
        if (!(animationObject?.hasEventListener('click'))) {
            console.log("Adding event listener.");
            animationObject?.addEventListener('click', handleClick);
        }
        if(!(animationObject?.hasEventListener('mouseover'))){
            console.log("Adding mouseover");
            animationObject?.addEventListener('mouseover', handleHover);
        }
    }
    return (
        <div style={{maxHeight: '65vh', maxWidth: '70vw', margin:'auto'}}>
            <AnimateCC
                getAnimationObject={getAnimationObject}
                animationName="painRedone"
            />
            {userIsDone &&
            <Message content = 'Congratulations! You completed this animation.' color='green'/>
            }
        </div>
    );
};

export default PainPerception;