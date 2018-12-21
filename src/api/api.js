import axios from 'axios';
import cookie from 'js-cookie/src/js.cookie'
const SERVICE_URL = "https://s3.iidingyun.com/api/get_service_to_json.vm";
export const SITEID = SITEID_2;//73393 73413

axios.defaults.headers.Authorization = cookie.get('Authorization');
if (window.MicroserviceEnv) {
    axios.defaults.headers.Env = MicroserviceEnv;
}

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

export const upload = {
    chooseImg: function (obj, fnSuccess) {
        var _this = this;
        //创建读取文件的对象  
        //为文件读取成功设置事件  
        for (var i = 0; i < obj.files.length; i++) {
            var file = obj.files[i];
            var reader = new FileReader();
            reader.name = file.name;
            reader.onload = function (e) {
                //创建文件读取相关的变量  
                _this.uploadImg(e.target.result, e.target.name, fnSuccess);
            };
            //正式读取文件  
            reader.readAsDataURL(file);
        }
    },
    uploadImg: function (rst, name, fnSuccess) {
        var params = {
            fileData: rst,
            fileName: name
        }
        var url = 'com.iiding.orders.upload_receiveable_attach';
        request(url, params, res => {
            if (res.code == 'success') {
                fnSuccess(res.url.code);
            } else {
                alert("图片上传失败");
            }
        })

    }

}

