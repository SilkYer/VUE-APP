<template>
  <div class="header">
    <div class="content-wrapper">
    	<div class="avatar">
    		<img width="64" height="64" :src="seller.avatar">
    	</div>
    	<div class="content">
    		<div class="title">
    			<span class="brand"></span>
    			<span class="name">{{seller.name}}</span>
    		</div>
    		<div class="description">
    		{{seller.description}}/{{seller.deliveryTime}}分钟送达
	    	</div>
	    	<div v-if="seller.supports" class="support">
	    		<span class="icon" :class="classMap[seller.supports[0].type]"></span>
	    		<span class="text">{{seller.supports[0].description}}</span>
	    	</div>
    	</div>
    	<div v-if="seller.supports" class="support-count" @click="showDetail">
    		<span class="count">{{seller.supports.length}}个</span>
    		<i></i>
    	</div>
    </div>
    <div class="bulletin-wrapper " @click="showDetail">
    	<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
    </div>
    <div class="background">
    	<img :src="seller.avatar" width="100%" height="100%">
    </div>
	    <div v-show="detailShow" class="detail">
	    	<div class="detail-wrapper clearfix">
	    		<div class="detail-main">
	    			<h1 class="name">{{seller.name}}</h1>
	    			<div class="star-wrapper" style="margin-top: 18px;padding: 2px 0;text-align:center">
	    				<star :size="48" :score="seller.score"></star>
	    				<div class="title">
	    					<div class="line"></div>
	    					<div class="text">优惠信息</div>
	    					<div class="line"></div>
	    				</div>
	    				<ul v-if="seller.supports" class="supports">
	    					<li class="support-item" v-for="(item ,index) in seller.supports">
	    						<span class="icon" :class="classMap[item.type]"></span>
	    						<span class="text">{{item.description}}</span>
	    					</li>
	    				</ul>
	    				<div class="title">
	    					<div class="line"></div>
	    					<div class="text">商家公告</div>
	    					<div class="line"></div>
	    				</div>
	    				<div class="bulletin">
	    					<p class="content">{{seller.bulletin}}</p>
	    				</div>
	    			</div>	
	    		</div>
	    	</div>
	    	<div class="detail-close">
	    		<i class="icon-close" @click="closeDetail()"></i>
	    	</div>
    	</div>
  </div> 
</template>

<script>
 import star from 'components/star/star'
 export default{
 	props:{  //通过props拿到seller
 		seller:{
 			type: Object
 		}
 	},
 	data(){
 		return {
 			detailShow:false
 		};
 	},
 	methods: {
 		showDetail(){
 			this.detailShow = true;
 		},
 		closeDetail() {
 			this.detailShow = false;
 		}
 	},
 	created() {
 		this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']; //顺序是data.json里的顺序
 	},
 	components:{
 		star  //注册star
 	}
 }
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"
	.header
		position: relative
		color: #fff
		background: rgba(7, 17, 27, 0.5);
		overflow: hidden
		.content-wrapper
			position: relative
			padding: 24px 12px 18px 24px
			font-size: 0 //消除子元素与隔壁元素的缝隙
			.avatar
				display: inline-block
				vertical-align: top
				img
					border-radius: 2px
			.content
				display: inline-block
				margin-left: 16px
				font-size: 14px
				.title
					margin: 2px 0 8px 0
					.brand
						width: 30px
						height: 18px
						display: inline-block //brand是行内元素,指定宽高没用 所以用inline-block
						bg-image('brand')//通过mixin.styl引入的
						background-size: 30px 18px
						background-repeat: no-repeat
						vertical-align:top
					.name
						margin-left:6px
						font-size:16px
						line-height: 18px
						font-weight: bold
				.description
					margin-bottom: 10px
					line-height: 12px
					font-size: 12px
				.support
					.icon
						vertical-align: top
						display: inline-block
						width: 12px
						height: 12px
						margin-right: 4px
						background-size: 12px 12px
						background-repeat: no-repeat
						&.decrease
							bg-image('decrease_1')
						&.discount
							bg-image('discount_1')
						&.guarantee
							bg-image('guarantee_1')
						&.invoice
							bg-image('invoice_1')
						&.special
							bg-image('special_1')
					.text
						font-size: 10px
						line-height: 12px
			.support-count
				position: absolute
				right: 12px
				bottom: 18px
				padding: 0 8px
				height: 24px
				line-height: 24px
				border-radius: 14px
				background:rgba(0,0,0,0.2)
				text-aligh: center
				.count
					font-size: 10px
		.bulletin-wrapper
			height: 28px
			line-height: 28px
			padding: 0 22px 0 12px
			white-space: nowrap
			overflow: hidden
			text-overflow: ellipsis;
			background: rgba(7, 17, 27, 0.2)
			//font-size: 0
			//如果用了font-size为0,公告的省略号就会消失
			//如果想消除该缝隙 把两个span挨着就行
			.bulletin-title
				display: inline-block;
				width: 22px
				height: 12px
				bg-image('bulletin');
				background-size: 22px 12px
				background-repeat: no-repeat
			.bulletin-text
				vertical-align: top;
				margin: 0 4px;
				font-size: 10px;
				font-weight: 200;
		.background
			position: absolute;
			top: 0
			left: 0
			width: 100%
			height: 100%
			z-index: -1
			filter: blur(10px)
		.detail
			position: fixed;
			z-index: 100;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			overflow: auto
			background: rgba(7, 17, 27, 0.8)
			.detail-wrapper
				min-height: 100%
				width: 100%
				.detail-main
					margin-top: 64px
					padding-bottom: 64px
					.name
						line-height: 18px
						text-align: center
						font-size: 16px
						font-weight: 700
					.title
						display: flex
						width: 80%
						margin: 30px auto 24px auto
						.line
							flex: 1
							position: relative
							top: -6px
							border-bottom: 1px solid rgba(255, 255,255,0.2)
						.text
							padding: 0 12px
							font-size: 14px
							font-weight: 700
					.supports
							text-align: left
							width: 80%
							margin: 0 auto;
							.support-item
								padding: 0 12px;
								margin-bottom: 12px
								font-size: 0
								&:last-child
									margin-bottom: 0
								.icon
									display: inline-block
									width: 16px
									height: 16px
									vertical-align: top
									margin-right: 6px
									background-size: 16px 16px
									background-repeat: no-repeat
									&.decrease
										bg-image('decrease_2')
									&.discount
										bg-image('discount_2')
									&.guarantee
										bg-image('guarantee_2')
									&.invoice
										bg-image('invoice_2')
									&.special
										bg-image('special_2')
								.text
									line-height: 12px
									font-size: 12px		
					.bulletin
						width: 80%
						margin: 0 auto
						.content
							padding: 0 12px
							line-height: 24px
							font-size: 12px
			.detail-close
				width: 32px
				height: 32px
				margin: -64px auto //为了内容满屏时还能固定在底部
				clear: both
				font-size:32px
			
</style>