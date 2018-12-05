import axios from 'axios';
const SERVICE_URL = "https://s3.iidingyun.com/api/get_service_to_json.vm";
const SITEID = '73413';

export const request = (serviceName, para = {}, cb) => {
    let serviceUrlNow = '';
    para.siteid = SITEID;
    if (!serviceDataAll || serviceDataAll.length == 0) {
        axios
            .get(SERVICE_URL)
            .then((response) => {
                // handle success
                serviceDataAll = response.data;

                serviceDataAll.forEach(v => {
                    if (v.service_name == serviceName) {
                        serviceUrlNow = v.service_path;
                    }

                })

                axios.post(serviceUrlNow, para).then(res => { cb(res.data) });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    } else {
        serviceDataAll.forEach(v => {
            if (v.service_name == serviceName) {
                serviceUrlNow = v.service_path;
            }

        })
        axios.post(serviceUrlNow, para).then(res => { cb(res.data) });
    }
}