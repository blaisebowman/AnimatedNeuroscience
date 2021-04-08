import * as React from "react";
import {useEffect, useState} from "react";

import AnimateCC, { GetAnimationObjectParameter } from "react-adobe-animate/build";
import axios, {AxiosError, AxiosResponse} from "axios";
import {Message, Progress} from "semantic-ui-react";
import {ProgressDimmer} from "../../../styledComponents";

const PainPerception = () => {
    const [animationObject, getAnimationObject] = useState<GetAnimationObjectParameter|null>(null);
    console.log(animationObject);
    animationObject?.stage?.enableMouseOver(1000);
    const [userClicked, setUserClicked] = useState<string>("");
    const [userHover, setUserHover] = useState<string>("");
    const [percentComplete, setPercentComplete] = useState<number>(0);
    const [progressMessage, setProgressMessage] = useState<string>("");
    const [progressColor, setProgressColor] = useState<any>("black");
    const [userIsDone, setUserIsDone] = useState(false);
    const [memberArray, setMemberArray] = useState<Array<string>>([]);
    const [userIsMember, setUserIsMember] = useState<boolean>(false);

    if(process.env.NODE_ENV === 'production'){
        console.log("In production mode. Disable log statements -> hide log statements from console.");
        console.log = function (){};
    }

    useEffect(() => {
        //call getMemberArray on page load, which is used to determine if the user has completed the animation.
        if (sessionStorage.getItem("id")) {
            getMemberArray();
            setUserIsMember(true);
            console.log("Page Initial Load.");
        }
        else {
            setUserIsMember(false);
        }
    }, []);
    /*FOR 'COMPLETION':
    #1] somatosensory or [*back13,back12, back9, back7, back4] from thalamus
    #2] thalamus or [*back19,back18,back17,back16,back15,back14] or [*ff12, ff13, ff14, ff15, ff16, ff17, ff18]
    #3] gate or [*back22,back21, back20] or [*ff18, ff19, ff20, ff21]
    #4] senseReceptors or [*ff21]
    #5] hover buttons: [throb2, throbbob, throb1, thrboblob, throbalice]
    #6] mc_btns/ma_btns (click): [mc_btn1, ma_btn2, mc_btn3, ma_btn4, mc_btn5, ma_btn6, mc_btn7, ma_btn8, mc_btn9, ma_btn10]*/
    let animationComplete: string [] = ["throb2", "throbbob", "throb1", "thrboblob", "throbalice", "back4", "back8", "back11", "back12", "back13", "back14", "back15", "back16", "back17", "back18", "back19", "back20", "back21", "ff21", "mc_btn1", "ma_btn2", "mc_btn3", "ma_btn4", "mc_btn5", "ma_btn6", "mc_btn7", "ma_btn8", "mc_btn9", "ma_btn10"];
    let needToCountHover: string [] = ["throb2", "throbbob", "throb1", "thrboblob", "throbalice"];
    let conditionalPaths: string [] = ["back4", "back8", "back11", "back12", "back13", "back14", "back15", "back16", "back17", "back18", "back19", "back20", "back21", "ff21"];

    let id = sessionStorage.getItem("id");
    let port = process.env.PORT || 'http://localhost:8080/api/members/'+id+'/animations/completed';

    interface Member {
        //parameters to be passed in GET/POST request.
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
        if (animationComplete.every(r => memberArray.includes(r))) {
            setPercentComplete(100);
            setProgressMessage("Congratulations, you completed this animation!");
            if (!userIsDone) {
                console.log("The user finished the animation.");
                setUserIsDone(true);
            }
        }
        else {
            console.log(memberArray.filter(e=> !animationComplete.includes(e)));
            //Determine percentage of animation left remaining.
            let memberActions: string[] = response.data.completedActions;
            let percent = (Math.round(100-(((animationComplete.length - ((animationComplete.filter(e=>memberActions.includes(e)))).length)/animationComplete.length)*100)))
            console.log(animationComplete.filter(e=> !memberArray.includes(e)));
            setPercentComplete(percent);
            if(percent < 1){
                setProgressMessage("Let's get started! Interact with the animation and monitor your progress.");
            } else if (percent >=1 && percent < 20){
                setProgressMessage("That's a good start, keep it up!");
            }else if (percent >=20 && percent < 80){
                setProgressMessage("You're making some serious progress!");
            }else if (percent >=80 && percent < 100){
                setProgressMessage("You're almost done!");
            }else if (percent === 100){
                setProgressMessage("Congratulations, you completed this animation!");
            }
            console.log(percent);
            console.log(percentComplete);
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
        <div style={{minHeight: '65vh', maxWidth: '55vw', margin:'auto'}}>
            <AnimateCC
                getAnimationObject={getAnimationObject}
                animationName="painRedone"
            />
            <Message content='<b>Congratulations! You completed this animation.' color={progressColor}>
                <ProgressDimmer active={!userIsMember}>
                    <Message content='To track your progress, register or login to your account.'/>
                </ProgressDimmer>
                <Message content ={progressMessage}/>
                <Progress percent={percentComplete} inverted color='green' progress/>
            </Message>
        </div>
    );
};

export default PainPerception;