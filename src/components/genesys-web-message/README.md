# Genesys Web Message

- This component creates the button to generate a chat with Service BC Helpdesk.

- This component cannot be unit tested because it heavily relies on a third-party library.

Props
-
- The genesys URL which is the URL provided by MAXIMUS Canada to their Third-Party Library.
- The Environment Key which is provided by MAXIMUS Canada.
- The Deployment Key which is also provided by MAXIMUS Canada depending on which UI the component is going to be on.

How To Use
-
- Insert the component into the preferred UI with the correct properties. For example:
```
<GenesysWebMessage
    v-if="isNameRequest"
    genesysURL="https://example.cloud/example.min.js"
    environmentKey="xyz1"
    deploymentKey="aaaa-bbbb-cccc-dddd-eeee"
/>
```
- A button will appear on the bottom-right of the page.
- Press it to open a new chat with the BC Helpdesk.