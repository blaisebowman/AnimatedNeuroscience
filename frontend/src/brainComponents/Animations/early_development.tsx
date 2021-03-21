import * as React from "react";
import { useState } from "react";

import AnimateCC, { GetAnimationObjectParameter } from "react-adobe-animate";

const EarlyBrain = () => {
    const [animationObject, getAnimationObject] = useState<GetAnimationObjectParameter|null>(null);
    console.log(animationObject);
    return (
        <div style={{maxHeight: '65vh', maxWidth: '70vw', margin:'auto'}}>
            <AnimateCC
                getAnimationObject={getAnimationObject}
                animationName="earlyDevelopment_js"
            />
        </div>
    );
};

export default EarlyBrain;