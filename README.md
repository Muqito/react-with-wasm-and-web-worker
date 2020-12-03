# React and WebAssembly
This is a project with React and WebAssembly

## Setup (from scratch)
This is already done for this project.
If you have Rust and wasm-pack installed you can run

```yarn add -D react-app-rewired wasm-loader worker-loader```

```wasm-pack build wasm-hello```

```yarn add file:./wasm-hello/pkg```