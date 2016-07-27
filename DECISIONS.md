# DECISIONS

In this document, I penned down the decisions I have made regarding resolutions to the problems I encountered or foresaw.

---

### 2016-07-27 I'm using `@dan_abramov`'s `create-react-app` CLI

**Why:** Faster to get started than traditional DIY tool-scaffolding.

**Alternatives:** The usual way of using Babel, Webpack, weback-dev-server, etc...

**Risks:** Not much, it's official React CLI tool.

### 2016-07-27 I'm using ES6/ES2015 syntax

**Why:** Future proofing, since Node.js v6 will support 93% of the syntax. Also, easier for non-JS developers to adapt to it.

**Alternatives:** Using ES5 syntax, but risk hard to grasp quirks like variable scopes.

**Risks:** Harder to debug because of transpiled code. Mitigated by source maps.
