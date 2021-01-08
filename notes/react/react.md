# React

## Component
A Custom html tag that refers to a view, behavior, and state that we define ourselves.

In React, a component is represented by a function that returns JSX, or a class with a render function that returns JSX, and can be referenced in JSX as a tag.

### Component Lifecycle
Phases and steps that a component goes through when in use.
#### Mounting
1. `constructor()` - The component is created. In function components we don't worry about this.
2. `getDerivedStateFromProps();` - Gets the properties that were passed to the component.
3. `render()` - The component is rendered from JSX.
4. `componentDidMount()` - called when the component has been mounted.
#### Updating
Once a component has rendered, unless you take advantage of one of these `updating` methods, it won't rerender.
1. `getDerivedStateFromProps();` - Gets the properties that were passed to the component.
2. `shouldComponentUpdate()` - if this returns true, it continues.
3. `render()` - the component is rendered from JSX.
4. `getSnapshotBeforeUpdate`
5. `componentDidUpdate` - like `componentDidMount()`
#### Unmounting
`componentWillUnmount()`
#### Error Handling


## Hooks
### useState
Allows us to retrieve the state of our application and update it.
### useEffect
## Single-Page Application (SPA)
A SPA is an application that represents itself as a single page in the browser that can dynamically change it's content without having to navigate to a new page. This is usually accomplished through use of a routing library.

## Axios
A promise-based http client for browsers and node. Very much like Fetch, it returns a promise when you use it, however, Axios automatically tries to format the results as JSON, so we can skip that step.

## CORS
Cross-origin resource sharing is frowned upon by browsers and they will block it if they see it isn't expressly allowed.
This is something we have to enable on the server. To fix it in Express, we need to do the following:
1. `npm install --save cors`.
2. `npm install --save-dev @types/cors`.
3. Add `import cors from 'cors';` and `app.use(cors());`.

What this does is add the allow origin header to all of our responses so that the browser knows that other servers are allowed to request that resource.

## Setup
1. `npm install -g create-react-app`
2. `npx create-react-app my-app-name --template typescript`
3. `cd my-app-name`
4. `npm install --save axios`
5. `npm install --save react-router-dom`