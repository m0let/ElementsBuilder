/**
 * Anzu frontend leader home task
 * expected delivery time: 4 days after reading this line
 * 
 * Anzu is growing rapidly and our use-cases for dashboards is growing in the same rate.
 * today we maintain a good react-mobx dashboard for out publishers and Anzu users.
 * But soon we gonna have advertisers, resellers, multi user types and more..
 * 
 * This task is a micro version of the "dream" infrastructure we would like
 * you to build once you start work @ Anzu.
 * the goal is to build a dashboard generator and consolidate all work under one project
 * 
 * instead of writing tons of different files, hard-coded text in files, long files of html/jsx
 * the focus is on re-usable components and dynamic programming.
 * 
 * 
 * Given the following config object coming from the server,
 * please build a react app which is fully generated based on the config object.
 * 
 * 
 * parts of the app:
 * - topbar - content comes from "navigation" field in config object.
 * - table component
 * - form component
 * - state management / api
 */
export const config = {
  base_url: "https://front-lead.anzuinfra.com",
  version: 20.12,
  last_updated: "2021-06-18 20:35:00",
  navigation: [
    {
      title: "Applications",
      route: "/Apps",
      table: {
        // PLEASE READ!
        // data is either string (which means you should get data with GET action)
        // or it's the array of data
        // make sure you support both fetching from url or getting data from array
        data: "/apps",
        columns: [
          {
            header: "App name",
            field: "name",
            columnRenderer: "text",
            columnClass: "bold",
          },
          {
            header: "App secret",
            field: "app_secret",
            columnRenderer: "text",
          },
          { header: "App type", field: "app_type", columnRenderer: "text" },
          { header: "Active", field: "active", columnRenderer: "checkbox" },
          {
            header: "Impressions",
            field: "impressions",
            columnRenderer: "number",
          },
          {
            header: "Revenue",
            field: "revenue",
            columnRenderer: "money_usd",
          },
        ],
      },

      // form must have cancel/submit button which creates POST request
      // to POST /apps and the body is the form data.
      // form is part of a modal which is opened via a button on the table component
      form: {
        fields: [
          { type: "input", field: "name"},
          {
            type: "options",
            field: "app_type",
            options: [
              { label: "Unreal based app", value: "unreal" },
              { label: "Unity based app", value: "unity" },
              { label: "Farcry based app", value: "farcry" },
            ],
          },
          { type: "checkbox", field: "active"},
          { type: "input", readOnly: true, field: "app_secret"},
          {
            type: "input",
            readOnly: true,
            type: "number",
            textSelectable: false,
            cursor: "",
            field: "impressions",
          },
          {
            type: "input",
            readOnly: false,
            type: "number",
            textSelectable: false,
            cursor: "",
            field: "revenue",
          },
        ],
      },
    },
  ],
};