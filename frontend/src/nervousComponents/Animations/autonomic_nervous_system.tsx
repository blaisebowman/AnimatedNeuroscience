import * as React from "react";
import { useState } from "react";

import AnimateCC, { GetAnimationObjectParameter } from "react-adobe-animate";

const AutonomicNervousSystem = () => {
    const [paused, setPaused] = useState(false);
    const [animationObject, getAnimationObject] = useState<GetAnimationObjectParameter|null>(null);
    console.log(animationObject);
    return (
        <div style={{maxHeight: '65vh', maxWidth: '50vw', margin:'auto'}}>
            <AnimateCC
                getAnimationObject={getAnimationObject}
                animationName="autonomicnervoussystemnewjs"
            />
        </div>
    );
};

export default AutonomicNervousSystem;