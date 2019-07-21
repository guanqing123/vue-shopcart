new Vue({
    el: '#app',
    data: {
        totalMoney: 0,
        productList: [],
        checkAllFlag: false,
        delFlag: false,
        currentProduct: ''
    },
    filters: {
        formatePrice: function (price) {
            return '￥' + price;
        },
        formateTotal: function (total) {
            return '￥' + total + '元';
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.cartView();
        })
    },
    methods: {
        cartView: function () {
            this.$http.get('data/cartData.json', {'id' : 123}).then(function (res) {
                this.productList = res.body.result.list;
            });
        },
        handleCheck: function (item) {
            if (typeof item.check == 'undefined') {
                this.$set(item, 'check', true)
            } else {
                item.check = !item.check
            }
            this.calTotalMoney()
        },
        handleQty: function (item, type) {
            if (type < 0) {
                if (item.productQuantity < 1) return
                item.productQuantity --
            } else {
                item.productQuantity ++
            }
            this.calTotalMoney()
        },
        checkAll: function (flag) {
            this.checkAllFlag = flag;
            var _this = this;
            this.productList.forEach(function (value, index) {
                if (typeof value.check == 'undefined') {
                    _this.$set(value, 'check', flag)
                } else {
                    value.check = flag
                }
            })
            this.calTotalMoney()
        },
        calTotalMoney: function () {
            var _this = this;
            this.totalMoney = 0;
            this.productList.forEach(function (value, index) {
                if (value.check) {
                    _this.totalMoney += value.productPrice * value.productQuantity
                }
            })
        },
        delConfirm: function (item) {
            this.delFlag = true
            this.currentProduct = item
        },
        delProduct: function () {
            // var index = this.productList.indexOf(this.currentProduct);
            // this.productList.splice(index, 1);
            this.productList.splice(this.productList.findIndex(product => product.productId === this.currentProduct.productId), 1)
            this.delFlag = false;
            this.calTotalMoney();
        }
    }
})