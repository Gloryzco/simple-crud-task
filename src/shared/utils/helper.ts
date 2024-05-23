import config from "../../core/config/config";
import moment from "moment-timezone";

const dateCreated = (): Date => {
    moment.tz.setDefault(config.app_timezone);
    const currentTime = moment();
    const createdAt: Date = new Date(currentTime.format('YYYY-MM-DD HH:mm:ss'));
  
    return createdAt;
  };

export default dateCreated;