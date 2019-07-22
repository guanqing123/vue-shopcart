new Vue({
    el: '.container',
    data: {
        addressList: [],
        currentIndex: '',
        limitNum: 3,
        shippingMethod: 1
    },
    computed: {
      filterAddressList: function () {
          return this.addressList.slice(0, this.limitNum)
      }  
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getAddressList()
        })
    },
    methods: {
        getAddressList: function () {
            this.$http.get("data/address.json").then(function (res) {
                this.addressList = res.body.result
            })
        },
        setDefault: function (addressId) {
            this.addressList.forEach(function (address, index) {
                if (address.addressId == addressId) {
                    address.isDefault = true
                } else {
                    address.isDefault = false
                }
            })
        }
    }
})