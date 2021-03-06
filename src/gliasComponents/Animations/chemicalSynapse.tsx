import * as React from "react";
import { useState } from "react";

import AnimateCC, { GetAnimationObjectParameter } from "react-adobe-animate";

const ChemicalSynapse = () => {
    const [animationObject, getAnimationObject] = useState<GetAnimationObjectParameter|null>(null);
    console.log(animationObject);
    return (
        <div>
            <AnimateCC
                getAnimationObject={getAnimationObject}
                animationName="ChemicalSynapse"
            />
        </div>
    );
};

export default ChemicalSynapse;