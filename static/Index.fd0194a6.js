import{r as x,_ as k}from"./index.eaf6131b.js";import"./vue.c1672130.js";import{d as B,e as c,w as N,a6 as g,aj as F,o as u,c as h,W as s,L as m,T as H,R as b,S as y,F as T,a9 as j,aa as L,O as V,Z as W}from"./@vue.09569551.js";const I=async()=>x({url:"/user/list",method:"post",json:!0}).then(l=>l.code===200?l:Promise.reject(l)),O=B({__name:"Index",props:{isStripe:{type:Boolean,required:!1,default:!0},isBorder:{type:Boolean,required:!1,default:!0},isLoading:{type:Boolean,required:!1,default:!1},isNeedCheckbox:{type:Boolean,required:!1,default:!1},tableHeader:{type:Array,required:!0},tableContent:{type:Array,required:!1},tableWidth:{type:String,required:!1,default:"100%"},tableHeight:{type:[String,Number,null],required:!1,default:void 0},sectionContent:{type:Array,required:!1},defaultPage:{type:Number,required:!1,default:1},defaultPageSize:{type:Number,required:!1,default:10},defaultPageSizes:{type:Array,required:!1,default:()=>[5,10,15,20,25]},handlePagination:{type:String,required:!1,default:"web"}},emits:["update:sectionContent","update:defaultPage","update:defaultPageSize"],setup(l,{emit:p}){const t=l,v=c(t.tableHeader||[]),f=c([]),S=e=>{p("update:sectionContent",e)},i=c(t.defaultPage),d=c(t.defaultPageSize),P=e=>{i.value=e,p("update:defaultPage",e)},C=e=>{d.value=e,p("update:defaultPageSize",e)},q=(e,n)=>{const r=JSON.parse(JSON.stringify(t.tableContent||[]));let o=[];return e===1?o=r==null?void 0:r.slice(0,n):o=r==null?void 0:r.slice((e-1)*n,e*n),o};return N(()=>{t.handlePagination==="web"?f.value=q(i.value,d.value):f.value=t.tableContent||[]}),(e,n)=>{const r=g("el-table-column"),o=g("el-table"),w=g("el-pagination"),z=F("loading");return u(),h("div",null,[s(" \u641C\u7D22\u6A21\u5757 "),m(e.$slots,"table-searchs"),s(" \u76F8\u5173\u6309\u94AE\u6A21\u5757 "),m(e.$slots,"table-buttons"),s(" \u8868\u683C\u6A21\u677F "),H((u(),b(o,{"element-loading-text":"\u52A0\u8F7D\u4E2D...",height:t.tableHeight,style:V({width:l.tableWidth,marginTop:"15px"}),data:f.value,stripe:t.isStripe,border:t.isBorder,onSelectionChange:S},{default:y(()=>[t.isNeedCheckbox?(u(),b(r,{key:0,type:"selection"})):s("v-if",!0),(u(!0),h(T,null,j(v.value,(a,A)=>(u(),b(r,{key:A,fixed:a.columnFixed,prop:a.columnProp,label:a.columnTitle,width:a.columnWidth},L({_:2},[a.columnCustom?{name:"default",fn:y(_=>[m(e.$slots,a.columnProp,{content:_.row})]),key:"0"}:void 0]),1032,["fixed","prop","label","width"]))),128))]),_:3},8,["height","style","data","stripe","border"])),[[z,t.isLoading]]),s(" \u5206\u9875\u6A21\u5757 "),W(w,{style:{"margin-top":"20px"},background:"",currentPage:i.value,"onUpdate:currentPage":n[0]||(n[0]=a=>i.value=a),"page-size":d.value,"onUpdate:page-size":n[1]||(n[1]=a=>d.value=a),layout:"->, total, sizes, prev, pager, next, jumper","page-sizes":t.defaultPageSizes,total:t.tableContent.length,onCurrentChange:P,onSizeChange:C},null,8,["currentPage","page-size","page-sizes","total"])])}}}),J=k(O,[["__file","/home/runner/work/vue-vite-ts-admin/vue-vite-ts-admin/src/components/VAdminTable/Index.vue"]]);export{J as V,I as g};