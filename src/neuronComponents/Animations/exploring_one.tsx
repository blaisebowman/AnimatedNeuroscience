import * as React from "react";
import { useState } from "react";

import AnimateCC, { GetAnimationObjectParameter } from "react-adobe-animate";

const App2 = () => {
    const [paused, setPaused] = useState(false);
    const [animationObject, getAnimationObject] = useState<GetAnimationObjectParameter|null>(null);
    console.log(animationObject);
    return (
        <div>
            <AnimateCC
                getAnimationObject={getAnimationObject}
                animationName="exploring"
            />
        </div>
    );
};

export default App2;