import {combineReducers} from 'redux';

import Reducer002 from "./views/GeographicArea/US002/Reducers002";
import Reducers003 from "./views/GeographicArea/US003/Reducers003";
import Reducers004 from "./views/GeographicArea/US004/Reducers004";
import Reducers005 from "./views/Sensor/US005/Reducers005";
import Reducers006 from "./views/GeographicArea/US006Redux/Reducers006";
import Reducers007 from "./views/GeographicArea/US007Redux/Reducers007";
import Reducers105 from './views/House/HouseConfiguration/US105/Reducers105.js';
import Reducers101 from "./views/House/HouseConfiguration/US101Redux/Reducers101.js";
import Reducer108 from './views/House/HouseConfiguration/US108/Reducers108.js';
import Reducers600 from './views/House/HouseMonitoring/USRedux/US600Redux/Reducers600.js';
import Reducers605 from './views/Room/RoomMonitoring/US605/US605Redux/Reducers605.js';
import Reducers253 from './views/Room/RoomConfiguration/US253/Reducers253.js';
import Reducers620 from './views/House/HouseMonitoring/USRedux/US620Redux/Reducers620.js';
import Reducers630 from './views/House/HouseMonitoring/USRedux/US630Redux/Reducers630.js';
import Reducers631 from './views/House/HouseMonitoring/USRedux/US631Redux/Reducers631.js';
import Reducers623 from './views/House/HouseMonitoring/USRedux/US623Redux/Reducers623.js';
import Reducers147 from './views/EnergyGrid/US147/Reducers147';
import Reducers633 from './views/House/HouseMonitoring/USRedux/US633Redux/Reducers633.js';
import Reducer005extra from './views/Sensor/US005Extra/Reducers005extra'
import ReducersUserRole from "./user/ReducersUserRole";
import ReducersGetRoomsNotInGrid from './views/EnergyGrid/US147/ReducersGetRoomsNotInGrid'
import ReducersImportGA from "./views/ImportFiles/importGA/ReducersImportGA";
import ReducersAreaReadings from "./views/ImportFiles/importAreaReadings/ReducersAreaReadings";
import ReducersImportHouse from "./views/ImportFiles/importHouse/ReducersImportHouse";
import ReducersHouseSensors from "./views/ImportFiles/importHouseSensors/ReducersHouseSensors";
import ReducersHouseReadings from "./views/ImportFiles/importHouseReadings/ReducersHouseReadings";

export default combineReducers({

  Reducer002,
  Reducers003,
  Reducers004,
  Reducers005,
  Reducers006,
  Reducers007,
  Reducers101,
  Reducers105,
  Reducer108,
  Reducers600,
  Reducers147,
  Reducers253,
  Reducers605,
  Reducers620,
  Reducers623,
  Reducers630,
  Reducers631,
  Reducers633,
  Reducer005extra,
  ReducersUserRole,
  ReducersImportGA,
  ReducersAreaReadings,
  ReducersImportHouse,
  ReducersHouseSensors,
  ReducersHouseReadings,

  ReducersGetRoomsNotInGrid,
})
