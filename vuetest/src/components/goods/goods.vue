<template>
  <div class="goods">
  	<div class="menu-wrapper" ref="menuWrapper">
  		<ul>
  			<li v-for="(item, index) in goods" class="menu-item" :class="{current:currentIndex === index}" @click="selectMenu(index, $event)">
  				<span class="text border-1px">
  					<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
  				</span>
  			</li>
  		</ul>
  	</div>
  	<div class="foods-wrapper" ref="foodWrapper">
  		<ul>
  			<li v-for="item in goods" class="food-list food-list-hook">
  				<h1 class="title">{{item.name}}</h1>
  				<ul>
  					<li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item border-1px">
  						<div class="icon">
  							<img width="57px" height="57px":src="food.icon">
  						</div>
  						<div class="content">
  							<h2 class="name">{{food.name}}</h2>
  							<p class="desc">{{food.description}}</p>
  							<div class="extra">
  								<span class="count">月售{{food.sellCount}}份</span>
  								<span>好评率{{food.rating}}%</span>
  							</div>
  							<div class="price">
  								<span class="now">￥{{food.price}}</span>
  								<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
  							</div>
  							<div class="cartcontrol-wrapper">
  								<cartcontrol :food="food"></cartcontrol>
  							</div>
  						</div>
  					</li>
  				</ul>
  			</li>
  		</ul>
  	</div>
  	<shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
  	<food :food="selectedFood" ref="food"></food>
  </div>
</template>

<script>
 const ERR_OK= 0;
 import BScroll from 'better-scroll'
 import shopcart from 'components/shopcart/shopcart';
 import cartcontrol from 'components/cartcontrol/cartcontrol'
 import food from 'components/food/food';
 export default {
 	props:{
 		seller:{
 			type: Object
 		}
 	},
 	data() {
 		return {
 			goods: [],
 			listHeight: [],
 			scrollY: 0,
 			selectedFood: {}
 		}
 	},
 	computed: {
 		currentIndex() {
 			for(let i = 0; i < this.listHeight.length; i++){
 				let height1 = this.listHeight[i];
 				let height2 = this.listHeight[i + 1];
 				if(!height2 || (this.scrollY >= height1 && this.scrollY < height2 )){
 					return i;
 				}
 			}
 			return 0;
 		},
 		selectFoods() {
 			let foods = [];
 			this.goods.forEach((good) => {
 				good.foods.forEach((food) => {
 					if(food.count){
 						foods.push(food);
 					}
 				});
 			});
 			return foods;
 		}
 	},
 	created() {
		this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']; //顺序是data.json里的顺序

 		this.$http.get('/api/goods').then((res) =>{
 			res = res.body;
 			if(res.errno === ERR_OK){
 				this.goods = res.data;//res不是一个纯数组 他还有一个data包装 所以要res.data,才能获取到真正的goods数组
 				this.$nextTick(() =>{
 					this._initScroll();
 					this._calculateHeight();
 				});
 			}
 		});
 	},
 	methods: {
 		selectFood(food, $event) {
 			if(!event._constructed) {
 				return;
 			}
 			this.selectedFood = food;
 			this.$refs.food.show();
 		},
 		selectMenu(index, event) {
 			if(!event._constructed) {
 				return;
 			}
 			let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
 			let el = foodList[index];
 			this.foodsScroll.scrollToElement(el, 300);
 		},
 		_initScroll() {
 			this.menuScroll = new BScroll(this.$refs.menuWrapper, {
 				click: true
 			});

 			this.foodsScroll = new BScroll(this.$refs.foodWrapper, {
 				click: true,
 				probeType: 3//  可以让foodsScroll滚动时能实时获取下方的pos值!!不设置的话 不能实时获取pos 也就无法滚动了!!
 			});

 			this.foodsScroll.on('scroll', (pos) => { //为滚动条的高度 有小数
 				this.scrollY = Math.abs(Math.round(pos.y));
 			});
 		},
 		_calculateHeight() {
 			let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
 			let height = 0;
 			this.listHeight.push(height);
 			for(let i = 0; i < foodList.length; i++){
 				let item = foodList[i];
 				height += item.clientHeight;
 				this.listHeight.push(height);
 			}
 		}
 	},
 	components: {
 		shopcart,
 		cartcontrol,
 		food
 	}
 };
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"
	.goods
		display: flex
		position: absolute
		top: 174px //header的134加上tab的40
		bottom: 46px //购物车组件高度
		width: 100%
		overflow: hidden //超过部分需要隐藏
		.menu-wrapper
			flex: 0 0 80px// flex: 等分 缩放情况 占位空间
			width: 80px //兼容安卓浏览器
			background: #f3f5f7
			.menu-item
				display: table
				height: 54px
				width: 56px
				padding: 0 12px
				line-height: 14px;
				&.current
					position: relative
					z-index: 10
					margin-top: -1px
					background: #fff
					font-weight: 700
					.text
						border-none
				.icon
					vertical-align: top
					display: inline-block
					width: 12px
					height: 12px
					margin-right: 2px
					background-size: 12px 12px
					background-repeat: no-repeat
					&.decrease
						bg-image('decrease_3')
					&.discount
						bg-image('discount_3')
					&.guarantee
						bg-image('guarantee_3')
					&.invoice
						bg-image('invoice_3')
					&.special
						bg-image('special_3')
				.text
					display: table-cell
					width: 56px;
					vertical-align: middle //table布局的垂直居中
					font-size: 12px;
					border-1px(rgba(7,17,27,0.1))
		.foods-wrapper
			flex: 1
			.title
				padding-left: 14px;
				height: 26px;
				line-height: 26px;//为了垂直居中
				border-left: 2px solid #d9dde1
				font-size: 12px;
				color: rgb(147, 153, 159);
				background: #f3f5f7
			.food-item
				display: flex;
				margin: 18px; //上下margin有重叠效果 导致margin-bottom无效
				padding-bottom: 18px
				border-1px(rgba(7,17,27,0.1))
				&last-child
					border-none()
					margin-bottom: 0
				.icon
					flex: 0 0 57px
					margin-right: 10px
				.content
					flex: 1
					.name
						margin: 2px 0 8px 0
						height: 14px;
						line-height: 14px;
						font-size: 14px;
						color: rgb(7, 17, 27)
					.desc, .extra
						line-height: 10px;
						font-size: 10px;
						color: rgb(147, 153, 159)
					.desc
						line-height: 12px
						margin-bottom: 8px
					.extra
						.count
							margin-right: 12px
					.price
						font-weight: 700
						line-height: 24px
						.now	
							margin-right: 18px;
							font-size: 14px;
							color: rgb(240,20,20)
						.old
							text-decoration: line-through
							font-size: 10px
							color: rgb(147, 153, 159)	
					.cartcontrol-wrapper
						position: absolute
						right: 0
						bottom: 12px
</style>