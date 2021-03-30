import * as React from "react";
import {useEffect, useState} from "react";
import AnimateCC, { GetAnimationObjectParameter } from "react-adobe-animate/build";
import axios, {AxiosError, AxiosResponse} from "axios";
import {Message} from "semantic-ui-react";

const AutonomicNervousSystem = () => {
    const [animationObject, getAnimationObject] = useState<GetAnimationObjectParameter|null>(null);
    const [userClicked, setUserClicked] = useState<string>("");
    const [userIsDone, setUserIsDone] = useState(false);
    const [memberArray, setMemberArray] = useState<Array<string>>([]);
    useEffect(() => {
        //call getMemberArray on page load, which is used to determine if the user has completed the animation.
        if (sessionStorage.getItem("id")) {
            getMemberArray();
        }
    }, []);

    //FOR 'COMPLETION': Mobile: require clicks. Desktop: require hover/or clicks

    let animationComplete: string [] = ["eye", "salivary", "trachea", "sweat", "lungs", "heart", "adrenal", "liver", "stomach", "pancreas", "kidney", "gi", "bladder", "blood", "sympatheticButton", "parasympatheticButton"];
    let id = sessionStorage.getItem("id");
    let port = process.env.PORT || 'http://localhost:8080/api/members/' + id + '/animations/completed';

    interface Member {
        //parameters to be passed in GET/POST request.
        _id: string,
        animationCategory: string,
        animationName: string,
        complete: boolean,
        completedActions: [],
        animationComplete: []
    }

    const handleMemberGetResponse = (response: AxiosResponse<Member>) => {
        //response.data is the {complete: false, completedActions: []} object used to determine if an action has been completed in an animation
        console.log(response.data);
        setUserIsDone(response.data['complete']);
        setMemberArray(response.data['completedActions']);
        console.log(animationComplete.filter(e => !memberArray.includes(e)));
        if (animationComplete.every(r => memberArray.includes(r))) {
            if (!userIsDone) {
                console.log("The user finished the animation.");
                setUserIsDone(true);
            }
        }
        else {
            console.log(memberArray.filter(e=> !animationComplete.includes(e)));
        }
    }

    const handleGetError = (error: AxiosError) => {
        if (error.response) {
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
    };

    async function getMemberArray() {
        //get a member's progress on the exploring animation
        await axios.get<Member>(port, {params: {_id: id, animationCategory: "nervous", animationName: "ans"}})
            .then(handleMemberGetResponse)
            .catch(handleGetError);
    }

    const handleMemberPostResponse = (response: AxiosResponse<Member>) => {
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
        if (userClicked === "") {
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
        if (obj[1].name !== null && obj[1].name !== "backGround") {
            getMemberArray();
            axios.post<Member>(port, {
                _id: id,
                animationCategory: "nervous",
                animationName: "ans",
                action: obj[1].name,
                animationComplete: animationComplete
            }, {headers: {'Content-Type': 'application/json'}})
                .then(handleMemberPostResponse)
                .catch(handlePostError);
        }
    }

    if (sessionStorage.getItem("id")) {
        //only set event listener if the page viewer is a member
        if (!(animationObject?.hasEventListener('click'))) {
            console.log("Adding event listener.");
            animationObject?.addEventListener('click', handleClick);
        }
    }
    return (
        <div style={{maxHeight: '65vh', maxWidth: '50vw', margin:'auto'}}>
            <AnimateCC
                getAnimationObject={getAnimationObject}
                animationName="autonomicnervoussystemnewjs"
            />
            {userIsDone &&
            <Message content='Congratulations! You completed this animation.' color='green'/>
            }
        </div>
    );
};

export default AutonomicNervousSystem;