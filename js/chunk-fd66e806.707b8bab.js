(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fd66e806"],{8418:function(t,a,e){"use strict";var s=e("c04e"),i=e("9bf2"),r=e("5c6c");t.exports=function(t,a,e){var o=s(a);o in t?i.f(t,o,r(0,e)):t[o]=e}},"8ae4":function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("nav",{attrs:{"aria-label":"Page navigation example"}},[e("ul",{staticClass:"pagination"},[e("li",{staticClass:"page-item",class:{disabled:!t.pagination.has_pre}},[e("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Previous"},on:{click:function(a){return a.preventDefault(),t.pageComponent(t.pagination.current_page-1)}}},[e("span",{attrs:{"aria-hidden":"true"}},[t._v("«")])])]),t._l(t.pagination.total_pages,(function(a,s){return e("li",{key:s,staticClass:"page-item",class:{active:t.pagination.current_page===a}},[e("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.pageComponent(a)}}},[t._v(t._s(a))])])})),e("li",{staticClass:"page-item",class:{disabled:!t.pagination.has_next}},[e("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Next"},on:{click:function(a){return a.preventDefault(),t.pageComponent(t.pagination.current_page+1)}}},[e("span",{attrs:{"aria-hidden":"true"}},[t._v("»")])])])],2)])])},i=[],r={name:"Pagination",props:["pagination"],methods:{pageComponent:function(t){this.$emit("emitPage",t)}}},o=r,n=e("2877"),c=Object(n["a"])(o,s,i,!1,null,null,null);a["a"]=c.exports},"99af":function(t,a,e){"use strict";var s=e("23e7"),i=e("d039"),r=e("e8b5"),o=e("861d"),n=e("7b0b"),c=e("50c4"),l=e("8418"),d=e("65f0"),u=e("1dde"),p=e("b622"),m=p("isConcatSpreadable"),v=9007199254740991,g="Maximum allowed index exceeded",f=!i((function(){var t=[];return t[m]=!1,t.concat()[0]!==t})),h=u("concat"),_=function(t){if(!o(t))return!1;var a=t[m];return void 0!==a?!!a:r(t)},C=!f||!h;s({target:"Array",proto:!0,forced:C},{concat:function(t){var a,e,s,i,r,o=n(this),u=d(o,0),p=0;for(a=-1,s=arguments.length;a<s;a++)if(r=-1===a?o:arguments[a],_(r)){if(i=c(r.length),p+i>v)throw TypeError(g);for(e=0;e<i;e++,p++)e in r&&l(u,p,r[e])}else{if(p>=v)throw TypeError(g);l(u,p++,r)}return u.length=p,u}})},da29:function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("loading",{attrs:{active:t.isLoading},on:{"update:active":function(a){t.isLoading=a}}}),e("div",{staticClass:"row mt-4"},t._l(t.cardProducts,(function(a,s){return e("div",{key:s,staticClass:"col-md-4 mb-4"},[e("div",{staticClass:"card border-0 shadow-sm"},[e("div",{staticStyle:{height:"150px","background-size":"cover","background-position":"center"},style:{backgroundImage:"url("+a.imageUrl+")"}}),e("div",{staticClass:"card-body"},[e("span",{staticClass:"badge badge-secondary float-right ml-2"},[t._v(t._s(a.category))]),e("h5",{staticClass:"card-title"},[e("a",{staticClass:"text-dark",attrs:{href:"#"}},[t._v(t._s(a.title))])]),e("p",{staticClass:"card-text"},[t._v(t._s(a.content))]),e("div",{staticClass:"d-flex justify-content-between align-items-baseline"},[a.price===a.origin_price?e("div",{staticClass:"h5"},[t._v("售價 "+t._s(a.origin_price)+" 元")]):t._e(),a.price!==a.origin_price?e("del",{staticClass:"h6"},[t._v("原價 "+t._s(a.origin_price)+" 元")]):t._e(),a.price!==a.origin_price?e("div",{staticClass:"h5"},[t._v("現在只要 "+t._s(a.price)+" 元")]):t._e()])]),e("div",{staticClass:"card-footer d-flex"},[e("button",{staticClass:"btn btn-outline-secondary btn-sm",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.seeMore(a.id)}}},[a.id===t.productId?e("i",{staticClass:"fas fa-spinner fa-spin"}):t._e(),t._v(" 查看更多 ")]),e("button",{staticClass:"btn btn-outline-danger btn-sm ml-auto",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.addToShippingCart(a.id)}}},[a.id===t.productId?e("i",{staticClass:"fas fa-spinner fa-spin"}):t._e(),t._v(" 加到購物車 ")])])])])})),0),e("Pagination",{attrs:{pagination:t.pagination},on:{emitPage:t.getCustomerOrder}}),e("div",{staticClass:"modal fade",attrs:{id:"productModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"}},[e("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[e("div",{staticClass:"modal-content"},[e("div",{staticClass:"modal-header"},[e("h5",{staticClass:"modal-title",attrs:{id:"exampleModalLabel"}},[t._v(t._s(t.product.title))]),t._m(0)]),e("div",{staticClass:"modal-body"},[e("div",{staticStyle:{height:"100vh","background-size":"cover","background-position":"center"},style:{backgroundImage:"url("+t.product.imageUrl+")"}}),e("p",{staticClass:"card-text"},[t._v(t._s(t.product.content))]),e("div",{staticClass:"d-flex justify-content-between align-items-baseline"},[t.product.price===t.product.origin_price?e("div",{staticClass:"h5"},[t._v("售價 "+t._s(t.product.origin_price)+" 元")]):t._e(),t.product.price!==t.product.origin_price?e("del",{staticClass:"h6"},[t._v("原價 "+t._s(t.product.origin_price)+" 元")]):t._e(),t.product.price!==t.product.origin_price?e("div",{staticClass:"h5"},[t._v("現在只要 "+t._s(t.product.price)+" 元")]):t._e()]),e("select",{directives:[{name:"model",rawName:"v-model",value:t.product.num,expression:"product.num"}],staticClass:"form-control mt-3",on:{change:function(a){var e=Array.prototype.filter.call(a.target.options,(function(t){return t.selected})).map((function(t){var a="_value"in t?t._value:t.value;return a}));t.$set(t.product,"num",a.target.multiple?e:e[0])}}},t._l(10,(function(a){return e("option",{key:a,domProps:{value:a}},[t._v("選購 "+t._s(a)+" "+t._s(t.product.unit))])})),0)]),e("div",{staticClass:"modal-footer"},[e("div",{staticClass:"text-muted text-nowrap mr-3"},[t._v(" 小計 "),e("span",[t._v(t._s(t.product.num*t.product.price))]),t._v(" 元 ")]),e("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(a){return a.preventDefault(),t.addToShippingCart(t.product.id,t.product.num)}}},[t._v("加入購物車")])])])])]),e("div",{staticClass:"col-6 mx-auto"},[e("table",{staticClass:"table mt-5"},[t._m(1),e("tbody",t._l(t.shippingCart.carts,(function(a,s){return e("tr",{key:s},[e("td",{staticClass:"align-middle"},[e("button",{staticClass:"btn btn-outline-danger btn-sm",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.delShippingCartProduct(a.id)}}},[e("i",{staticClass:"far fa-trash-alt"})])]),e("td",{staticClass:"align-middle"},[t._v(" "+t._s(a.product.title)+" "),a.coupon?e("div",{staticClass:"text-success"},[t._v("已套用優惠券")]):t._e()]),e("td",{staticClass:"align-middle"},[t._v(t._s(a.qty)+"/"+t._s(a.product.unit))]),e("td",{staticClass:"align-middle text-right"},[t._v(t._s(Math.round(a.final_total)))])])})),0),e("tfoot",[e("tr",[e("td",{staticClass:"text-right",attrs:{colspan:"3"}},[t._v("總計")]),e("td",{staticClass:"text-right"},[t._v(t._s(t.shippingCart.total))])]),t.shippingCart.total!==t.shippingCart.final_total?e("tr",[e("td",{staticClass:"text-right text-success",attrs:{colspan:"3"}},[t._v("折扣價")]),e("td",{staticClass:"text-right text-success"},[t._v(t._s(Math.round(t.shippingCart.final_total)))])]):t._e()])]),e("div",{staticClass:"input-group mb-3 input-group-sm"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.coupon_code,expression:"coupon_code"}],staticClass:"form-control",attrs:{type:"text",placeholder:"請輸入優惠碼"},domProps:{value:t.coupon_code},on:{input:function(a){a.target.composing||(t.coupon_code=a.target.value)}}}),e("div",{staticClass:"input-group-append"},[e("button",{staticClass:"btn btn-outline-secondary",attrs:{type:"button"},on:{click:function(a){return a.preventDefault(),t.useCoupon(a)}}},[t._v("套用優惠碼")])])]),e("div",{staticClass:"my-5 row justify-content-center"},[e("form",{staticClass:"col-md",on:{submit:function(a){return a.preventDefault(),t.sendOrder(a)}}},[e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"useremail"}},[t._v("Email")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.form.user.email,expression:"form.user.email"},{name:"validate",rawName:"v-validate",value:"required|email",expression:"'required|email'"}],staticClass:"form-control",class:{"is-invalid":t.errors.has("email")},attrs:{type:"email",name:"email",id:"useremail",placeholder:"請輸入 Email"},domProps:{value:t.form.user.email},on:{input:function(a){a.target.composing||t.$set(t.form.user,"email",a.target.value)}}}),t.errors.has("email")?e("span",{staticClass:"text-danger"},[t._v(t._s(t.errors.first("email")))]):t._e()]),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"username"}},[t._v("收件人姓名")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.form.user.name,expression:"form.user.name"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"form-control",class:{"is-invalid ":t.errors.has("name")},attrs:{type:"text",name:"name",id:"username",placeholder:"輸入姓名"},domProps:{value:t.form.user.name},on:{input:function(a){a.target.composing||t.$set(t.form.user,"name",a.target.value)}}}),t.errors.has("name")?e("span",{staticClass:"text-danger"},[t._v("請輸入姓名")]):t._e()]),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"usertel"}},[t._v("收件人手機")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.form.user.tel,expression:"form.user.tel"},{name:"validate",rawName:"v-validate",value:"phone",expression:"'phone'"}],staticClass:"form-control",class:{"is-invalid":t.errors.has("tel")},attrs:{type:"tel",id:"usertel",name:"tel",placeholder:"請輸入手機"},domProps:{value:t.form.user.tel},on:{input:function(a){a.target.composing||t.$set(t.form.user,"tel",a.target.value)}}}),t.errors.has("tel")?e("span",{staticClass:"text-danger"},[t._v(t._s("手機"+t.errors.first("tel")))]):t._e()]),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"useraddress"}},[t._v("收件人地址")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.form.user.address,expression:"form.user.address"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"form-control",class:{"is-invalid":t.errors.has("address")},attrs:{type:"text",name:"address",id:"useraddress",placeholder:"請輸入地址"},domProps:{value:t.form.user.address},on:{input:function(a){a.target.composing||t.$set(t.form.user,"address",a.target.value)}}}),t.errors.has("address")?e("span",{staticClass:"text-danger"},[t._v("請輸入收件人地址")]):t._e()]),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"comment"}},[t._v("留言")]),e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.form.message,expression:"form.message"}],staticClass:"form-control",attrs:{name:"",id:"comment",cols:"30",rows:"10"},domProps:{value:t.form.message},on:{input:function(a){a.target.composing||t.$set(t.form,"message",a.target.value)}}})]),t._m(2)])])])],1)},i=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[e("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("thead",[e("th",{attrs:{width:"40"}}),e("th",[t._v("品名")]),e("th",{attrs:{width:"120"}},[t._v("數量")]),e("th",{attrs:{width:"100"}},[t._v("單價")])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"text-right"},[e("button",{staticClass:"btn btn-danger"},[t._v("送出訂單")])])}],r=(e("99af"),e("1157")),o=e.n(r),n=e("8ae4"),c={components:{Pagination:n["a"]},data:function(){return{pagination:{},isLoading:!1,cardProducts:[],product:{},productId:"",shippingCart:{carts:{}},coupon_code:"",form:{user:{name:"",email:"",tel:"",address:""},message:""}}},methods:{getCustomerOrder:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,a=this,e="".concat("https://vue-course-api.hexschool.io","/api/").concat("canbook","/products?page=").concat(t);a.isLoading=!0,a.$http.get(e).then((function(t){a.isLoading=!1,a.cardProducts=t.data.products,a.pagination=t.data.pagination}))},seeMore:function(t){var a=this,e="".concat("https://vue-course-api.hexschool.io","/api/").concat("canbook","/product/").concat(t);a.productId=t,a.$http.get(e).then((function(t){t.data.success&&(t.data.product.num=1,a.product=t.data.product,o()("#productModal").modal("show"),a.productId="")}))},addToShippingCart:function(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,e=this,s="".concat("https://vue-course-api.hexschool.io","/api/").concat("canbook","/cart"),i={product_id:t,qty:a};e.$http.post(s,{data:i}).then((function(){e.getShippingCart(),o()("#productModal").modal("hide")}))},getShippingCart:function(){var t=this,a="".concat("https://vue-course-api.hexschool.io","/api/").concat("canbook","/cart");t.isLoading=!0,t.$http.get(a).then((function(a){t.isLoading=!1,t.shippingCart=a.data.data}))},delShippingCartProduct:function(t){var a=this,e="".concat("https://vue-course-api.hexschool.io","/api/").concat("canbook","/cart/").concat(t);a.$http.delete(e).then((function(t){t.data.success&&a.getShippingCart()}))},useCoupon:function(){var t=this,a="".concat("https://vue-course-api.hexschool.io","/api/").concat("canbook","/coupon");t.isLoading=!0;var e={code:t.coupon_code};t.$http.post(a,{data:e}).then((function(){t.getShippingCart(),t.isLoading=!1}))},sendOrder:function(){var t=this,a="".concat("https://vue-course-api.hexschool.io","/api/").concat("canbook","/order"),e=t.form;t.isLoading=!0,t.$validator.validate().then((function(s){s?t.$http.post(a,{data:e}).then((function(a){a.data.success&&t.$router.push("customerorder_check/".concat(a.data.orderId)),t.isLoading=!1})):t.isLoading=!1}))}},created:function(){this.getCustomerOrder(),this.getShippingCart()}},l=c,d=e("2877"),u=Object(d["a"])(l,s,i,!1,null,null,null);a["default"]=u.exports}}]);
//# sourceMappingURL=chunk-fd66e806.707b8bab.js.map