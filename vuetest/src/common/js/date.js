export function formatDate(date, fmt) {
	if(/(y+)/.test(fmt)) { //若yyyy匹配fmt内的字符串匹配成功,则执行
		fmt = fmt.replace(RegExp.$1 ,date.getFullYear() + '')
	}

	 let o = {
	 	'M+': date.getMonth() + 1,
	 	'd+': date.getDate(),
	 	'h+': date.getHours(),
	 	'm+': date.getMinutes(),
	 	's+': date.getSeconds()
 	};

	 for (let k in o) {
	 	if(new RegExp(`(${k})`).test(fmt)) {
	 		let str = o[k] + '';
	 		fmt = fmt.replace(RegExp.$1, (RegExp.$1.length===1)?str : padLeftZero(str));
	 	}
	 }
	 return fmt
};

function padLeftZero(str) {
	return ('00' + str).substr(str.length);
}