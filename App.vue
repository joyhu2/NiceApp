<script>
	import read from './services/read.js';

	export default {
		onLaunch: function() {
			this.$store.dispatch("getUserInfo")
			this.$store.dispatch("getAllinInfo")
			this.$store.dispatch("getConllectList")
			this.$store.dispatch("getConllectInfo")

		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	/* uView-ui */
	@import "uview-ui/index.scss"
</style>
