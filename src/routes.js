import React from 'react';
import Configuration from "./views/ImportFiles/Configuration";


const About = React.lazy(() => import('./views/Pages/About'));
const LogInPage = React.lazy(() => import('./login/LogInPage'));
const HouseMonitoring = React.lazy(() => import('./views/House/HouseMonitoring/HouseMonitoring'));
const RoomMonitoring = React.lazy(() => import('./views/Room/RoomMonitoring/RoomMonitoring'));
const RoomConfiguration = React.lazy(() => import('./views/Room/RoomConfiguration/RoomConfiguration'));
const HouseConfiguration = React.lazy(() => import('./views/House/HouseConfiguration/HouseConfiguration'));
const EnergyGrid = React.lazy(() => import('./views/EnergyGrid/EnergyGrid'));
const Area = React.lazy(() => import('./views/GeographicArea/Area'));
const Sensor = React.lazy(() => import('./views/Sensor/SensorMenu'));
const PleaseLogin = React.lazy(() => import('./views/Pages/PleaseLogin'));
const TheTeam = React.lazy(() => import('./views/TheTeam'));
const UnderMaintenance = React.lazy(() => import('./views/UnderMaintenance'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  {path: '/', exact: true, name: 'House'},
  {path: '/login', name: 'Login', component: LogInPage},
  {path: '/area', name: 'Area', component: Area},
  {path: '/house/monitoring', name: 'House Monitoring', component: HouseMonitoring},
  {path: '/room/monitoring', name: 'Room Monitoring', component: RoomMonitoring},
  {path: '/room/configuration', name: 'Room Configuration', component: RoomConfiguration},
  {path: '/house/configuration', name: 'House Configuration', component: HouseConfiguration},
  {path: '/energy', name: 'Energy', component: EnergyGrid},
  {path: '/sensor', name: 'Sensor', component: Sensor},
  {path: '/maintenance', name: 'UnderMaintenance', component: UnderMaintenance},
  {path: '/team', name: 'The Team', component: TheTeam},
  //Pages
  {path: '/about', name: 'About', component: About},
  {path: '/pleaseLogIn', name: 'PleaseLogin', component: PleaseLogin},
  {path: '/configuration', name: 'Configuration', component: Configuration}
];

export default routes;
