import Config from '../config';
import Axios from 'axios';

export default Axios.create(Config.api);
