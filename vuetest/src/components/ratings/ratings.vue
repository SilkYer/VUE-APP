<template>
  <div class="ratings" ref="ratings">
  	<div class="ratings-content">
  		<div class="overview">
  			<div class="overview-left">
  				<h1 class="score">{{seller.score}}</h1>
  				<div class="title">综合评分</div>
  				<div class="rank">高于周边商家{{seller.rankRate}}%</div>
  			</div>
  			<div class="overview-right">
  				<div class="score-wrapper">
  					<span class="title">服务态度</span>
  					<star :size="36" :score="seller.serviceScore"></star>
  					<span class="score">{{seller.serviceScore}}</span>
  				</div>
  				<div class="score-wrapper">
  					<span class="title">商品评分</span>
  					<star :size="36" :score="seller.foodScore"></star>
  					<span class="score">{{seller.foodScore}}</span>
  				</div>
  				<div class="delivery-wrapper">
		            <span class="title">送达时间</span>
		            <span class="delivery">{{seller.deliveryTime}}分钟</span>
		        </div>
  			</div>
  		</div>
  		<split></split>
  		<ratingselect :select-type="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="ratings"></ratingselect>
  		<div class="rating-wrapper">
  			<ul>
  				<li v-for="rating in ratings" class="rating-item">
  					<div class="avatar">
  						<img height="28px" width="28px" :src="rating.avatar">
  					</div>
  					<div class="content">
  						<h1 class="name">{{rating.username}}</h1>
  						<div class="star-wrapper">
  							<star :size="24" :score="rating.score"></star>
  							<span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
  							<p class="text">{{rating.text}}</p>
  							<div class="recommand" v-show="rating.recommend && rating.recommend.length">
  								<span class="icon-thumb_up"></span>
  								<span v-for="item in rating.recommend">{{item}}</span>
  							</div>
  							<div class="time">
  								{{rating.rateTime | formatDate}}
  							</div>
  						</div>
  					</div>
  				</li>
  			</ul>
  		</div>
  	</div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
 import star from 'components/star/star'
 import split from 'components/split/split'
 import ratingselect from 'components/ratingselect/ratingselect'
 import {formatDate} from 'common/js/date'

 const All = 2
 const ERR_OK = 0

 export default {
 	props: {
 		seller: {
 			type: Object
 		}
 	},
 	filters: {
 		formatDate(time) {
 			let date = new Date(time);
 			return formatDate(date, 'yyyy-MM-dd hh:mm')
 		}
 	},
 	data() {
 		return {
 			ratings: [],
 			showFlag: false,
 			selectType: All,
 			onlyContent: true,
 		};
 	},
 	created() {
 		this.$http.get('/api/ratings').then((response) => {
 			response = response.body
 			if(response.errno === ERR_OK) {
 				this.ratings = response.data;
 				this.$nextTick(() => {
 					this.scroll = new BScroll(this.$refs.ratings, {
 						click: true
	 				})
 				})
 			}
 		})
 	},
 	components: {
 		star,
 		split,
 		ratingselect
 	}
 };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
	.ratings
		position: absolute
		top: 174px
		bottom: 0
		left: 0
		overflow: hidden
		width: 100%
		.overview
			display: flex
			padding: 18px 0
			.overview-left
				flex: 0 0 137px
				width: 137px
				padding: 6px 0
				border-right: 1px solid rgba(7, 17, 27, 0.1)
				text-align: center
				@media only screen and (max-width: 320px)
					flex: 0 0 120
					width: 120px
				.score
					margin-bottom: 6px
					line-height: 28px
					font-size: 24px
					color: rgb(255, 153, 0)
				.title
					line-height: 12px
					font-size: 12px
					color: rgb(7, 17, 27)
				.rank
					padding-bottom: 6px
					line-height: 10px
					font-size: 10px
					color: rgb(147, 153, 159)
					margin-top: 10px
			.overview-right
				flex: 1
				padding:6px 0 6px 24px
				@media only screen and (max-width: 320px)
					padding-left: 6px
				.score-wrapper
					margin-bottom: 8px
					font-size: 0
					.title
						line-height: 18px
						font-size: 12px
						color: rgb(7, 17, 27)
					.star
						display: inline-block
						vertical-align: top
						margin: 0 12px
					.score
						line-height: 18px
						display: inline-block
						vertical-align: top
						font-size: 12px
						color: rgb(255, 153,0)
				.delivery-wrapper
					font-size: 0
					.title
						line-height: 18px
						font-size: 12px
						color: rgb(7, 17, 27)
					.delivery
						font-size: 12px
						color: rgb(147, 153, 159)
						margin-left: 12px
		.rating-wrapper
			padding: 0 18px
			.rating-item
				display: flex
				padding: 18px 0
				border-1px(rgba(7, 17, 27, 0.1))
				.avatar
					flex: 0 0 28px
					width: 28px
					margin-right: 12px
					img
						border-radius: 50%
				.content
					position: relative
					flex: 1
					.name
						margin-bottom: 4px
						line-height: 12px
						font-size: 10px
						color: rgb(7, 17, 27)
					.star-wrapper
						margin-bottom: 6px
						font-size: 0
						color: #fff
						.star
							display: inline-block
							margin-right: 6px
							vertical-align: top
						.delivery
							display: inline-block
							vertical-align: top
							line-height: 12px
							font-size: 10px
							color: rgb(147, 153, 159)
					.text
						font-size: 12px
						color: rgb(7, 17, 27)
						line-height: 18px
						margin-botom: 8px
</style>