(()=>{var e={n:t=>{var s=t&&t.__esModule?()=>t.default:()=>t;return e.d(s,{a:s}),s},d:(t,s)=>{for(var r in s)e.o(s,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:s[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};(()=>{"use strict";const t=flarum.core.compat["admin/app"];var s=e.n(t);const r=flarum.core.compat["common/extend"];s().initializers.add("fof-drafts",(function(){s().extensionData.for("fof-drafts").registerSetting({setting:"fof-drafts.enable_scheduled_drafts",label:s().translator.trans("fof-drafts.admin.settings.enable_scheduled_drafts"),type:"boolean"}).registerSetting({setting:"fof-drafts.schedule_on_one_server",label:s().translator.trans("fof-drafts.admin.settings.schedule_on_one_server"),type:"boolean"}).registerSetting({setting:"fof-drafts.store_log_output",label:s().translator.trans("fof-drafts.admin.settings.schedule_log_output"),type:"boolean"}).registerPermission({icon:"fas fa-edit",label:s().translator.trans("fof-drafts.admin.permissions.start"),permission:"user.saveDrafts"},"start").registerPermission({icon:"fas fa-calendar-plus",label:s().translator.trans("fof-drafts.admin.permissions.schedule"),permission:"user.scheduleDrafts"},"start"),(0,r.extend)(s(),"getRequiredPermissions",(function(e,t){"user.scheduleDrafts"===t&&e.push("user.saveDrafts")}))}))})(),module.exports={}})();
//# sourceMappingURL=admin.js.map