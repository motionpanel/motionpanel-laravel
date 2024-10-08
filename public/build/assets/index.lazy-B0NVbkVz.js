import{c as m,r as h,j as e,H as l,J as x}from"./app-CJD9RsjF.js";import{u as j,a as p,R as f,b as c,E as b,L as v,c as y,J as E}from"./job-view-BI_HQv8v.js";import{P as g,c as w}from"./page-header-Dj3rLmx0.js";const L=m("/jobs/")({component:P});function P(){var r,o,i,n;const[a,d]=h.useState(null),t=j({queryKey:["jobs"],queryFn:async()=>(await fetch(`/api${l}/jobs`)).json()}),u=p({mutationFn:async s=>(await fetch(`/api${l}/jobs/${s}`,{method:"DELETE"})).json(),onSuccess:()=>{t.refetch(),x("Job deleted successfully")}});return e.jsx("div",{className:"w-full h-full flex flex-col",children:e.jsxs(f,{direction:"horizontal",children:[e.jsxs(c,{children:[e.jsx(g,{children:e.jsx("h1",{className:"font-medium",children:"Jobs"})}),e.jsxs("div",{className:"flex flex-col space-y-2 p-4",children:[t.isLoading&&e.jsx("div",{children:"Loading..."}),t.isError&&e.jsxs("div",{children:["Error: ",t.error.message]}),t.isSuccess&&((o=(r=t.data)==null?void 0:r.data)==null?void 0:o.length)===0&&e.jsx("div",{className:"flex items-center justify-center",children:e.jsx(b,{children:e.jsx("div",{className:"text-lg font-extralight",children:"No jobs available"})})}),t.isSuccess&&((n=(i=t.data)==null?void 0:i.data)==null?void 0:n.map(s=>e.jsx("div",{className:"rounded-sm",children:e.jsx(v,{className:w((a==null?void 0:a.id)===s.id?"bg-zinc-100":void 0,"border","border-zinc-200"),job:s,showAttempts:!0,showCreatedAt:!0,showDeleteButton:!s.reserved_at,onDelete:()=>u.mutate(s.id),description:s.reserved_at?"Possibly in progress or will be retried":void 0,onItemClick:()=>d(s)})},s.id)))]})]}),e.jsx(y,{}),e.jsx(c,{children:a&&e.jsx(E,{job:a,showDeleteButton:!a.reserved_at})})]})})}export{L as Route};
