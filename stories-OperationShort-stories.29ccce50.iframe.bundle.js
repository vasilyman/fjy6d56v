"use strict";(self.webpackChunkreact_start_template=self.webpackChunkreact_start_template||[]).push([[916],{"./src/stories/OperationShort.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__={title:"Widgets/OperationShort",component:__webpack_require__("./src/widgets/index.ts").K,args:{sum:200,type:"Type",title:"Title",description:"Description long very very long. Description long very very long. Description long very very long. Description long very very long. Description long very very long. Description long very very long. \n    Description long very very long. Description long very very long. Description long very very long. "}};var Default={args:{}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {}\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/widgets/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{W:()=>OperationFull,K:()=>OperationShort});__webpack_require__("./node_modules/react/index.js");var injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),style_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/widgets/operationShort/style.module.scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(style_module.Z,options);const operationShort_style_module=style_module.Z&&style_module.Z.locals?style_module.Z.locals:void 0;var shared=__webpack_require__("./src/shared/index.ts"),clsx_m=__webpack_require__("./node_modules/clsx/dist/clsx.m.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),OperationShort=function OperationShort(_ref){var sum=_ref.sum,type=_ref.type,title=_ref.title,description=_ref.description,className=_ref.className,sumFormatted=new Intl.NumberFormat("ru-RU",{maximumSignificantDigits:3}).format(sum);return(0,jsx_runtime.jsxs)(shared.yo,{className:(0,clsx_m.Z)(operationShort_style_module["operation-short"],className),children:[(0,jsx_runtime.jsx)("div",{className:(0,clsx_m.Z)(operationShort_style_module["operation-short__title"],operationShort_style_module.ellipsis),children:title}),(0,jsx_runtime.jsxs)("div",{className:operationShort_style_module["operation-short__sum"],title:sumFormatted,children:[(0,jsx_runtime.jsx)("span",{className:operationShort_style_module.ellipsis,children:sumFormatted}),(0,jsx_runtime.jsx)("span",{children:" ₽"})]}),(0,jsx_runtime.jsx)("div",{className:(0,clsx_m.Z)(operationShort_style_module["operation-short__description"],operationShort_style_module.ellipsis),children:description}),(0,jsx_runtime.jsx)("div",{className:(0,clsx_m.Z)(operationShort_style_module["operation-short__type"],operationShort_style_module.ellipsis),children:type})]})};OperationShort.displayName="OperationShort";try{OperationShort.displayName="OperationShort",OperationShort.__docgenInfo={description:"Primary UI component for user interaction",displayName:"OperationShort",props:{sum:{defaultValue:null,description:"",name:"sum",required:!0,type:{name:"number"}},type:{defaultValue:null,description:"",name:"type",required:!0,type:{name:"string"}},title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},description:{defaultValue:null,description:"",name:"description",required:!0,type:{name:"string"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/widgets/operationShort/index.tsx#OperationShort"]={docgenInfo:OperationShort.__docgenInfo,name:"OperationShort",path:"src/widgets/operationShort/index.tsx#OperationShort"})}catch(__react_docgen_typescript_loader_error){}var operationFull_style_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/widgets/operationFull/style.module.scss"),style_module_options={};style_module_options.styleTagTransform=styleTagTransform_default(),style_module_options.setAttributes=setAttributesWithoutAttributes_default(),style_module_options.insert=insertBySelector_default().bind(null,"head"),style_module_options.domAPI=styleDomAPI_default(),style_module_options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(operationFull_style_module.Z,style_module_options);const widgets_operationFull_style_module=operationFull_style_module.Z&&operationFull_style_module.Z.locals?operationFull_style_module.Z.locals:void 0;var OperationFull=function OperationFull(_ref){var sum=_ref.sum,type=_ref.type,title=_ref.title,description=_ref.description,className=_ref.className,date=_ref.date,sumFormatted=new Intl.NumberFormat("ru-RU",{maximumSignificantDigits:3}).format(sum),dateFormatted=new Intl.DateTimeFormat("ru-RU",{day:"2-digit",month:"short",year:"numeric"}).format(date);return(0,jsx_runtime.jsxs)("div",{className:(0,clsx_m.Z)(widgets_operationFull_style_module["operation-full"],className),children:[(0,jsx_runtime.jsx)("div",{className:(0,clsx_m.Z)(widgets_operationFull_style_module["operation-full__title"],widgets_operationFull_style_module.ellipsis),children:title}),(0,jsx_runtime.jsx)("div",{className:(0,clsx_m.Z)(widgets_operationFull_style_module["operation-full__type"],widgets_operationFull_style_module.ellipsis),children:type}),(0,jsx_runtime.jsx)("div",{className:(0,clsx_m.Z)(widgets_operationFull_style_module["operation-full__date"],widgets_operationFull_style_module.ellipsis),children:dateFormatted}),(0,jsx_runtime.jsxs)("div",{className:widgets_operationFull_style_module["operation-full__sum"],title:sumFormatted,children:[(0,jsx_runtime.jsx)("span",{className:widgets_operationFull_style_module.ellipsis,children:sumFormatted}),(0,jsx_runtime.jsx)("span",{children:" ₽"})]}),(0,jsx_runtime.jsx)("div",{className:(0,clsx_m.Z)(widgets_operationFull_style_module["operation-full__description"],widgets_operationFull_style_module.ellipsis),children:description}),(0,jsx_runtime.jsx)(shared.zx,{label:"Редактировать",className:widgets_operationFull_style_module["operation-full__button"]})]})};OperationFull.displayName="OperationFull";try{OperationFull.displayName="OperationFull",OperationFull.__docgenInfo={description:"Primary UI component for user interaction",displayName:"OperationFull",props:{sum:{defaultValue:null,description:"",name:"sum",required:!0,type:{name:"number"}},type:{defaultValue:null,description:"",name:"type",required:!0,type:{name:"string"}},title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},description:{defaultValue:null,description:"",name:"description",required:!0,type:{name:"string"}},date:{defaultValue:null,description:"",name:"date",required:!0,type:{name:"Date"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/widgets/operationFull/index.tsx#OperationFull"]={docgenInfo:OperationFull.__docgenInfo,name:"OperationFull",path:"src/widgets/operationFull/index.tsx#OperationFull"})}catch(__react_docgen_typescript_loader_error){}},"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/widgets/operationFull/style.module.scss":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,'.GWES2qbMFpl9zoRzBRBM{font-family:"Nunito Sans","Helvetica Neue",Helvetica,Arial,sans-serif;display:flex;flex-direction:column;gap:1rem;padding:1rem;align-items:start}.M6sCYYGi345IvgllfRVO{font-size:2rem}.EKLBIS1aAbBGC8j87wvI{font-size:.875rem}.txFgJzVE2Rk1sr96MfFV{font-size:.875rem}.V1mX1bPXzWuz3XV9_alu{flex:none}',"",{version:3,sources:["webpack://./src/widgets/operationFull/style.module.scss"],names:[],mappings:"AAAA,sBACI,qEAAA,CACA,YAAA,CACA,qBAAA,CACA,QAAA,CACA,YAAA,CACA,iBAAA,CAEA,sBACI,cAAA,CAGJ,sBACI,iBAAA,CAGJ,sBACI,iBAAA,CAGJ,sBACI,SAAA",sourcesContent:[".operation-full {\n    font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;\n    display: flex;\n    flex-direction: column;\n    gap: 1rem;\n    padding: 1rem;\n    align-items: start;\n\n    &__title {\n        font-size: 2rem;\n    }\n\n    &__type {\n        font-size: .875rem;\n    }\n\n    &__date {\n        font-size: .875rem;\n    }\n\n    &__button {\n        flex: none;\n    }\n}"],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={"operation-full":"GWES2qbMFpl9zoRzBRBM","operation-full__title":"M6sCYYGi345IvgllfRVO","operation-full__type":"EKLBIS1aAbBGC8j87wvI","operation-full__date":"txFgJzVE2Rk1sr96MfFV","operation-full__button":"V1mX1bPXzWuz3XV9_alu"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/widgets/operationShort/style.module.scss":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,'.aEtG0ramoCPDMKLpfcgg{font-family:"Nunito Sans","Helvetica Neue",Helvetica,Arial,sans-serif;width:23.5rem;padding:1.25rem;cursor:pointer;display:grid;gap:.75rem;grid-template:"a b" 1.75rem "c d" 2.75rem "e d" 1rem/14fr 5.5fr}.gndc9ukhxEt65pPlB5_l{color:#475569;font-size:1.25rem;line-height:1.75rem;grid-area:a}.Wr1XNuvwxAsN9IIQsmCo{color:#1e293b;font-size:2.25rem;line-height:2.75rem;font-weight:600;grid-area:c;display:flex;overflow:hidden}.ppCmHDZLtKVY3DY70gHE{color:#1d4ed8;font-size:.875rem;line-height:1rem;grid-area:e}.vK5MwmZHvx6d57HeDt3X{text-align:right;color:#22c55e;font-size:.875rem;line-height:1.25rem;grid-area:b}.ND8wqItLnXIFsTT90VmN{overflow:hidden;text-overflow:ellipsis;text-wrap:nowrap}',"",{version:3,sources:["webpack://./src/widgets/operationShort/style.module.scss"],names:[],mappings:"AAAA,sBACI,qEAAA,CACA,aAAA,CACA,eAAA,CACA,cAAA,CACA,YAAA,CACA,UAAA,CACA,+DACI,CAKJ,sBACI,aAAA,CACA,iBAAA,CACA,mBAAA,CACA,WAAA,CAGJ,sBACI,aAAA,CACA,iBAAA,CACA,mBAAA,CACA,eAAA,CACA,WAAA,CACA,YAAA,CACA,eAAA,CAGJ,sBACI,aAAA,CACA,iBAAA,CACA,gBAAA,CACA,WAAA,CAIJ,sBACI,gBAAA,CACA,aAAA,CACA,iBAAA,CACA,mBAAA,CACA,WAAA,CAIR,sBACI,eAAA,CACA,sBAAA,CACA,gBAAA",sourcesContent:['.operation-short {\n    font-family: \'Nunito Sans\', \'Helvetica Neue\', Helvetica, Arial, sans-serif;\n    width: 23.5rem;\n    padding: 1.25rem;\n    cursor: pointer;\n    display: grid;\n    gap: .75rem;\n    grid-template:\n        "a b" 1.75rem\n        "c d" 2.75rem\n        "e d" 1rem / 14fr 5.5fr;\n    \n\n    &__title {\n        color: #475569;\n        font-size: 1.25rem;\n        line-height: 1.75rem;\n        grid-area: a;\n    }\n\n    &__sum {\n        color: #1E293B;\n        font-size: 2.25rem;\n        line-height: 2.75rem;\n        font-weight: 600;\n        grid-area: c;\n        display: flex;\n        overflow: hidden;\n    }\n\n    &__description {\n        color: #1D4ED8;\n        font-size: .875rem;\n        line-height: 1rem;\n        grid-area: e;\n        \n    }\n\n    &__type {\n        text-align: right;\n        color: #22C55E;\n        font-size: 0.875rem;\n        line-height: 1.25rem;\n        grid-area: b;\n    }\n}\n\n.ellipsis {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    text-wrap: nowrap;\n}'],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={"operation-short":"aEtG0ramoCPDMKLpfcgg","operation-short__title":"gndc9ukhxEt65pPlB5_l","operation-short__sum":"Wr1XNuvwxAsN9IIQsmCo","operation-short__description":"ppCmHDZLtKVY3DY70gHE","operation-short__type":"vK5MwmZHvx6d57HeDt3X",ellipsis:"ND8wqItLnXIFsTT90VmN"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___}}]);