<template>
  <div class="star" :class="starType">
  	<span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  </div>
</template>

<script>
//常量定义在export default之外
	const LENGTH = 5;

 	//以后改变 on half off 时,不必改动代码 而只需改变这些常量3
 	const CLS_ON = 'on';
 	const CLS_HALF = 'half';
 	const CLS_OFF = 'off';

 export default {
 	props :{
 		size: {
 			type: Number //接受24 36 48 三种尺寸 通过html的:type动态获取
 		},
 		score:{
 			type: Number
 		}
 	},
 	computed :{
 		starType(){
 			return 'star-' + this.size;
 		},
 		itemClasses() {
 			let result = [];
 			let score = Math.floor(this.score *2) /2 ; //向下取整
 			let hasDecimal = score % 1 !==0;
 			let interger = Math.floor(score); //判断有多少个全星,因为score还是有可能有小数


 			for(let i = 0; i <interger; i++){
 				result.push(CLS_ON)
 			}
 			if(hasDecimal) {
 				result.push(CLS_HALF);
 			}
 			while (result.length< LENGTH){
 				result.push(CLS_OFF);
 			}
 			return result;
 		}
 	}
 };
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
	.star
		font-size: 0
		.star-item
			display: inline-block;
			background-repeat: no-repeat;		
		&.star-48
			.star-item
				width: 20px
				height: 20px
				margin-right: 22px
				background-size: 20px 20px
				&:last-child
					margin-right: 0
				&.on
					bg-image('star48_on')
				&.half
					bg-image('star48_half')
				&.off
					bg-image('star48_off')
		&.star-36
			.star-item
				width: 15px
				height: 15px
				margin-right: 6px
				background-size: 15px 15px
				&:last-child
					margin-right: 0
				&.on
					bg-image('star36_on')
				&.half
					bg-image('star36_half')
				&.off
					bg-image('star36_off')
		&.star-24
			.star-item
				width: 10px
				height: 10px
				margin-right: 3px
				background-size: 10px 10px
				&:last-child
					margin-right: 0
				&.on
					bg-image('star24_on')
				&.half
					bg-image('star24_half')
				&.off
					bg-image('star24_off')
		
			
</style>