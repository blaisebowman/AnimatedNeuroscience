import * as React from "react";
import { useState } from "react";

import AnimateCC, { GetAnimationObjectParameter } from "react-adobe-animate";

const OlfactorySystem = () => {
    const [animationObject, getAnimationObject] = useState<GetAnimationObjectParameter|null>(null);
    return (
        <div style={{maxHeight: '65vh', maxWidth: '70vw', margin:'auto'}}>
            <AnimateCC
                getAnimationObject={getAnimationObject}
                animationName="olfactory_js"
            />
        </div>
    );
};

export default OlfactorySystem;