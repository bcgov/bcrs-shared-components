# Genesys Web Message

- This component creates the button to generate a chat with Service BC Helpdesk.

- This component cannot be unit tested because it heavily relies on a third-party library.

Props
-
- The genesys URL which is the URL provided by Maximus to their Third-Party Library.
- The Environment Key which is provided by Maximus.
- The Deployment Key which is also provided by Maximus depending on which UI the component is going to be on.

How To Use
-
- Insert the component into the preferred UI with the correct properties. For example:
```
<GenesysWebMessage
    genesysURL="https://apps.cac1.pure.cloud/genesys-bootstrap/genesys.min.js"
    environmentKey="cac1"
    deploymentKey="5c012aaa-1f17-4d0b-8da2-bea9c1133d5d"
/>
```
- A button will appear on the bottom-right of the page.
- Press it to open a new chat with the BC Helpdesk.