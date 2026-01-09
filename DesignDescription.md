## Phase 1: Description of the Application

Based on the screenshots of the Salesforce "Agentforce" agent, here is the functional description of the component:
**The Core Concept:**
A floating, collapsible "Concierge" chat widget pinned to the bottom-right of the viewport. It sits on top of existing website content (z-index high).

1) Visual Structure:
Container: A card-style container with rounded corners (approx 12px-16px radius), a white background, and a subtle but distinct drop shadow to separate it from the page content.
2) Header:
- Left: A distinct avatar/icon (the blue robot "Agentforce" character) + Title text "Agentforce".
- Right: Action icons: A "Three-dots" menu (opens a dropdown), an "Expand/Fullscreen" icon, and a "Minimize" dash icon.

3) Chat Body (Scrollable Area):
- System/Bot Messages: Displayed with a robot avatar. The message bubbles are often accompanied by "Suggestion Chips" (outlined buttons) stacked vertically (e.g., "Connect me with a sales rep").
- User Messages: Right-aligned bubbles, light grey background, rounded corners.
- Interaction: When the menu is clicked, a dropdown appears with "Download chat transcript" and "End conversation".

4) Footer (Input Area):
- A clean text input field with placeholder text "Message Agentforce".
- A "Send" arrow icon on the right.
- A subtle "Agentforce joined" or timestamp indicator just above the footer.