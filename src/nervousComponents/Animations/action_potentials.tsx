import * as React from "react";
import { useState } from "react";

import AnimateCC, { GetAnimationObjectParameter } from "react-adobe-animate";

const ActionPotentials = () => {
    const [paused, setPaused] = useState(false);
    const [animationObject, getAnimationObject] = useState<GetAnimationObjectParameter|null>(null);
    console.log(animationObject);
    return (
        <div>
            <AnimateCC
                getAnimationObject={getAnimationObject}
                animationName="actionpotential"
            />
        </div>
    );
};

export default ActionPotentials;