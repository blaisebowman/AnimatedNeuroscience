import * as React from "react";
import {useEffect, useState} from "react";
import AnimateCC, { GetAnimationObjectParameter } from "react-adobe-animate/build";
import axios, {AxiosError, AxiosResponse} from "axios";
import {Message, Progress} from "semantic-ui-react";

const BrainLobes= () => {
    const [animationObject, getAnimationObject] = useState<GetAnimationObjectParameter|null>(null);
    console.log(animationObject);
    const [userClicked, setUserClicked] = useState<string>("");
    const [percentComplete, setPercentComplete] = useState<number>(0);
    const [progressMessage, setProgressMessage] = useState<string>("");
    const [progressColor, setProgressColor] = useState<any>("black");
    const [userIsDone, setUserIsDone] = useState(false);
    const [memberArray, setMemberArray] = useState<Array<string>>([]);
    useEffect(() => {
        //call getMemberArray on page load, which is used to determine if the user has completed the animation.
        if(sessionStorage.getItem("id")){
            getMemberArray();
        }
    }, []);

    let animationComplete: string [] = ["front", "parietal", "occipital", "cerebellum", "temporal"];
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
        await axios.get<Member>(port, {params: {_id: id, animationCategory: "brain", animationName: "lobes"}})
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
        console.log(userClicked);
        if (userClicked === ""){
            animationObject?.removeAllEventListeners();
        }
        if (userClicked !== obj[1].name && userClicked !== "") {
            console.log("User pressed a different button.");
        }
        setUserClicked(obj[1].name);
        console.log("User click button with name: " + (obj[1].name));
        if (memberArray.includes(obj[1].name)) {
            console.log("Button already in the array.");
        }
        if (obj[1].name !== null) {
            getMemberArray();
            axios.post<Member>(port, {_id: id, animationCategory: "brain", animationName: "lobes", action: obj[1].name, animationComplete: animationComplete},{headers: {'Content-Type': 'application/json'}})
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
                animationName="lobes_js"
            />
            <Message content='<b>Congratulations! You completed this animation.' color={progressColor}>
                <Message content ={progressMessage}/>
                <Progress percent={percentComplete} inverted color='green' progress/>
            </Message>
        </div>
    );
};

export default BrainLobes;