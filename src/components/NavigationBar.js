import React, {Component, useCallback, useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import {Grid, Segment, Dropdown, Icon} from 'semantic-ui-react';
import '../navbar.css';


class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirecting: false,
            neuronMenuShown: false,
            gliasMenuShown: false,
            brainMenuShown: false,
            sensoryMenuShown: false,
            cerebellumMenuShown: false,
            nervousMenuShown: false,
            tabWidth: JSON.parse(localStorage.getItem('tabWidth')) || 0,
            tabHeight: JSON.parse(localStorage.getItem('toHeight')) || 0,
            fromLeft: JSON.parse(localStorage.getItem('tabLeft')) || 0,
            currentTab: JSON.parse(localStorage.getItem('toTab')) || "",
            prevTab: JSON.parse(localStorage.getItem('prevTab')) || "",
            animating: false,
        }
        this.tab0 = React.createRef();
        this.tab1 = React.createRef();
        this.tab2 = React.createRef();
        this.tab3 = React.createRef();
        this.tab4 = React.createRef();
        this.tab5 = React.createRef();
        this.tab6 = React.createRef();
    }

    tabClick = (currentTab) => (event) => {
        localStorage.setItem('tabWidth', JSON.stringify(this.state.tabWidth));
        localStorage.setItem('tabHeight', JSON.stringify(this.state.tabHeight));
        localStorage.setItem('tabLeft', JSON.stringify(this.state.fromLeft));
        if (this.state.currentTab !== currentTab) {
            console.log("CHANGING TABS");
            console.log(this.state.currentTab);
            console.log(this.state.prevTab);
            this.setState({prevTab: this.state.currentTab},
                () => {
                    localStorage.setItem('prevTab', JSON.stringify(this.state.currentTab));
                });
            this.setState({currentTab: currentTab}, () => {
                localStorage.setItem('toTab', JSON.stringify(currentTab));
            });
        }
        switch (currentTab) {
            case "introductionTab":
                this.setState({tabWidth: this.tab0.current.offsetParent.offsetWidth});
                this.setState({tabHeight: this.tab0.current.offsetParent.offsetHeight});
                this.setState({fromLeft: this.tab0.current.offsetParent.offsetLeft}, () => {
                    localStorage.setItem('tabLeft', JSON.stringify(this.state.fromLeft));
                });
                break;
            case "neuronTab":
                this.setState({tabWidth: this.tab1.current.offsetParent.offsetWidth});
                this.setState({tabHeight: this.tab1.current.offsetParent.offsetHeight});
                this.setState({fromLeft: this.tab1.current.offsetParent.offsetLeft}, () => {
                    localStorage.setItem('tabLeft', JSON.stringify(this.state.fromLeft));
                });
                break;
            case "gliasTab":
                this.setState({tabWidth: this.tab2.current.offsetParent.offsetWidth});
                this.setState({tabHeight: this.tab2.current.offsetParent.offsetHeight});
                this.setState({fromLeft: this.tab2.current.offsetParent.offsetLeft}, () => {
                    localStorage.setItem('tabLeft', JSON.stringify(this.state.fromLeft));
                });
                break;
            case "brainTab":
                this.setState({tabWidth: this.tab3.current.offsetParent.offsetWidth});
                this.setState({tabHeight: this.tab3.current.offsetParent.offsetHeight});
                this.setState({fromLeft: this.tab3.current.offsetParent.offsetLeft}, () => {
                    localStorage.setItem('tabLeft', JSON.stringify(this.state.fromLeft));
                });
                break;
            case "sensoryTab":
                this.setState({tabWidth: this.tab4.current.offsetParent.offsetWidth});
                this.setState({tabHeight: this.tab4.current.offsetParent.offsetHeight});
                this.setState({fromLeft: this.tab4.current.offsetParent.offsetLeft}, () => {
                    localStorage.setItem('tabLeft', JSON.stringify(this.state.fromLeft));
                });
                break;
            case "cerebellumTab":
                this.setState({tabWidth: this.tab5.current.offsetParent.offsetWidth});
                this.setState({tabHeight: this.tab5.current.offsetParent.offsetHeight});
                this.setState({fromLeft: this.tab5.current.offsetParent.offsetLeft}, () => {
                    localStorage.setItem('tabLeft', JSON.stringify(this.state.fromLeft));
                });
                break;
            case "nervousTab":
                this.setState({tabWidth: this.tab6.current.offsetParent.offsetWidth});
                this.setState({tabHeight: this.tab6.current.offsetParent.offsetHeight});
                this.setState({fromLeft: this.tab6.current.offsetParent.offsetLeft}, () => {
                    localStorage.setItem('tabLeft', JSON.stringify(this.state.fromLeft));
                });
                break;
            default:
                this.setState({tabWidth: this.tab0.current.offsetParent.offsetWidth});
                this.setState({tabHeight: this.tab0.current.offsetParent.offsetHeight});
                this.setState({fromLeft: this.tab0.current.offsetParent.offsetLeft});
        }
        console.log("TAB CLICK CALLED");
        console.log("000000");
        console.log(this.state.prevTab);
        console.log(this.state.currentTab);
        console.log(currentTab);
        console.log("000000");
    }
    resizePage = () => {
        switch (this.state.currentTab) {
            case "introductionTab":
                this.setState({tabWidth: this.tab0.current.offsetParent.offsetWidth});
                this.setState({tabHeight: this.tab0.current.offsetParent.offsetHeight});
                this.setState({fromLeft: this.tab0.current.offsetParent.offsetLeft});
                break;
            case "neuronTab":
                this.setState({tabWidth: this.tab1.current.offsetParent.offsetWidth});
                this.setState({tabHeight: this.tab1.current.offsetParent.offsetHeight});
                this.setState({fromLeft: this.tab1.current.offsetParent.offsetLeft});
                break;
            case "gliasTab":
                this.setState({tabWidth: this.tab2.current.offsetParent.offsetWidth});
                this.setState({tabHeight: this.tab2.current.offsetParent.offsetHeight});
                this.setState({fromLeft: this.tab2.current.offsetParent.offsetLeft});
                break;
            case "brainTab":
                this.setState({tabWidth: this.tab3.current.offsetParent.offsetWidth});
                this.setState({tabHeight: this.tab3.current.offsetParent.offsetHeight});
                this.setState({fromLeft: this.tab3.current.offsetParent.offsetLeft});
                break;
            case "sensoryTab":
                this.setState({tabWidth: this.tab4.current.offsetParent.offsetWidth});
                this.setState({tabHeight: this.tab4.current.offsetParent.offsetHeight});
                this.setState({fromLeft: this.tab4.current.offsetParent.offsetLeft});
                break;
            case "cerebellumTab":
                this.setState({tabWidth: this.tab5.current.offsetParent.offsetWidth});
                this.setState({tabHeight: this.tab5.current.offsetParent.offsetHeight});
                this.setState({fromLeft: this.tab5.current.offsetParent.offsetLeft});
                break;
            case "nervousTab":
                this.setState({tabWidth: this.tab6.current.offsetParent.offsetWidth});
                this.setState({tabHeight: this.tab6.current.offsetParent.offsetHeight});
                this.setState({fromLeft: this.tab6.current.offsetParent.offsetLeft});
                break;
            default:
                this.setState({tabWidth: this.tab0.current.offsetParent.offsetWidth});
                this.setState({tabHeight: this.tab0.current.offsetParent.offsetHeight});
                this.setState({fromLeft: this.tab0.current.offsetParent.offsetLeft});
        }

    }

    componentDidMount() {
        this.resizePage();
        window.addEventListener('resize', this.resizePage);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizePage);
    }

    render() {
        //Seperate elastic animations for main navigation bar (horizontal) and dropdowns (vertical)
        return (
            <Segment className="navWrapper">
                <Grid columns={7} textAlign='center' className='modGridNav' style={{maxWidth: '100vw'}}>
                    <Grid.Row verticalAlign='middle' className="navRow">
                        <div className='animate' style={{
                            left: this.state.fromLeft + "px",
                            height: this.state.tabHeight + "px !important",
                            width: this.state.tabWidth + "px",
                            position: 'absolute'
                        }}/>
                        <Grid.Column className="topRow">
                            <div ref={this.tab0} onClick={this.tabClick("introductionTab")}>
                                <Link to="/introduction" style={{color: "white"}}>Introduction <Icon
                                    name='home'/></Link>
                            </div>
                        </Grid.Column>
                        <Grid.Column className="topRow">
                            <div ref={this.tab1} onMouseEnter={() => this.setState({neuronMenuShown: true})}
                                 onMouseLeave={() => this.setState({neuronMenuShown: false})}>
                                <Dropdown as={Link} to="/neurons" placeholder="Neurons" fluid simple
                                          open={this.state.neuronMenuShown} onClick={this.tabClick("neuronTab")}>
                                    <Dropdown.Menu className="navDropMenu">
                                        <Dropdown.Item><Icon name='star'/><Link to={{pathname: "/neurons"}}
                                                                                className='navText'>Overview</Link></Dropdown.Item>
                                        <Dropdown.Divider className='navBarDivider'/>
                                        <Dropdown.Header className="navDropHeader">Animated Lessons</Dropdown.Header>
                                        <Dropdown.Divider className='navBarDivider'/>
                                        <Dropdown.Item><Link to={{pathname: "/neurons-exploring"}} className='navText'>Exploring
                                            the Neuron</Link><Icon name='angle right'
                                                                   className='navBarIcon'/></Dropdown.Item>
                                        <Dropdown.Item><Link to={{pathname: "/neurons-protein"}} className='navText'>Protein
                                            Synthesis</Link><Icon name='angle right'
                                                                  className='navBarIcon'/></Dropdown.Item>
                                        <Dropdown.Item><Link to={{pathname: "/neurons-cellular"}} className='navText'>Cellular
                                            Respiration</Link><Icon name='angle right'
                                                                    className='navBarIcon'/></Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Grid.Column>
                        <Grid.Column className="topRow">
                            <div ref={this.tab2} onMouseEnter={() => this.setState({gliasMenuShown: true})}
                                 onMouseLeave={() => this.setState({gliasMenuShown: false})}>
                                <Dropdown as={Link} to="/gliasandsynapses" placeholder="Glias and Synapses" fluid simple
                                          open={this.state.gliasMenuShown} onClick={this.tabClick("gliasTab")}>
                                    <Dropdown.Menu>
                                        <Dropdown.Item><Icon name='star'/><Link to={{pathname: "/gliasandsynapses"}}
                                                                                className='navText'>Overview</Link></Dropdown.Item>
                                        <Dropdown.Divider/>
                                        <Dropdown.Header className="navDropHeader">Animated Lessons</Dropdown.Header>
                                        <Dropdown.Divider/>
                                        <Dropdown.Item><Link to={{pathname: "/gliasandsynapses-astrocyte"}}
                                                             className='navText'>Astrocyte</Link><Icon
                                            name='angle right' className='navBarIcon'/></Dropdown.Item>
                                        <Dropdown.Item><Link to={{pathname: "/gliasandsynapses-oligodendroglia"}}
                                                             className='navText'>Oligodendroglia</Link><Icon
                                            name='angle right' className='navBarIcon'/></Dropdown.Item>
                                        <Dropdown.Item><Link to={{pathname: "/gliasandsynapses-chemical"}}
                                                             className='navText'>Chemical Synapses</Link><Icon
                                            name='angle right' className='navBarIcon'/></Dropdown.Item>
                                        <Dropdown.Item><Link to={{pathname: "/gliasandsynapses-cns"}}
                                                             className='navText'>CNS Synapses</Link><Icon
                                            name='angle right' className='navBarIcon'/></Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Grid.Column>
                        <Grid.Column className="topRow">
                            <div ref={this.tab3} onMouseEnter={() => this.setState({brainMenuShown: true})}
                                 onMouseLeave={() => this.setState({brainMenuShown: false})}>
                                <Dropdown as={Link} to="/thebrain" placeholder="The Brain" fluid simple
                                          open={this.state.brainMenuShown} onClick={this.tabClick("brainTab")}>
                                    <Dropdown.Menu>
                                        <Dropdown.Item><Icon name='star'/><Link to={{pathname: "/thebrain"}}
                                                                                className='navText'>Overview</Link></Dropdown.Item>
                                        <Dropdown.Divider/>
                                        <Dropdown.Header className="navDropHeader">Animated Lessons</Dropdown.Header>
                                        <Dropdown.Divider/>
                                        <Dropdown.Item><Link to={{pathname: "/thebrain-neuraltube"}}
                                                             className='navText'>Neural Tube</Link><Icon
                                            name='angle right' className='navBarIcon'/></Dropdown.Item>
                                        <Dropdown.Item><Link to={{pathname: "/thebrain-earlydevelopment"}}
                                                             className='navText'>Early Brain Development</Link><Icon
                                            name='angle right' className='navBarIcon'/></Dropdown.Item>
                                        <Dropdown.Item><Link to={{pathname: "/thebrain-lobes"}} className='navText'>Lobes
                                            of the Brain</Link><Icon name='angle right'
                                                                     className='navBarIcon'/></Dropdown.Item>
                                        <Dropdown.Item><Link to={{pathname: "/thebrain-structure"}} className='navText'>Structure
                                            and Function</Link><Icon name='angle right'
                                                                     className='navBarIcon'/></Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Grid.Column>
                        <Grid.Column className="topRow">
                            <div ref={this.tab4} onMouseEnter={() => this.setState({sensoryMenuShown: true})}
                                 onMouseLeave={() => this.setState({sensoryMenuShown: false})}>
                                <Dropdown as={Link} to="/sensorysystems" placeholder="Sensory Systems" fluid simple
                                          open={this.state.sensoryMenuShown} onClick={this.tabClick("sensoryTab")}>
                                    <Dropdown.Menu>
                                        <Dropdown.Item><Icon name='star'/><Link to={{pathname: "/sensorysystems"}}
                                                                                className='navText'>Overview</Link></Dropdown.Item>
                                        <Dropdown.Divider/>
                                        <Dropdown.Header className="navDropHeader">Animated Lessons</Dropdown.Header>
                                        <Dropdown.Divider/>
                                        <Dropdown.Item><Link to={{pathname: "/sensorysystems-visual"}}
                                                             className='navText'>The Visual System</Link><Icon
                                            name='angle right' className='navBarIcon'/></Dropdown.Item>
                                        <Dropdown.Item><Link to={{pathname: "/sensorysystems-auditory"}}
                                                             className='navText'>The Auditory System</Link><Icon
                                            name='angle right' className='navBarIcon'/></Dropdown.Item>
                                        <Dropdown.Item><Link to={{pathname: "/sensorysystems-olfactory"}}
                                                             className='navText'>The Olfactory System</Link><Icon
                                            name='angle right' className='navBarIcon'/></Dropdown.Item>
                                        <Dropdown.Item><Link to={{pathname: "/sensorysystems-pain"}}
                                                             className='navText'>Pain Perception</Link><Icon
                                            name='angle right' className='navBarIcon'/></Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Grid.Column>
                        <Grid.Column className="topRow">
                            <div ref={this.tab5} onMouseEnter={() => this.setState({cerebellumMenuShown: true})}
                                 onMouseLeave={() => this.setState({cerebellumMenuShown: false})}>
                                <Dropdown as={Link} to="/cerebellum" placeholder="Cerebellum" fluid simple
                                          open={this.state.cerebellumMenuShown}
                                          onClick={this.tabClick("cerebellumTab")}>
                                    <Dropdown.Menu>
                                        <Dropdown.Item><Icon name='star'/><Link to={{pathname: "/cerebellum"}}
                                                                                className='navText'>Overview</Link></Dropdown.Item>
                                        <Dropdown.Divider/>
                                        <Dropdown.Header className="navDropHeader">Animated Lessons</Dropdown.Header>
                                        <Dropdown.Divider/>
                                        <Dropdown.Item><Link to={{pathname: "/cerebellum-microcircuitry"}}
                                                             className='navText'>Micro-circuitry</Link><Icon
                                            name='angle right' className='navBarIcon'/></Dropdown.Item>
                                        <Dropdown.Item><Link to={{pathname: "/cerebellum-pathways"}}
                                                             className='navText'>Pathways</Link><Icon name='angle right'
                                                                                                      className='navBarIcon'/></Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Grid.Column>
                        <Grid.Column className="topRow">
                            <div ref={this.tab6} onMouseEnter={() => this.setState({nervousMenuShown: true})}
                                 onMouseLeave={() => this.setState({nervousMenuShown: false})}>
                                <Dropdown as={Link} to="/nervoussystem" placeholder="Nervous System" fluid simple
                                          open={this.state.nervousMenuShown} onClick={this.tabClick("nervousTab")}>
                                    <Dropdown.Menu>
                                        <Dropdown.Item><Icon name='star'/><Link to={{pathname: "/nervoussystem"}}
                                                                                className='navText'>Overview</Link></Dropdown.Item>
                                        <Dropdown.Divider/>
                                        <Dropdown.Header className="navDropHeader">Animated Lessons</Dropdown.Header>
                                        <Dropdown.Divider/>
                                        <Dropdown.Item><Link to={{pathname: "/nervoussystem-autonomic"}}
                                                             className='navText'>ANS</Link><Icon name='angle right'
                                                                                                 className='navBarIcon'/></Dropdown.Item>
                                        <Dropdown.Item><Link to={{pathname: "/nervoussystem-actionpotentials"}}
                                                             className='navText'>Action Potentials</Link><Icon
                                            name='angle right' className='navBarIcon'/></Dropdown.Item>
                                        <Dropdown.Item><Link to={{pathname: "/nervoussystem-hypothalamus"}}
                                                             className='navText'>Hypothalamus</Link><Icon
                                            name='angle right' className='navBarIcon'/></Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}


export default NavigationBar;