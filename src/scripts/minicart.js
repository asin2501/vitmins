(function () {
    var bodyClass = 'cart-opened';
    var cartCounter = $('#cart-counter');
    var minicart;

    $(document).on('cart.ready', function (event, cart) {
        // console.log(JSON.parse(JSON.stringify(cart)));
        initMinicart(JSON.parse(JSON.stringify(cart)))
    });

    CartJS.init(cartJson);

    function initMinicart(data) {
        minicart = new Vue({
            el: '#minicart',
            data: {
                cartData: data,
                opened: false,
            },
            created: function () {
                $('.js-open-cart').click(this.show);
                $('.js-add-to-cart').click(this.addToCartClickHandler);
                $(document).on('cart.requestComplete', this.cartUpdateHandler);

                this.initQtyProdWidget();
            },
            computed: {
                totalPrice: function () {
                    return Math.floor(this.cartData.total_price / 100)
                }
            },
            methods: {
                addToCartClickHandler: function (e) {
                    e.preventDefault();
                    var id = $(e.currentTarget).data('variant-id');
                    this.add(id);
                    this.show();
                    // console.log('update cart');
                },
                refreshProdWidgetsState: function () {
                    for (var id in this.productWidgets) {
                        var currentItem = this.getItemById(id);
                        if (currentItem) {
                            this.productWidgets[id].find('.js-val').text(currentItem.quantity);
                            this.productWidgets[id].fadeIn();
                            this.productWidgets[id].siblings('.js-add-to-cart').css('visibility', 'hidden');
                            console.log(this.productWidgets[id]);
                        } else {
                            this.productWidgets[id].fadeOut();
                            this.productWidgets[id].siblings('.js-add-to-cart').css('visibility', 'visible');
                        }
                    }
                },
                initQtyProdWidget: function () {
                    var _that = this;
                    this.productWidgets = {};

                    $('.js-qty-widget').each(function () {
                        var id = $(this).data('variant-id');
                        if (_that.productWidgets[id]) {
                            _that.productWidgets[id] = _that.productWidgets[id].add($(this));
                        } else {
                            _that.productWidgets[id] = $(this);
                        }
                    });

                    for (var key in this.productWidgets) {
                        (function (key) {
                            this.productWidgets[key].find('.js-minus').click(function (e) {
                                e.preventDefault();
                                _that.minus(key);
                            });
                            this.productWidgets[key].find('.js-plus').click(function (e) {
                                e.preventDefault();
                                _that.plus(key);
                            });
                        }.bind(this))(key);
                    }

                    // console.log(this.productWidgets);

                    this.refreshProdWidgetsState();
                },
                cartUpdateHandler: function (e, cart) {
                    Vue.set(this, 'cartData', JSON.parse(JSON.stringify(cart)));

                    cartCounter.text(this.cartData.item_count);
                    this.refreshProdWidgetsState();
                },
                show: function (e) {
                    if (e && e.preventDefault) {
                        e.preventDefault();
                        e.stopPropagation();
                    }

                    this.opened = true;
                    document.body.classList.add(bodyClass);
                    setTimeout(function () {
                        $(document.body).on('click', this.bodyClickClose);
                    }.bind(this), 50)

                },
                hide: function () {
                    this.opened = false;
                    document.body.classList.remove(bodyClass);
                    $(document.body).off('click', this.bodyClickClose);
                },
                bodyClickClose: function (e) {
                    // console.log();
                    if (!$(e.target).closest('.minicart').length) {
                        this.hide();
                    }
                },
                add: function (id) {
                    CartJS.addItem(id);
                },
                getItemById: function (id) {
                    var filteredItem = this.cartData.items.filter(function (item) {
                        return id == item.id;
                    });
                    if (filteredItem.length) {
                        return filteredItem[0];
                    } else {
                        return false;
                    }
                },
                remove: function (id) {
                    CartJS.removeItemById(id);
                },
                minus: function (id) {
                    var update = {};
                    update[id] = this.getItemById(id).quantity - 1;
                    CartJS.updateItemQuantitiesById(update);
                },
                plus: function (id) {
                    var update = {};
                    update[id] = this.getItemById(id).quantity + 1;
                    CartJS.updateItemQuantitiesById(update);
                }
            }
        });
    }
})();

// slate.Image.getSizedImageUrl