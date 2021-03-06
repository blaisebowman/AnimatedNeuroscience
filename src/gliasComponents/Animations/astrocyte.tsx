import * as React from "react";
import { useState } from "react";

import AnimateCC, { GetAnimationObjectParameter } from "react-adobe-animate";

const Astrocyte = () => {
    const [animationObject, getAnimationObject] = useState<GetAnimationObjectParameter|null>(null);
    console.log(animationObject);
    return (
        <div>
            <AnimateCC
                getAnimationObject={getAnimationObject}
                animationName="glias"
            />
        </div>
    );
};

export default Astrocyte;