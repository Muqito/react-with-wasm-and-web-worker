onmessage = (e) => {
    (async () => {
     try {
         const wasm = await import('wasm-hello');
         const result = wasm.add(e.data, 1);
         postMessage(result);
     } catch (e) {
       console.error('caught error', e);
     }
    })();
};