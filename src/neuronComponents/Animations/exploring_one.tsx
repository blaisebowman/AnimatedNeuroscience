import * as React from "react";
import { useState } from "react";

import AnimateCC, { GetAnimationObjectParameter } from "react-adobe-animate";

const App2 = () => {
    const [animationObject, getAnimationObject] = useState<GetAnimationObjectParameter|null>(null);
    console.log(animationObject);
    return (
        <div style={{maxHeight: '65vh', maxWidth: '60vw', margin:'auto'}}>
            <AnimateCC
                getAnimationObject={getAnimationObject}
                animationName="exploring"
            />
        </div>
    );
};

export default App2;