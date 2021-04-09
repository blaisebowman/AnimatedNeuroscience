import React, {useState} from 'react';
import {Link, withRouter} from "react-router-dom";
import {Dropdown, Icon} from 'semantic-ui-react';
import PropTypes from "prop-types";
import {CustomNavigationMenu, CustomNavigationMenuItem, CustomSegment, CustomNavigationMenuItemLink, DDItem, CustomDivider, CustomHeader,MobileDropdown} from "../styledComponents";
import '../navbar.css';

function NavigationBar (props) {
    const [neuronMenuShown, setNeuronMenuShown] = useState(false);
    const [gliasMenuShown, setGliasMenuShown] = useState(false);
    const [brainMenuShown, setBrainMenuShown] = useState(false);
    const [sensoryMenuShown, setSensoryMenuShown] = useState(false);
    const [cerebellumMenuShown, setCerebellumMenuShown] = useState(false);
    const [nervousMenuShown, setNervousMenuShown] = useState(false);

    if(process.env.NODE_ENV === 'production'){
        console.log("In production mode. Disable log statements -> hide log statements from console.");
        console.log = function (){};
    }

    let activeTab = "";
    if (window.location.href.lastIndexOf('-') > window.location.href.lastIndexOf('/')) {
        //is on an animation page
        activeTab = window.location.href.substring(window.location.href.lastIndexOf('/'), window.location.href.lastIndexOf('-'));
        console.log(activeTab);
    } else {
        //is on a cateogry page
        activeTab = window.location.href.substring(window.location.href.lastIndexOf('/'));
    }

    /*DETERMINE IF MOBILE VIEW -> In the future, rewrite in React-Native, then use react-native-web to convert.
    Due to mobile optimization being out of the scope of the project until much later in the development cycle,
    this is a workaround.*/
    //TODO -> BEFORE ANY PUSH TO REPO -> ENSURE THE FOLLOWING 3 LINES ARE COMMENTED (FOR NOW)
    /*navigator.__defineGetter__('userAgent', function () {
        //ANDROID
        return "Mozilla/5.0 (Linux; Android 11) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.105 Mobile Safari/537.36"
        //iPhone
        /!*
        return "Mozilla/5.0 (iPhone; CPU iPhone OS 14_4_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/87.0.4280.163 Mobile/15E148 Safari/604.1"
        *!/
    });*/
    let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    console.log(navigator.userAgent);
    if (isMobile) {
        console.log("You are on a mobile device.");
    } else {
        console.log("You are on a web browser");
    }
    sessionStorage.setItem("isMobile", isMobile.toString());


    if (isMobile === false) {
        return (
            <CustomSegment>
                <CustomNavigationMenu>
                    <CustomNavigationMenuItemLink active={activeTab === "/introduction"}>
                        <Dropdown as={Link} placeholder='Introduction' to="/introduction"
                                  fluid simple icon='home' style={{color: "white"}}/>
                    </CustomNavigationMenuItemLink>
                    <CustomNavigationMenuItem active={activeTab === "/neurons"}>
                        <Dropdown as={Link} to="/neurons" placeholder="Neurons" fluid simple open={neuronMenuShown}>
                            <Dropdown.Menu>
                                <DDItem>
                                    <Icon name='star'/>
                                    <Link to={{pathname: "/neurons"}}>Overview</Link>
                                </DDItem>
                                <CustomDivider/>
                                <CustomHeader>Animated Lessons</CustomHeader>
                                <CustomDivider/>
                                <DDItem>
                                    <Link to={{pathname: "/neurons-exploring"}}>Exploring the Neuron</Link>
                                    <Icon name='angle right' className='navBarIcon'/>
                                </DDItem>
                                <DDItem>
                                    <Link to={{pathname: "/neurons-protein"}}>Protein Synthesis</Link>
                                    <Icon name='angle right' className='navBarIcon'/>
                                </DDItem>
                                <DDItem>
                                    <Link to={{pathname: "/neurons-cellular"}}>Cellular Respiration</Link>
                                    <Icon name='angle right' className='navBarIcon'/>
                                </DDItem>
                            </Dropdown.Menu>
                        </Dropdown>
                    </CustomNavigationMenuItem>
                    <CustomNavigationMenuItem active={activeTab === "/gliasandsynapses"}>
                        <Dropdown as={Link} to="/gliasandsynapses" placeholder="Glias and Synapses" fluid simple
                                  open={gliasMenuShown}>
                            <Dropdown.Menu>
                                <DDItem>
                                    <Icon name='star'/>
                                    <Link to={{pathname: "/gliasandsynapses"}}>Overview</Link>
                                </DDItem>
                                <CustomDivider/>
                                <CustomHeader>Animated Lessons</CustomHeader>
                                <CustomDivider/>
                                <DDItem>
                                    <Link to={{pathname: "/gliasandsynapses-astrocyte"}}>Astrocyte</Link>
                                    <Icon name='angle right' className='navBarIcon'/>
                                </DDItem>
                                <DDItem>
                                    <Link to={{pathname: "/gliasandsynapses-oligodendroglia"}}>Oligodendroglia</Link>
                                    <Icon name='angle right' className='navBarIcon'/></DDItem>
                                <DDItem>
                                    <Link to={{pathname: "/gliasandsynapses-chemical"}}>Chemical Synapses</Link>
                                    <Icon name='angle right' className='navBarIcon'/>
                                </DDItem>
                                <DDItem>
                                    <Link to={{pathname: "/gliasandsynapses-cns"}}>CNS Synapses</Link>
                                    <Icon name='angle right' className='navBarIcon'/>
                                </DDItem>
                            </Dropdown.Menu>
                        </Dropdown>

                    </CustomNavigationMenuItem>
                    <CustomNavigationMenuItem active={activeTab === "/thebrain"}>
                        <Dropdown as={Link} to="/thebrain" placeholder="The Brain" fluid simple
                                  open={brainMenuShown}>
                            <Dropdown.Menu>
                                <DDItem><Icon name='star'/><Link to={{pathname: "/thebrain"}}>Overview</Link></DDItem>
                                <CustomDivider/>
                                <CustomHeader>Animated Lessons</CustomHeader>
                                <CustomDivider/>
                                <DDItem>
                                    <Link to={{pathname: "/thebrain-neuraltube"}}>Neural Tube</Link><Icon
                                    name='angle right' className='navBarIcon'/>
                                </DDItem>
                                <DDItem>
                                    <Link to={{pathname: "/thebrain-earlydevelopment"}}>Early Brain Development</Link>
                                    <Icon name='angle right' className='navBarIcon'/></DDItem>
                                <DDItem>
                                    <Link to={{pathname: "/thebrain-lobes"}}>Lobes of the Brain</Link>
                                    <Icon name='angle right' className='navBarIcon'/>
                                </DDItem>
                                <DDItem>
                                    <Link to={{pathname: "/thebrain-structure"}}>Structure and Function</Link>
                                    <Icon name='angle right' className='navBarIcon'/></DDItem>
                            </Dropdown.Menu>
                        </Dropdown>
                    </CustomNavigationMenuItem>

                    <CustomNavigationMenuItem active={activeTab === "/sensorysystems"}>
                        <Dropdown as={Link} to="/sensorysystems" placeholder="Sensory Systems" fluid simple
                                  open={sensoryMenuShown}>
                            <Dropdown.Menu>
                                <DDItem>
                                    <Icon name='star'/>
                                    <Link to={{pathname: "/sensorysystems"}}>Overview</Link>
                                </DDItem>
                                <CustomDivider/>
                                <CustomHeader>Animated Lessons</CustomHeader>
                                <CustomDivider/>
                                <DDItem>
                                    <Link to={{pathname: "/sensorysystems-visual"}}>The Visual System</Link>
                                    <Icon name='angle right' className='navBarIcon'/>
                                </DDItem>
                                <DDItem>
                                    <Link to={{pathname: "/sensorysystems-auditory"}}>The Auditory System</Link>
                                    <Icon name='angle right' className='navBarIcon'/>
                                </DDItem>
                                <DDItem>
                                    <Link to={{pathname: "/sensorysystems-olfactory"}}>The Olfactory System</Link>
                                    <Icon name='angle right' className='navBarIcon'/>
                                </DDItem>
                                <DDItem>
                                    <Link to={{pathname: "/sensorysystems-pain"}}>Pain Perception</Link>
                                    <Icon name='angle right' className='navBarIcon'/>
                                </DDItem>
                            </Dropdown.Menu>
                        </Dropdown>
                    </CustomNavigationMenuItem>
                    <CustomNavigationMenuItem active={activeTab === "/cerebellum"}>
                        <Dropdown as={Link} to="/cerebellum" placeholder="Cerebellum" fluid simple
                                  open={cerebellumMenuShown}
                        >
                            <Dropdown.Menu>
                                <DDItem>
                                    <Icon name='star'/>
                                    <Link to={{pathname: "/cerebellum"}}>Overview</Link>
                                </DDItem>
                                <CustomDivider/>
                                <CustomHeader>Animated Lessons</CustomHeader>
                                <CustomDivider/>
                                <DDItem>
                                    <Link to={{pathname: "/cerebellum-microcircuitry"}}>Micro-circuitry</Link>
                                    <Icon name='angle right' className='navBarIcon'/>
                                </DDItem>
                                <DDItem>
                                    <Link to={{pathname: "/cerebellum-pathways"}}>Pathways</Link>
                                    <Icon name='angle right' className='navBarIcon'/>
                                </DDItem>
                            </Dropdown.Menu>
                        </Dropdown>
                    </CustomNavigationMenuItem>
                    <CustomNavigationMenuItem active={activeTab === "/nervoussystem"}>
                        <Dropdown as={Link} to="/nervoussystem" placeholder="Nervous System" fluid simple
                                  open={nervousMenuShown}>
                            <Dropdown.Menu>
                                <DDItem>
                                    <Icon name='star'/>
                                    <Link to={{pathname: "/nervoussystem"}}>Overview</Link>
                                </DDItem>
                                <CustomDivider/>
                                <CustomHeader>Animated Lessons</CustomHeader>
                                <CustomDivider/>
                                <DDItem>
                                    <Link to={{pathname: "/nervoussystem-autonomic"}}>ANS</Link>
                                    <Icon name='angle right' className='navBarIcon'/>
                                </DDItem>
                                <DDItem>
                                    <Link to={{pathname: "/nervoussystem-actionpotentials"}}>Action Potentials</Link>
                                    <Icon name='angle right' className='navBarIcon'/>
                                </DDItem>
                                <DDItem>
                                    <Link to={{pathname: "/nervoussystem-hypothalamus"}}>Hypothalamus</Link>
                                    <Icon name='angle right' className='navBarIcon'/>
                                </DDItem>
                            </Dropdown.Menu>
                        </Dropdown>
                    </CustomNavigationMenuItem>
                </CustomNavigationMenu>
            </CustomSegment>
        );
    }
    else {
        return (
                <MobileDropdown fluid placeholder="Select a Category">
                    <Dropdown.Menu>
                        <DDItem>
                            <Icon name='star'/>
                            <Link to={{pathname: "/introduction"}}>Introduction</Link>
                        </DDItem>
                        <DDItem>
                            <Icon name='star'/>
                            <Link to={{pathname: "/neurons"}}>Neurons</Link>
                        </DDItem>
                        <DDItem>
                            <Icon name='star'/>
                            <Link to={{pathname: "/gliasandsynapses"}}>Glias and Synapses</Link>
                        </DDItem><DDItem>
                            <Icon name='star'/>
                            <Link to={{pathname: "/thebrain"}}>The Brain</Link>
                        </DDItem><DDItem>
                            <Icon name='star'/>
                            <Link to={{pathname: "/sensorysystems"}}>Sensory Systems</Link>
                        </DDItem><DDItem>
                            <Icon name='star'/>
                            <Link to={{pathname: "/cerebellum"}}>Cerebellum</Link>
                        </DDItem><DDItem>
                            <Icon name='star'/>
                            <Link to={{pathname: "/nervoussystem"}}>Nervous System</Link>
                        </DDItem>
                    </Dropdown.Menu>
                </MobileDropdown>
        );
    }
}

const { string, object } = PropTypes
    NavigationBar.propTypes = {
    history: object
}

export default withRouter(NavigationBar)