import './App.css';
import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, withRouter, Redirect} from "react-router-dom";
/*import EntryPage from "./components/Entry";*/ //import only if using the entry page, which you are not, as of now
import Introduction from "./components/Introduction";
import Neurons from "./components/Neurons";
import ExploringPage from "./neuronComponents/Exploring";
import ProteinPage from "./neuronComponents/Protein";
import CellularPage from "./neuronComponents/Cellular";
import Cerebellum from "./components/Cerebellum";
import MicrocircuitryPage from "./cerebellumComponents/MicroCircuitry";
import PathwaysPage from "./cerebellumComponents/Pathways";
import GliasAndSynapses from "./components/GliasAndSynapses";
import AstrocytePage from "./gliasComponents/Astrocyte";
import OligodendrogliaPage from "./gliasComponents/Oligodendroglia";
import ChemicalSynapsesPage from "./gliasComponents/ChemicalSynapses";
import CNSSynapsesPage from "./gliasComponents/CNSSynapses";
import NervousSystem from "./components/NervousSystem";
import ActionPotentialsPage from "./nervousComponents/ActionPotentials";
import AutonomicNervousSystemPage from "./nervousComponents/AutonomicNervousSystem";
import HypothalamusPage from "./nervousComponents/Hypothalamus";
import SensorySystems from "./components/SensorySystems";
import PainPerceptionPage from "./sensoryComponents/PainPerception";
import TheAuditorySystemPage from "./sensoryComponents/TheAuditorySystem";
import TheOlfactorySystemPage from "./sensoryComponents/TheOlfactorySystem";
import TheVisualSystemPage from "./sensoryComponents/TheVisualSystem";
import TheBrain from "./components/TheBrain";
import EarlyBrainDevelopmentPage from "./brainComponents/EarlyBrainDevelopment";
import LobesOfTheBrainPage from "./brainComponents/LobesOfTheBrain";
import NeuralTubePage from "./brainComponents/NeuralTube";
import StructureAndFunctionPage from "./brainComponents/StructureAndFunction";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import PageHeader from "./components/PageHeader";
import NavigationBar from "./components/NavigationBar";

class App extends Component {
  render () {
    return (
        <Router>
            <PageHeader/>
            <NavigationBar/>
            <Switch>
                {/*<Route exact path='/' component={withRouter(EntryPage)}/>*/}
                {/*<Route exact path='/introduction' component={withRouter(Introduction)}/*/}
                {/*Uncomment the two lines above, and comment out two immediate routes below if using the introduction page*/}
                <Route exact path='/' component ={withRouter(Introduction)}>
                    <Redirect to="/introduction" component={withRouter(Introduction)}/>
                </Route>
                <Route exact path='/introduction' component={withRouter(Introduction)}/>
                <Route exact path='/neurons' component={withRouter(Neurons)}/>
                <Route exact path='/neurons-exploring' component={withRouter(ExploringPage)}/>
                <Route exact path='/neurons-protein' component={withRouter(ProteinPage)}/>
                <Route exact path='/neurons-cellular' component={withRouter(CellularPage)}/>
                <Route exact path='/gliasandsynapses' component={withRouter(GliasAndSynapses)}/>
                <Route exact path='/gliasandsynapses-astrocyte' component={withRouter(AstrocytePage)}/>
                <Route exact path='/gliasandsynapses-oligodendroglia' component={withRouter(OligodendrogliaPage)}/>
                <Route exact path='/gliasandsynapses-chemical' component={withRouter(ChemicalSynapsesPage)}/>
                <Route exact path='/gliasandsynapses-cns' component={withRouter(CNSSynapsesPage)}/>
                <Route exact path='/thebrain' component={withRouter(TheBrain)}/>
                <Route exact path='/thebrain-neuraltube' component={withRouter(NeuralTubePage)}/>
                <Route exact path='/thebrain-earlydevelopment' component={withRouter(EarlyBrainDevelopmentPage)}/>
                <Route exact path='/thebrain-lobes' component={withRouter(LobesOfTheBrainPage)}/>
                <Route exact path='/thebrain-structure' component={withRouter(StructureAndFunctionPage)}/>
                <Route exact path='/sensorysystems' component={withRouter(SensorySystems)}/>
                <Route exact path='/sensorysystems-visual' component={withRouter(TheVisualSystemPage)}/>
                <Route exact path='/sensorysystems-auditory' component={withRouter(TheAuditorySystemPage)}/>
                <Route exact path='/sensorysystems-olfactory' component={withRouter(TheOlfactorySystemPage)}/>
                <Route exact path='/sensorysystems-pain' component={withRouter(PainPerceptionPage)}/>
                <Route exact path='/cerebellum' component={withRouter(Cerebellum)}/>
                <Route exact path='/cerebellum-microcircuitry' component={withRouter(MicrocircuitryPage)}/>
                <Route exact path='/cerebellum-pathways' component={withRouter(PathwaysPage)}/>
                <Route exact path='/nervoussystem' component={withRouter(NervousSystem)}/>
                <Route exact path='/nervoussystem-autonomic' component={withRouter(AutonomicNervousSystemPage)}/>
                <Route exact path='/nervoussystem-actionpotentials' component={withRouter(ActionPotentialsPage)}/>
                <Route exact path='/nervoussystem-hypothalamus' component={withRouter(HypothalamusPage)}/>
                <Route exact path='/register' component={withRouter(RegisterPage)}/>
                <Route exact path='/login' component={withRouter(LoginPage)}/>
            </Switch>
        </Router>
    );
  }
}

export default App;
